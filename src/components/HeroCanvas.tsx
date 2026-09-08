"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec3 uRose;
  uniform vec3 uDeep;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 uv = vUv;
    float n = noise(uv * 3.2 + uTime * 0.08);
    float n2 = noise(uv * 6.0 - uTime * 0.05 + uMouse * 0.4);
    float veil = smoothstep(0.15, 0.95, uv.y + n * 0.2);
    vec3 col = mix(uDeep, uRose, n * 0.55 + n2 * 0.25);
    col *= 0.22 + veil * 0.55;
    float vignette = smoothstep(1.2, 0.25, length(uv - 0.5));
    col *= vignette;
    gl_FragColor = vec4(col, 0.55);
  }
`;

function RoseField({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uRose: { value: new THREE.Color("#c4787a") },
      uDeep: { value: new THREE.Color("#1a1214") },
    }),
    [],
  );

  useFrame(({ clock }) => {
    if (!mat.current) return;
    mat.current.uniforms.uTime.value = clock.getElapsedTime();
    mat.current.uniforms.uMouse.value.set(mouse.current.x, mouse.current.y);
  });

  return (
    <mesh scale={[3.2, 2, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={mat}
        transparent
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

export function HeroCanvas() {
  const mouse = useRef({ x: 0.5, y: 0.5 });

  return (
    <div
      className="absolute inset-0"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mouse.current.x = (e.clientX - r.left) / r.width;
        mouse.current.y = 1 - (e.clientY - r.top) / r.height;
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 1.2], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
      >
        <RoseField mouse={mouse} />
      </Canvas>
    </div>
  );
}
