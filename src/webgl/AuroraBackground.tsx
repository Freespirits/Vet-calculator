/**
 * AuroraBackground — the WebGL2 hero field.
 *
 * A fullscreen aurora-plasma fragment shader (domain-warped fBm in the
 * Aurora-Clinic palette) plus a soft-sprite particle layer, both authored
 * in GLSL ES 3.00 (WebGL2). Pointer influence is lerp-smoothed for buttery
 * motion; tapping/clicking the hero emits a luminous ripple, and shooting
 * stars streak across the aurora every few seconds.
 *
 * Performance & robustness:
 *  - Requires WebGL2; the CSS gradient fallback renders otherwise.
 *  - DPR clamped (lower on mobile); particle count scales with device.
 *  - Render loop pauses when the hero scrolls off-screen or the tab blurs.
 *  - WebGL context-loss is caught and surfaces the CSS gradient fallback.
 *  - Lazily imported by Hero, so Three.js never blocks first paint.
 *
 * This module is the default export consumed via React.lazy.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ---------- aurora shaders (GLSL ES 3.00) ---------- */

const AURORA_VERT = /* glsl */ `
  out vec2 vUv;
  void main() {
    vUv = uv;
    // Fullscreen quad: emit clip-space directly, ignore the camera.
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const AURORA_FRAG = /* glsl */ `
  precision highp float;
  in vec2 vUv;
  out vec4 fragColor;
  uniform float u_time;
  uniform vec2  u_res;
  uniform vec2  u_pointer; // 0..1, lerp-smoothed
  uniform vec2  u_burst;   // 0..1, last tap position
  uniform float u_burstT;  // u_time at last tap (negative = none yet)
  uniform float u_intensity;

  // --- hash / value-noise / fbm ---
  vec2 hash2(vec2 p){
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }
  float noise(vec2 p){
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
      v += a * noise(p);
      p = m * p;
      a *= 0.5;
    }
    return v;
  }

  // Aurora-Clinic palette
  const vec3 NAVY    = vec3(0.027, 0.043, 0.078);
  const vec3 TEAL    = vec3(0.176, 0.831, 0.749);
  const vec3 EMERALD = vec3(0.063, 0.725, 0.506);
  const vec3 VIOLET  = vec3(0.545, 0.361, 0.965);

  // A shooting star: a bright head with an exponential tail, travelling on a
  // pseudo-random chord each cycle. Visible only for a slice of its period.
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
    // aspect-correct uv, origin centered
    vec2 uv = vUv;
    float aspect = u_res.x / max(u_res.y, 1.0);
    vec2 p = (uv - 0.5);
    p.x *= aspect;

    float t = u_time * 0.06;

    // pointer in the same centered/aspect space
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

    // Deep navy base with ADDITIVE aurora ribbons (moody, not a flat wash).
    float band = clamp(f * 0.6 + 0.5, 0.0, 1.0);
    vec3 col = NAVY;
    col += EMERALD * smoothstep(0.52, 0.80, band) * 0.40;
    col += TEAL    * smoothstep(0.62, 0.98, band + length(q) * 0.22) * 0.85;
    col += VIOLET  * smoothstep(0.60, 1.00, length(r) * 0.85 + swell) * 0.55;

    // shooting stars riding above the curtains
    float stars = shootingStar(p, u_time, 0.37) + shootingStar(p, u_time, 0.81);
    col += mix(TEAL, vec3(1.0), 0.55) * stars * 1.1;

    // tap/click ripple: an expanding luminous ring that fades over ~1.4s
    float bt = u_time - u_burstT;
    if (u_burstT > 0.0 && bt < 1.4) {
      vec2 bp = u_burst - 0.5;
      bp.x *= aspect;
      float ring = abs(length(p - bp) - bt * 0.85);
      col += TEAL * exp(-ring * ring * 260.0) * (1.0 - bt / 1.4) * 0.55;
    }

    // vertical falloff — aurora concentrates toward the top
    float vert = smoothstep(-0.5, 0.6, uv.y - 0.10);
    col *= mix(0.62, 1.10, vert);

    // gentle vignette to seat content
    float vig = smoothstep(1.30, 0.25, length(p));
    col *= mix(0.6, 1.0, vig);

    col *= u_intensity;

    // subtle grain to avoid banding on dark gradients
    float grain = (hash2(uv * u_res + u_time).x) * 0.012;
    col += grain;

    fragColor = vec4(col, 1.0);
  }
`;

/* ---------- particle shaders (GLSL ES 3.00) ---------- */

const PARTICLE_VERT = /* glsl */ `
  in float aSeed;
  out float vSeed;
  uniform float u_time;
  uniform float u_dpr;
  void main(){
    vSeed = aSeed;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    // per-particle twinkle: each dust mote breathes on its own phase
    float tw = 0.72 + 0.45 * sin(u_time * (0.5 + aSeed * 1.6) + aSeed * 43.0);
    gl_PointSize = (0.7 + aSeed * 1.6) * tw * u_dpr * (7.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const PARTICLE_FRAG = /* glsl */ `
  precision highp float;
  in float vSeed;
  out vec4 fragColor;
  uniform float u_opacity;
  void main(){
    // soft round sprite (no square points)
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.06, d);
    vec3 teal   = vec3(0.50, 0.95, 0.87);
    vec3 violet = vec3(0.74, 0.62, 1.00);
    vec3 col = mix(teal, violet, step(0.82, fract(vSeed * 7.31)));
    fragColor = vec4(col, a * u_opacity);
  }
`;

/* ---------- aurora plane ---------- */

interface PointerRef {
  x: number;
  y: number;
}

function AuroraPlane({ pointer }: { pointer: React.MutableRefObject<PointerRef> }) {
  const { size, viewport } = useThree();
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const smoothed = useRef({ x: 0.5, y: 0.5 });
  // Tap/click burst, owned locally: pending=true until stamped into uniforms.
  const burst = useRef({ x: 0.5, y: 0.5, pending: false });

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_res: { value: new THREE.Vector2(1, 1) },
      u_pointer: { value: new THREE.Vector2(0.5, 0.5) },
      u_burst: { value: new THREE.Vector2(0.5, 0.5) },
      u_burstT: { value: -10 },
      u_intensity: { value: 1.0 },
    }),
    [],
  );

  useEffect(() => {
    uniforms.u_res.value.set(size.width * viewport.dpr, size.height * viewport.dpr);
  }, [size, viewport.dpr, uniforms]);

  useEffect(() => {
    const b = burst.current;
    const onDown = (e: PointerEvent) => {
      b.x = e.clientX / window.innerWidth;
      b.y = 1 - e.clientY / window.innerHeight;
      b.pending = true;
    };
    window.addEventListener('pointerdown', onDown, { passive: true });
    return () => window.removeEventListener('pointerdown', onDown);
  }, []);

  useFrame((_, delta) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.u_time.value += delta;
    // lerp pointer for smooth, non-jittery influence
    smoothed.current.x += (pointer.current.x - smoothed.current.x) * Math.min(1, delta * 3);
    smoothed.current.y += (pointer.current.y - smoothed.current.y) * Math.min(1, delta * 3);
    m.uniforms.u_pointer.value.set(smoothed.current.x, smoothed.current.y);
    // consume a pending tap burst: stamp it in shader time
    if (burst.current.pending) {
      m.uniforms.u_burst.value.set(burst.current.x, burst.current.y);
      m.uniforms.u_burstT.value = m.uniforms.u_time.value;
      burst.current.pending = false;
    }
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        glslVersion={THREE.GLSL3}
        vertexShader={AURORA_VERT}
        fragmentShader={AURORA_FRAG}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

/* ---------- particle layer ---------- */

function Particles({
  count,
  pointer,
}: {
  count: number;
  pointer: React.MutableRefObject<PointerRef>;
}) {
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const geo = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      // deterministic per-index hash: stable twinkle phases across renders
      seeds[i] = Math.abs(Math.sin(i * 127.1 + 311.7) * 43758.5453) % 1;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_dpr: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1 },
      u_opacity: { value: 0.6 },
    }),
    [],
  );

  useFrame((state, delta) => {
    const pts = ref.current;
    if (!pts) return;
    pts.rotation.z += delta * 0.012;
    // gentle parallax toward the pointer
    const targetX = (pointer.current.x - 0.5) * 0.6;
    const targetY = -(pointer.current.y - 0.5) * 0.4;
    pts.position.x += (targetX - pts.position.x) * Math.min(1, delta * 2);
    pts.position.y += (targetY - pts.position.y) * Math.min(1, delta * 2);
    if (matRef.current) {
      matRef.current.uniforms.u_time.value = state.clock.elapsedTime;
      matRef.current.uniforms.u_opacity.value =
        0.55 + Math.sin(state.clock.elapsedTime * 0.4) * 0.12;
    }
  });

  return (
    <points ref={ref} geometry={geo}>
      <shaderMaterial
        ref={matRef}
        glslVersion={THREE.GLSL3}
        vertexShader={PARTICLE_VERT}
        fragmentShader={PARTICLE_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ---------- scene wrapper: pauses when off-screen / blurred ---------- */

function Scene({ pointer, particles }: { pointer: React.MutableRefObject<PointerRef>; particles: number }) {
  return (
    <>
      <AuroraPlane pointer={pointer} />
      <Particles count={particles} pointer={pointer} />
    </>
  );
}

interface AuroraBackgroundProps {
  /** Whether the field should actively render (e.g. hero on-screen). */
  active?: boolean;
  className?: string;
}

/** True when the device can create a WebGL2 context (shaders are GLSL3-only). */
function supportsWebGL2(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
}

export default function AuroraBackground({ active = true, className }: AuroraBackgroundProps) {
  const pointer = useRef<PointerRef>({ x: 0.5, y: 0.5 });
  const [failed, setFailed] = useState(() => !supportsWebGL2());
  const [tabVisible, setTabVisible] = useState(true);

  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
  const particles = isMobile ? 1400 : 5200;
  const maxDpr = isMobile ? 1.3 : 1.75;

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = e.clientX / window.innerWidth;
      pointer.current.y = e.clientY / window.innerHeight;
    };
    const onVisibility = () => setTabVisible(!document.hidden);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const running = active && tabVisible && !failed;

  return (
    <div className={className} aria-hidden="true">
      {/* Always-present CSS gradient: first paint + context-loss fallback */}
      <div className="absolute inset-0 aurora-fallback" />
      {!failed && (
        <Canvas
          className="!absolute inset-0"
          dpr={[1, maxDpr]}
          frameloop={running ? 'always' : 'never'}
          gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
          camera={{ position: [0, 0, 5], fov: 60 }}
          style={{ opacity: failed ? 0 : 1, transition: 'opacity 0.6s ease' }}
          onCreated={({ gl }) => {
            const canvas = gl.domElement;
            const onLost = (e: Event) => {
              e.preventDefault();
              setFailed(true);
            };
            canvas.addEventListener('webglcontextlost', onLost as EventListener, false);
          }}
        >
          <Scene pointer={pointer} particles={particles} />
        </Canvas>
      )}
    </div>
  );
}
