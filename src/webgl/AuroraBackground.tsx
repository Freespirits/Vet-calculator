/**
 * AuroraBackground v3 — the WebGL2 hero field, now a raw three.js engine.
 *
 * What lives here (roadmap "Phase 3 — WebGL2 maximization"):
 *  - Domain-warped fBm aurora curtains (GLSL ES 3.00), shooting stars,
 *    pointer swell and a tap/click luminous ripple — carried over from v2.
 *  - GPGPU particle flow field: particle positions live in a ping-pong
 *    RGBA16F render target and are advected each frame by the curl of the
 *    same noise field the aurora uses, so thousands of motes drift along
 *    the curtains with zero CPU work. The pointer stirs a soft vortex and
 *    taps send a radial shockwave through the field.
 *  - Selective bloom: bright-pass → separable gaussian blur at quarter
 *    res → additive composite with a soft tonemap, so ribbon crests,
 *    shooting stars and rare "spark" particles genuinely glow.
 *  - Light-theme variant: the shader cross-fades to a "Clinic Day"
 *    watercolor palette when [data-theme="light"] is active.
 *
 * Robustness ladder (each step falls back to the previous):
 *  - No WebGL2                         → CSS gradient (component bails).
 *  - WebGL2, no float color buffers    → "classic": static GPGPU texture,
 *                                         twinkle + parallax only.
 *  - Float buffers, mobile             → "flow": 4k particles, no bloom.
 *  - Float buffers, desktop            → "lux": 16k particles + bloom.
 *  - Sustained low FPS                 → drops bloom, then resolution.
 *  - Context loss                      → canvas fades out, CSS shows.
 *  - Tab hidden / hero off-screen      → render loop fully stops.
 *
 * Three.js only (no react-three-fiber) and lazily imported by Hero, so
 * nothing here blocks first paint.
 */
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/* ================================================================
   Shaders (all GLSL ES 3.00; three injects `#version`, precision,
   and the built-in attribute/uniform declarations)
   ================================================================ */

const QUAD_VERT = /* glsl */ `
  out vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

/** Shared noise helpers, injected into the shaders that need them. */
const NOISE_GLSL = /* glsl */ `
  vec2 hash2(vec2 p){
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }
  float hash21(vec2 p){
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
    return fract(p.x * p.y);
  }
  float gnoise(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash2(i + vec2(0.0,0.0)), f - vec2(0.0,0.0)),
          dot(hash2(i + vec2(1.0,0.0)), f - vec2(1.0,0.0)), u.x),
      mix(dot(hash2(i + vec2(0.0,1.0)), f - vec2(0.0,1.0)),
          dot(hash2(i + vec2(1.0,1.0)), f - vec2(1.0,1.0)), u.x),
      u.y);
  }
  float fbm(vec2 p){
    float v = 0.0;
    float a = 0.5;
    mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    for(int i = 0; i < 5; i++){
      v += a * gnoise(p);
      p = m * p;
      a *= 0.5;
    }
    return v;
  }
`;

const AURORA_FRAG = /* glsl */ `
  precision highp float;
  in vec2 vUv;
  out vec4 fragColor;
  uniform float u_time;
  uniform vec2  u_res;
  uniform vec2  u_pointer;  // 0..1, lerp-smoothed
  uniform vec2  u_burst;    // 0..1, last tap position
  uniform float u_burstT;   // u_time at last tap (negative = none yet)
  uniform float u_lightMix; // 0 = Aurora Night, 1 = Clinic Day

  ${NOISE_GLSL}

  // Aurora-Clinic night palette
  const vec3 NAVY    = vec3(0.027, 0.043, 0.078);
  const vec3 TEAL    = vec3(0.176, 0.831, 0.749);
  const vec3 EMERALD = vec3(0.063, 0.725, 0.506);
  const vec3 VIOLET  = vec3(0.545, 0.361, 0.965);
  // Clinic-Day watercolor palette
  const vec3 BONE     = vec3(0.953, 0.965, 0.980);
  const vec3 TEAL_P   = vec3(0.391, 0.829, 0.772);
  const vec3 EMER_P   = vec3(0.520, 0.860, 0.720);
  const vec3 VIOLET_P = vec3(0.700, 0.620, 0.980);

  // A shooting star: bright head, exponential tail, pseudo-random chord.
  float shootingStar(vec2 p, float t, float seed){
    float period = 7.0 + seed * 4.0;
    float cyc = floor(t / period);
    float ph  = fract(t / period);
    float life = smoothstep(0.0, 0.015, ph) * (1.0 - smoothstep(0.085, 0.13, ph));
    if (life <= 0.001) return 0.0;
    vec2 h = hash2(vec2(cyc + seed * 13.0, seed * 91.7));
    vec2 start = vec2(h.x * 0.9, 0.30 + abs(h.y) * 0.35);
    vec2 dir = normalize(vec2(-0.80 - abs(h.y) * 0.3, -0.42));
    vec2 head = start + dir * ph * 7.5;
    vec2 rel = p - head;
    float along = dot(rel, -dir);
    float perp  = dot(rel, vec2(-dir.y, dir.x));
    float tail = exp(-max(along, 0.0) * 9.0) * step(-0.01, along);
    float core = exp(-perp * perp * 2200.0);
    return life * tail * core;
  }

  void main(){
    vec2 uv = vUv;
    float aspect = u_res.x / max(u_res.y, 1.0);
    vec2 p = (uv - 0.5);
    p.x *= aspect;

    float t = u_time * 0.06;

    vec2 ptr = u_pointer - 0.5;
    ptr.x *= aspect;

    // domain warp for organic, flowing curtains
    vec2 q = vec2(fbm(p * 2.2 + vec2(0.0, t)),
                  fbm(p * 2.2 + vec2(5.2, 1.3) - t));
    vec2 r = vec2(fbm(p * 2.4 + 1.7 * q + vec2(1.7, 9.2) + t * 0.7),
                  fbm(p * 2.4 + 1.7 * q + vec2(8.3, 2.8) - t * 0.6));

    float f = fbm(p * 2.6 + 2.0 * r);

    // pointer adds a soft luminous swell
    float pd = length(p - ptr * 0.6);
    float swell = smoothstep(0.9, 0.0, pd) * 0.3;
    f += swell;

    float band = clamp(f * 0.6 + 0.5, 0.0, 1.0);
    float m1 = smoothstep(0.52, 0.80, band);
    float m2 = smoothstep(0.62, 0.98, band + length(q) * 0.22);
    float m3 = smoothstep(0.60, 1.00, length(r) * 0.85 + swell);

    float stars = shootingStar(p, u_time, 0.37) + shootingStar(p, u_time, 0.81);

    // tap/click ripple: an expanding luminous ring that fades over ~1.4s
    float ripple = 0.0;
    float bt = u_time - u_burstT;
    if (u_burstT > 0.0 && bt < 1.4) {
      vec2 bp = u_burst - 0.5;
      bp.x *= aspect;
      float ring = abs(length(p - bp) - bt * 0.85);
      ripple = exp(-ring * ring * 260.0) * (1.0 - bt / 1.4);
    }

    float vert = smoothstep(-0.5, 0.6, uv.y - 0.10);
    float vig = smoothstep(1.30, 0.25, length(p));

    // ---- Aurora Night (additive ribbons over deep navy) ----
    vec3 colD = NAVY;
    colD += EMERALD * m1 * 0.40;
    colD += TEAL    * m2 * 0.85;
    colD += VIOLET  * m3 * 0.55;
    colD += mix(TEAL, vec3(1.0), 0.55) * stars * 1.15;
    colD += TEAL * ripple * 0.55;
    colD *= mix(0.62, 1.10, vert);
    colD *= mix(0.6, 1.0, vig);

    // ---- Clinic Day (watercolor tints over bone white) ----
    vec3 colL = BONE;
    colL = mix(colL, EMER_P,   m1 * 0.26);
    colL = mix(colL, TEAL_P,   m2 * 0.34);
    colL = mix(colL, VIOLET_P, m3 * 0.24);
    colL += vec3(1.0) * stars * 0.20;
    colL = mix(colL, TEAL_P, ripple * 0.35);
    colL *= mix(0.985, 1.015, vert);

    vec3 col = mix(colD, colL, u_lightMix);

    // subtle grain to avoid banding on smooth gradients
    float grain = hash2(uv * u_res + u_time).x * 0.012 * (1.0 - 0.5 * u_lightMix);
    col += grain;

    fragColor = vec4(col, 1.0);
  }
`;

/**
 * GPGPU sim: one RGBA16F texel per particle — xyz = position in the
 * aurora's centered field space (x scaled by aspect), w = age. Velocity is
 * stateless: curl of the flow field + pointer vortex + tap shockwave.
 */
const SIM_FRAG = /* glsl */ `
  precision highp float;
  in vec2 vUv;
  out vec4 fragColor;
  uniform sampler2D u_state;
  uniform float u_dt;
  uniform float u_time;
  uniform float u_aspect;
  uniform vec2  u_pointer;  // field space
  uniform vec2  u_burst;    // field space
  uniform float u_burstT;

  ${NOISE_GLSL}

  float vnoise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash21(i), b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0)), d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }
  float flowField(vec2 p, float t){
    return vnoise(p * 1.8 + vec2(0.0, t)) * 0.65
         + vnoise(p * 3.9 - vec2(t * 0.7, 0.0)) * 0.35;
  }

  float lifeOf(float seed){ return mix(9.0, 16.0, fract(seed * 7.13)); }

  vec3 spawn(float seed, float cyc){
    float h1 = fract(sin((seed * 913.7 + cyc) * 12.9898) * 43758.5453);
    float h2 = fract(sin((seed * 517.3 + cyc) * 78.2330) * 24634.6345);
    float h3 = fract(sin((seed * 271.9 + cyc) * 39.4250) * 12345.6789);
    return vec3((h1 - 0.5) * 1.24 * u_aspect, (h2 - 0.5) * 1.24, h3);
  }

  void main(){
    ivec2 cell = ivec2(gl_FragCoord.xy);
    vec4 s = texelFetch(u_state, cell, 0);
    vec3 p = s.xyz;
    float age = s.w;
    float seed = hash21(vec2(cell) + 0.5);
    float life = lifeOf(seed);

    age += u_dt;
    float cyc = floor(age / life);
    if (age >= life) {
      age = mod(age, life);
      p = spawn(seed, cyc);
    }
    if (p.x != p.x || p.y != p.y) { p = spawn(seed, 1.0); age = 0.0; } // NaN guard

    // curl-noise advection: drift along the aurora's curtains
    float t = u_time * 0.05 + p.z * 0.45;
    float e = 0.07;
    vec2 curl = vec2(
        flowField(p.xy + vec2(0.0, e), t) - flowField(p.xy - vec2(0.0, e), t),
      -(flowField(p.xy + vec2(e, 0.0), t) - flowField(p.xy - vec2(e, 0.0), t))
    ) / (2.0 * e);
    vec2 vel = curl * (0.030 + 0.045 * seed);

    // pointer vortex: tangential stir with a hint of pull
    vec2 d = p.xy - u_pointer;
    float r = length(d) + 1e-4;
    float fall = exp(-r * r * 3.2);
    vec2 tang = vec2(-d.y, d.x) / r;
    vel += tang * fall * 0.42 - (d / r) * fall * 0.05;

    // tap shockwave: an outward ring travelling through the field
    float bt = u_time - u_burstT;
    if (u_burstT > 0.0 && bt < 1.6) {
      vec2 bd = p.xy - u_burst;
      float br = length(bd) + 1e-4;
      float wave = exp(-pow((br - bt * 0.9) * 6.0, 2.0));
      vel += (bd / br) * wave * (1.0 - bt / 1.6) * 1.1;
    }

    p.xy += vel * u_dt;

    // soft wrap at the field bounds
    float bx = 0.62 * u_aspect + 0.05;
    if (p.x >  bx) p.x = -bx; else if (p.x < -bx) p.x = bx;
    if (p.y >  0.67) p.y = -0.67; else if (p.y < -0.67) p.y = 0.67;

    fragColor = vec4(p, age);
  }
`;

const POINTS_VERT = /* glsl */ `
  precision highp float;
  in float aIndex;
  uniform sampler2D u_state;
  uniform float u_simW;
  uniform float u_aspect;
  uniform float u_dpr;
  uniform float u_time;
  uniform float u_flow;     // 1 = simulated ages drive fade; 0 = classic
  uniform vec2  u_parallax; // smoothed pointer, -0.5..0.5
  out float vSeed;
  out float vFade;

  float hash21(vec2 p){
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
    return fract(p.x * p.y);
  }
  float lifeOf(float seed){ return mix(9.0, 16.0, fract(seed * 7.13)); }

  void main(){
    int i = int(aIndex);
    int w = int(u_simW);
    ivec2 cell = ivec2(i % w, i / w);
    vec4 s = texelFetch(u_state, cell, 0);
    vec3 p = s.xyz;
    float seed = hash21(vec2(cell) + 0.5);

    float af = clamp(s.w / lifeOf(seed), 0.0, 1.0);
    float simFade = smoothstep(0.0, 0.12, af) * (1.0 - smoothstep(0.78, 1.0, af));
    vFade = mix(1.0, simFade, u_flow);
    vSeed = seed;

    vec2 clip = vec2(p.x / max(u_aspect, 0.001), p.y) * 2.0;
    clip += u_parallax * mix(0.02, 0.11, p.z) * vec2(1.0, -0.7);

    float tw = 0.72 + 0.45 * sin(u_time * (0.55 + seed * 1.7) + seed * 47.0);
    gl_PointSize = (1.1 + seed * 1.9) * mix(0.6, 1.8, p.z) * tw * u_dpr * 1.6;
    gl_Position = vec4(clip, 0.0, 1.0);
  }
`;

const POINTS_FRAG = /* glsl */ `
  precision highp float;
  in float vSeed;
  in float vFade;
  out vec4 fragColor;
  uniform float u_opacity;
  uniform float u_lightMix;

  void main(){
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.08, d);
    float pick = fract(vSeed * 9.17);
    vec3 teal   = vec3(0.45, 0.95, 0.87);
    vec3 violet = vec3(0.72, 0.60, 1.00);
    vec3 warm   = vec3(1.00, 0.93, 0.78);
    vec3 col = pick < 0.72 ? teal : (pick < 0.94 ? violet : warm);
    // rare HDR sparks — seeds for the bloom pass
    col *= 1.0 + 1.1 * step(0.985, fract(vSeed * 5.31));
    // on Clinic Day, additive white dust vanishes — shift to teal pigment
    col = mix(col, vec3(0.10, 0.45, 0.42), u_lightMix * 0.85);
    fragColor = vec4(col, a * vFade * u_opacity);
  }
`;

/* ---------- post chain (lux tier) ---------- */

const BRIGHT_FRAG = /* glsl */ `
  precision highp float;
  in vec2 vUv;
  out vec4 fragColor;
  uniform sampler2D u_tex;
  uniform float u_threshold;
  void main(){
    vec3 c = texture(u_tex, vUv).rgb;
    float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
    float k = smoothstep(u_threshold, u_threshold + 0.45, l);
    fragColor = vec4(c * k, 1.0);
  }
`;

const BLUR_FRAG = /* glsl */ `
  precision highp float;
  in vec2 vUv;
  out vec4 fragColor;
  uniform sampler2D u_tex;
  uniform vec2 u_dir; // texel-sized step
  void main(){
    float w[5];
    w[0] = 0.227027; w[1] = 0.194594; w[2] = 0.121622; w[3] = 0.054054; w[4] = 0.016216;
    vec3 acc = texture(u_tex, vUv).rgb * w[0];
    for (int i = 1; i < 5; i++) {
      vec2 o = u_dir * float(i);
      acc += texture(u_tex, vUv + o).rgb * w[i];
      acc += texture(u_tex, vUv - o).rgb * w[i];
    }
    fragColor = vec4(acc, 1.0);
  }
`;

const COMPOSITE_FRAG = /* glsl */ `
  precision highp float;
  in vec2 vUv;
  out vec4 fragColor;
  uniform sampler2D u_scene;
  uniform sampler2D u_bloom;
  uniform float u_bloomStrength;
  uniform float u_time;
  float hash(vec2 p){
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
    return fract(p.x * p.y);
  }
  void main(){
    vec3 col = texture(u_scene, vUv).rgb + texture(u_bloom, vUv).rgb * u_bloomStrength;
    col = 1.0 - exp(-col * 1.12);              // soft filmic shoulder
    col += (hash(vUv * 911.0 + u_time) - 0.5) * 0.008; // dither
    fragColor = vec4(col, 1.0);
  }
`;

/* ================================================================
   Engine
   ================================================================ */

type Tier = 'classic' | 'flow' | 'lux';

interface Engine {
  setActive(on: boolean): void;
  dispose(): void;
}

function supportsWebGL2(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
}

function createEngine(host: HTMLElement, onFail: () => void): Engine {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  const renderer = new THREE.WebGLRenderer({
    antialias: false,
    alpha: true,
    powerPreference: 'high-performance',
    failIfMajorPerformanceCaveat: false,
  });
  let dprCap = isMobile ? 1.3 : 1.75;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
  renderer.setClearColor(0x000000, 0);

  const canvas = renderer.domElement;
  canvas.style.position = 'absolute';
  canvas.style.inset = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.opacity = '0';
  canvas.style.transition = 'opacity 0.6s ease';
  host.appendChild(canvas);

  // Float color buffers decide whether the GPGPU sim can run at all.
  const gl = renderer.getContext() as WebGL2RenderingContext;
  const floatOK =
    !!gl.getExtension('EXT_color_buffer_float') ||
    !!gl.getExtension('EXT_color_buffer_half_float');
  let tier: Tier = !floatOK ? 'classic' : isMobile ? 'flow' : 'lux';

  const SIM_W = tier === 'lux' ? 128 : 64;
  const COUNT = SIM_W * SIM_W; // 16,384 lux / 4,096 flow+classic

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const quad = new THREE.PlaneGeometry(2, 2);
  let lastNow = performance.now(); // manual dt — THREE.Clock is deprecated

  /* ----- shared state ----- */
  const pointerRaw = { x: 0.5, y: 0.5 };
  const pointerSmooth = { x: 0.5, y: 0.5 };
  const burst = { x: 0.5, y: 0.5, pending: false };
  let lightTarget = document.documentElement.dataset.theme === 'light' ? 1 : 0;
  let lightMix = lightTarget;
  let elapsed = 0;
  let width = Math.max(host.clientWidth, 1);
  let height = Math.max(host.clientHeight, 1);
  let aspect = width / height;

  /* ----- aurora ----- */
  const auroraUniforms = {
    u_time: { value: 0 },
    u_res: { value: new THREE.Vector2(1, 1) },
    u_pointer: { value: new THREE.Vector2(0.5, 0.5) },
    u_burst: { value: new THREE.Vector2(0.5, 0.5) },
    u_burstT: { value: -10 },
    u_lightMix: { value: lightMix },
  };
  const auroraMat = new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader: QUAD_VERT,
    fragmentShader: AURORA_FRAG,
    uniforms: auroraUniforms,
    depthWrite: false,
    depthTest: false,
  });
  const auroraMesh = new THREE.Mesh(quad, auroraMat);
  auroraMesh.frustumCulled = false;
  auroraMesh.renderOrder = 0;

  /* ----- particle state (DataTexture seed + ping-pong sim) ----- */
  const initState = new Float32Array(COUNT * 4);
  for (let i = 0; i < COUNT; i++) {
    const sx = (Math.random() - 0.5) * 1.24 * Math.max(aspect, 1.4);
    initState[i * 4 + 0] = sx;
    initState[i * 4 + 1] = (Math.random() - 0.5) * 1.24;
    initState[i * 4 + 2] = Math.random();
    initState[i * 4 + 3] = Math.random() * 12; // staggered ages
  }
  const seedTex = new THREE.DataTexture(initState, SIM_W, SIM_W, THREE.RGBAFormat, THREE.FloatType);
  seedTex.needsUpdate = true;
  seedTex.minFilter = seedTex.magFilter = THREE.NearestFilter;

  const makeSimRT = () =>
    new THREE.WebGLRenderTarget(SIM_W, SIM_W, {
      type: THREE.HalfFloatType,
      format: THREE.RGBAFormat,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      depthBuffer: false,
      stencilBuffer: false,
    });
  let simA: THREE.WebGLRenderTarget | null = null;
  let simB: THREE.WebGLRenderTarget | null = null;

  const simUniforms = {
    u_state: { value: seedTex as THREE.Texture },
    u_dt: { value: 0 },
    u_time: { value: 0 },
    u_aspect: { value: aspect },
    u_pointer: { value: new THREE.Vector2(0, 0) },
    u_burst: { value: new THREE.Vector2(0, 0) },
    u_burstT: { value: -10 },
  };
  const simMat = new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader: QUAD_VERT,
    fragmentShader: SIM_FRAG,
    uniforms: simUniforms,
    depthWrite: false,
    depthTest: false,
  });
  const simScene = new THREE.Scene();
  const simMesh = new THREE.Mesh(quad, simMat);
  simMesh.frustumCulled = false;
  simScene.add(simMesh);

  if (tier !== 'classic') {
    simA = makeSimRT();
    simB = makeSimRT();
  }

  /* ----- particle render ----- */
  const pointsGeo = new THREE.BufferGeometry();
  {
    const idx = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) idx[i] = i;
    // zero positions: three sizes the draw call from this attribute
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3));
    pointsGeo.setAttribute('aIndex', new THREE.BufferAttribute(idx, 1));
    pointsGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 10);
  }
  const pointsUniforms = {
    u_state: { value: seedTex as THREE.Texture },
    u_simW: { value: SIM_W },
    u_aspect: { value: aspect },
    u_dpr: { value: renderer.getPixelRatio() },
    u_time: { value: 0 },
    u_flow: { value: tier === 'classic' ? 0 : 1 },
    u_parallax: { value: new THREE.Vector2(0, 0) },
    u_opacity: { value: 0.62 },
    u_lightMix: { value: lightMix },
  };
  const pointsMat = new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader: POINTS_VERT,
    fragmentShader: POINTS_FRAG,
    uniforms: pointsUniforms,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(pointsGeo, pointsMat);
  points.frustumCulled = false;
  points.renderOrder = 1;

  const mainScene = new THREE.Scene();
  mainScene.add(auroraMesh);
  mainScene.add(points);

  /* ----- bloom chain (lux) ----- */
  const makeRT = (w: number, h: number, half: boolean) =>
    new THREE.WebGLRenderTarget(Math.max(w, 1), Math.max(h, 1), {
      type: half ? THREE.HalfFloatType : THREE.UnsignedByteType,
      format: THREE.RGBAFormat,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
      stencilBuffer: false,
    });
  let sceneRT: THREE.WebGLRenderTarget | null = null;
  let bloomA: THREE.WebGLRenderTarget | null = null;
  let bloomB: THREE.WebGLRenderTarget | null = null;

  const brightMat = new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader: QUAD_VERT,
    fragmentShader: BRIGHT_FRAG,
    uniforms: { u_tex: { value: null as THREE.Texture | null }, u_threshold: { value: 0.55 } },
    depthWrite: false,
    depthTest: false,
  });
  const blurMat = new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader: QUAD_VERT,
    fragmentShader: BLUR_FRAG,
    uniforms: {
      u_tex: { value: null as THREE.Texture | null },
      u_dir: { value: new THREE.Vector2(0, 0) },
    },
    depthWrite: false,
    depthTest: false,
  });
  const compositeMat = new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader: QUAD_VERT,
    fragmentShader: COMPOSITE_FRAG,
    uniforms: {
      u_scene: { value: null as THREE.Texture | null },
      u_bloom: { value: null as THREE.Texture | null },
      u_bloomStrength: { value: 0.85 },
      u_time: { value: 0 },
    },
    depthWrite: false,
    depthTest: false,
  });
  const postScene = new THREE.Scene();
  const postMesh = new THREE.Mesh(quad, brightMat);
  postMesh.frustumCulled = false;
  postScene.add(postMesh);

  function allocLux() {
    const dpr = renderer.getPixelRatio();
    const w = Math.round(width * dpr);
    const h = Math.round(height * dpr);
    sceneRT = makeRT(w, h, true);
    bloomA = makeRT(w >> 2, h >> 2, true);
    bloomB = makeRT(w >> 2, h >> 2, true);
  }
  function freeLux() {
    sceneRT?.dispose();
    bloomA?.dispose();
    bloomB?.dispose();
    sceneRT = bloomA = bloomB = null;
  }
  if (tier === 'lux') allocLux();

  /* ----- sizing ----- */
  function resize() {
    width = Math.max(host.clientWidth, 1);
    height = Math.max(host.clientHeight, 1);
    aspect = width / height;
    renderer.setSize(width, height, false);
    const dpr = renderer.getPixelRatio();
    auroraUniforms.u_res.value.set(width * dpr, height * dpr);
    simUniforms.u_aspect.value = aspect;
    pointsUniforms.u_aspect.value = aspect;
    pointsUniforms.u_dpr.value = dpr;
    if (tier === 'lux' && sceneRT && bloomA && bloomB) {
      sceneRT.setSize(Math.round(width * dpr), Math.round(height * dpr));
      bloomA.setSize(Math.max(Math.round(width * dpr) >> 2, 1), Math.max(Math.round(height * dpr) >> 2, 1));
      bloomB.setSize(Math.max(Math.round(width * dpr) >> 2, 1), Math.max(Math.round(height * dpr) >> 2, 1));
    }
  }
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(host);

  /* ----- input & environment listeners ----- */
  const onMove = (e: PointerEvent) => {
    pointerRaw.x = e.clientX / window.innerWidth;
    pointerRaw.y = 1 - e.clientY / window.innerHeight;
  };
  const onDown = (e: PointerEvent) => {
    burst.x = e.clientX / window.innerWidth;
    burst.y = 1 - e.clientY / window.innerHeight;
    burst.pending = true;
  };
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerdown', onDown, { passive: true });

  let tabVisible = !document.hidden;
  const onVisibility = () => {
    tabVisible = !document.hidden;
    syncLoop();
  };
  document.addEventListener('visibilitychange', onVisibility);

  const themeObserver = new MutationObserver(() => {
    lightTarget = document.documentElement.dataset.theme === 'light' ? 1 : 0;
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  let failed = false;
  const onContextLost = (e: Event) => {
    e.preventDefault();
    failed = true;
    canvas.style.opacity = '0';
    syncLoop();
    onFail(); // let React surface the CSS fallback permanently
  };
  canvas.addEventListener('webglcontextlost', onContextLost, false);

  /* ----- frame loop ----- */
  let activeFlag = true;
  let firstFrame = true;
  let fpsEMA = 60;
  let frames = 0;
  let pingIsA = true;

  function toField(px: number, py: number): [number, number] {
    return [(px - 0.5) * aspect, py - 0.5];
  }

  function frame() {
    const now = performance.now();
    const dt = Math.min(Math.max((now - lastNow) / 1000, 0), 0.05);
    lastNow = now;
    elapsed += dt;

    // smooth pointer
    const k = 1 - Math.exp(-3 * dt);
    pointerSmooth.x += (pointerRaw.x - pointerSmooth.x) * k;
    pointerSmooth.y += (pointerRaw.y - pointerSmooth.y) * k;

    // theme cross-fade
    lightMix += (lightTarget - lightMix) * Math.min(1, dt * 2.5);
    auroraUniforms.u_lightMix.value = lightMix;
    pointsUniforms.u_lightMix.value = lightMix;
    brightMat.uniforms.u_threshold.value = 0.55 + 0.4 * lightMix;
    compositeMat.uniforms.u_bloomStrength.value = 0.85 - 0.5 * lightMix;

    // aurora uniforms
    auroraUniforms.u_time.value = elapsed;
    auroraUniforms.u_pointer.value.set(pointerSmooth.x, pointerSmooth.y);
    if (burst.pending) {
      auroraUniforms.u_burst.value.set(burst.x, burst.y);
      auroraUniforms.u_burstT.value = elapsed;
      const [bx, by] = toField(burst.x, burst.y);
      simUniforms.u_burst.value.set(bx, by);
      simUniforms.u_burstT.value = elapsed;
      burst.pending = false;
    }

    // particle sim
    if (tier !== 'classic' && simA && simB) {
      const src = pingIsA ? simA : simB;
      const dst = pingIsA ? simB : simA;
      simUniforms.u_state.value = firstFrame ? seedTex : src.texture;
      simUniforms.u_dt.value = dt;
      simUniforms.u_time.value = elapsed;
      const [fx, fy] = toField(pointerSmooth.x, pointerSmooth.y);
      simUniforms.u_pointer.value.set(fx, fy);
      renderer.setRenderTarget(dst);
      renderer.render(simScene, camera);
      pointsUniforms.u_state.value = dst.texture;
      pingIsA = !pingIsA;
    }

    // points uniforms
    pointsUniforms.u_time.value = elapsed;
    pointsUniforms.u_parallax.value.set(pointerSmooth.x - 0.5, pointerSmooth.y - 0.5);
    pointsUniforms.u_opacity.value = 0.55 + Math.sin(elapsed * 0.4) * 0.1;

    // render
    if (tier === 'lux' && sceneRT && bloomA && bloomB) {
      renderer.setRenderTarget(sceneRT);
      renderer.render(mainScene, camera);

      postMesh.material = brightMat;
      brightMat.uniforms.u_tex.value = sceneRT.texture;
      renderer.setRenderTarget(bloomA);
      renderer.render(postScene, camera);

      postMesh.material = blurMat;
      for (let i = 0; i < 2; i++) {
        blurMat.uniforms.u_tex.value = bloomA.texture;
        blurMat.uniforms.u_dir.value.set(1 / bloomA.width, 0);
        renderer.setRenderTarget(bloomB);
        renderer.render(postScene, camera);
        blurMat.uniforms.u_tex.value = bloomB.texture;
        blurMat.uniforms.u_dir.value.set(0, 1 / bloomB.height);
        renderer.setRenderTarget(bloomA);
        renderer.render(postScene, camera);
      }

      postMesh.material = compositeMat;
      compositeMat.uniforms.u_scene.value = sceneRT.texture;
      compositeMat.uniforms.u_bloom.value = bloomA.texture;
      compositeMat.uniforms.u_time.value = elapsed;
      renderer.setRenderTarget(null);
      renderer.render(postScene, camera);
    } else {
      renderer.setRenderTarget(null);
      renderer.render(mainScene, camera);
    }

    if (firstFrame) {
      firstFrame = false;
      canvas.style.opacity = '1';
    }

    // adaptive quality: degrade gracefully on sustained low FPS
    fpsEMA += (1 / Math.max(dt, 1e-4) - fpsEMA) * 0.04;
    frames++;
    if (frames % 150 === 0) {
      if (tier === 'lux' && fpsEMA < 34) {
        tier = 'flow';
        freeLux();
      } else if (tier === 'flow' && fpsEMA < 26 && dprCap > 1.01) {
        dprCap = 1;
        renderer.setPixelRatio(1);
        resize();
      }
    }
  }

  function syncLoop() {
    const run = activeFlag && tabVisible && !failed;
    renderer.setAnimationLoop(run ? frame : null);
    if (run) lastNow = performance.now(); // flush the pause out of dt
  }
  syncLoop();

  return {
    setActive(on: boolean) {
      activeFlag = on;
      syncLoop();
    },
    dispose() {
      renderer.setAnimationLoop(null);
      ro.disconnect();
      themeObserver.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      quad.dispose();
      pointsGeo.dispose();
      seedTex.dispose();
      simA?.dispose();
      simB?.dispose();
      freeLux();
      auroraMat.dispose();
      simMat.dispose();
      pointsMat.dispose();
      brightMat.dispose();
      blurMat.dispose();
      compositeMat.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
}

/* ================================================================
   React wrapper
   ================================================================ */

interface AuroraBackgroundProps {
  /** Whether the field should actively render (e.g. hero on-screen). */
  active?: boolean;
  className?: string;
}

export default function AuroraBackground({ active = true, className }: AuroraBackgroundProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const [failed, setFailed] = useState(() => !supportsWebGL2());

  useEffect(() => {
    if (failed) return;
    const host = hostRef.current;
    if (!host) return;
    let engine: Engine | null = null;
    try {
      engine = createEngine(host, () => setFailed(true));
    } catch {
      setFailed(true);
      return;
    }
    engineRef.current = engine;
    return () => {
      engine?.dispose();
      engineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    engineRef.current?.setActive(active && !failed);
  }, [active, failed]);

  return (
    <div ref={hostRef} className={`${className ?? ''} overflow-hidden`} aria-hidden="true">
      {/* Always-present CSS gradient: first paint + every fallback path */}
      <div className="absolute inset-0 aurora-fallback" />
      {/* WebGL canvas is appended here by the engine */}
    </div>
  );
}
