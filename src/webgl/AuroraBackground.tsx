/**
 * AuroraBackground — the WebGL hero field.
 *
 * A fullscreen aurora-plasma fragment shader (domain-warped fBm in the
 * Aurora-Clinic palette) plus a light parallax particle layer. Pointer
 * influence is lerp-smoothed for buttery motion.
 *
 * Performance & robustness:
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

/* ---------- shaders ---------- */

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // Fullscreen quad: emit clip-space directly, ignore the camera.
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float u_time;
  uniform vec2  u_res;
  uniform vec2  u_pointer; // 0..1, lerp-smoothed
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

    gl_FragColor = vec4(col, 1.0);
  }
`;

/* ---------- aurora plane ---------- */

function AuroraPlane({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const { size, viewport } = useThree();
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const smoothed = useRef({ x: 0.5, y: 0.5 });

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_res: { value: new THREE.Vector2(1, 1) },
      u_pointer: { value: new THREE.Vector2(0.5, 0.5) },
      u_intensity: { value: 1.0 },
    }),
    [],
  );

  useEffect(() => {
    uniforms.u_res.value.set(size.width * viewport.dpr, size.height * viewport.dpr);
  }, [size, viewport.dpr, uniforms]);

  useFrame((_, delta) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.u_time.value += delta;
    // lerp pointer for smooth, non-jittery influence
    smoothed.current.x += (pointer.current.x - smoothed.current.x) * Math.min(1, delta * 3);
    smoothed.current.y += (pointer.current.y - smoothed.current.y) * Math.min(1, delta * 3);
    m.uniforms.u_pointer.value.set(smoothed.current.x, smoothed.current.y);
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={VERT}
        fragmentShader={FRAG}
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
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const ref = useRef<THREE.Points>(null);

  const geo = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, [count]);

  useFrame((state, delta) => {
    const pts = ref.current;
    if (!pts) return;
    pts.rotation.z += delta * 0.012;
    // gentle parallax toward the pointer
    const targetX = (pointer.current.x - 0.5) * 0.6;
    const targetY = -(pointer.current.y - 0.5) * 0.4;
    pts.position.x += (targetX - pts.position.x) * Math.min(1, delta * 2);
    pts.position.y += (targetY - pts.position.y) * Math.min(1, delta * 2);
    (pts.material as THREE.PointsMaterial).opacity =
      0.5 + Math.sin(state.clock.elapsedTime * 0.4) * 0.12;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.03}
        sizeAttenuation
        color="#7FE9DA"
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ---------- scene wrapper: pauses when off-screen / blurred ---------- */

function Scene({ pointer, particles }: { pointer: React.MutableRefObject<{ x: number; y: number }>; particles: number }) {
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

export default function AuroraBackground({ active = true, className }: AuroraBackgroundProps) {
  const pointer = useRef({ x: 0.5, y: 0.5 });
  const [failed, setFailed] = useState(false);
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
