'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

// Exact shaders from https://github.com/J0SUKE/gsap-threejs-codrops
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTexture;
varying vec2 vUv;

uniform vec2 uResolution;
uniform float uProgress;
uniform vec3 uColor;

uniform vec2 uContainerRes;
uniform float uGridSize;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec2 squaresGrid(vec2 vUv) {
  float imageAspectX = 1.;
  float imageAspectY = 1.;

  float containerAspectX = uResolution.x / uResolution.y;
  float containerAspectY = uResolution.y / uResolution.x;

  vec2 ratio = vec2(
    min(containerAspectX / imageAspectX, 1.0),
    min(containerAspectY / imageAspectY, 1.0)
  );

  vec2 squareUvs = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  return squareUvs;
}

void main() {
  vec2 newUvs = vUv;

  float imageAspectX = uResolution.x / uResolution.y;
  float imageAspectY = uResolution.y / uResolution.x;

  float containerAspectX = uContainerRes.x / uContainerRes.y;
  float containerAspectY = uContainerRes.y / uContainerRes.x;

  vec2 ratio = vec2(
    min(containerAspectX / imageAspectX, 1.0),
    min(containerAspectY / imageAspectY, 1.0)
  );

  vec2 coverUvs = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  vec2 squareUvs = squaresGrid(coverUvs);
  float gridSize = floor(uContainerRes.x / 20.);
  vec2 grid = vec2(
    floor(squareUvs.x * gridSize) / gridSize,
    floor(squareUvs.y * gridSize) / gridSize
  );
  vec4 gridTexture = vec4(uColor, 0.);

  vec4 texture = texture2D(uTexture, coverUvs);
  float height = 0.2;

  float progress = (1. + height) - (uProgress * (1. + height + height));

  float dist = 1. - distance(grid.y, progress);
  float clampedDist = smoothstep(height, 0., distance(grid.y, progress));
  float randDist = step(1. - height * random(grid), dist);
  dist = step(1. - height, dist);

  float rand = random(grid);

  float alpha = dist * (clampedDist + rand - 0.5 * (1. - randDist));
  alpha = max(0., alpha);
  gridTexture.a = alpha;

  texture.rgba *= step(progress, grid.y);

  gl_FragColor = vec4(mix(texture, gridTexture, gridTexture.a));
}
`;

interface PixelRevealProps {
  src?: string;
  width: number;
  height: number;
  visible: boolean;
}

export default function PixelReveal({ src, width, height, visible }: PixelRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    material: THREE.ShaderMaterial;
    mesh: THREE.Mesh;
    texture: THREE.Texture | null;
    raf: number;
    tween: gsap.core.Tween | null;
    textureLoaded: boolean;
  } | null>(null);

  const initScene = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || sceneRef.current) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    const dpr = Math.min(2, window.devicePixelRatio);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.01, 10);
    camera.position.z = 1;

    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture: new THREE.Uniform(new THREE.Vector4()),
        uResolution: new THREE.Uniform(new THREE.Vector2(0, 0)),
        uContainerRes: new THREE.Uniform(new THREE.Vector2(width, height)),
        uProgress: new THREE.Uniform(0),
        uGridSize: new THREE.Uniform(20),
        uColor: new THREE.Uniform(new THREE.Color('#0f0d0d')),
      },
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const render = () => {
      renderer.render(scene, camera);
      sceneRef.current!.raf = requestAnimationFrame(render);
    };

    sceneRef.current = {
      renderer,
      scene,
      camera,
      material,
      mesh,
      texture: null,
      raf: 0,
      tween: null,
      textureLoaded: false,
    };
    render();
  }, [width, height]);

  useEffect(() => {
    initScene();
    return () => {
      const ctx = sceneRef.current;
      if (!ctx) return;
      cancelAnimationFrame(ctx.raf);
      ctx.tween?.kill();
      ctx.texture?.dispose();
      ctx.material.dispose();
      ctx.mesh.geometry.dispose();
      ctx.renderer.dispose();
      sceneRef.current = null;
    };
  }, [initScene]);

  useEffect(() => {
    const ctx = sceneRef.current;
    if (!ctx || !src) return;

    ctx.texture?.dispose();
    ctx.textureLoaded = false;

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    loader.load(src, (texture) => {
      if (!sceneRef.current) return;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      ctx.material.uniforms.uTexture.value = texture;
      ctx.material.uniforms.uResolution.value = new THREE.Vector2(
        texture.image.naturalWidth || texture.image.width,
        texture.image.naturalHeight || texture.image.height
      );
      ctx.texture = texture;
      ctx.textureLoaded = true;

      // Start animation once texture is ready
      if (visible) {
        ctx.tween?.kill();
        ctx.material.uniforms.uProgress.value = 0;
        ctx.tween = gsap.to(ctx.material.uniforms.uProgress, {
          value: 1,
          duration: 1.6,
          ease: 'linear',
        });
      }
    });
  }, [src, visible]);

  useEffect(() => {
    const ctx = sceneRef.current;
    if (!ctx) return;

    if (visible && ctx.textureLoaded) {
      ctx.tween?.kill();
      ctx.material.uniforms.uProgress.value = 0;
      ctx.tween = gsap.to(ctx.material.uniforms.uProgress, {
        value: 1,
        duration: 1.6,
        ease: 'linear',
      });
    } else if (!visible) {
      ctx.tween?.kill();
      ctx.material.uniforms.uProgress.value = 0;
    }
  }, [visible]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width,
        height,
        borderRadius: 4,
        display: 'block',
      }}
    />
  );
}
