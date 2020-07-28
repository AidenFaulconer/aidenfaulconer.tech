import * as THREE from "three";
import { TextureLoader, WebGLRenderTarget, Object3D } from "three";
import React, { Suspense, useMemo, useState, useCallback, useRef } from "react";
import { Canvas, useFrame, useThree, useLoader } from "react-three-fiber";
import { Physics, usePlane, useSphere, useBox, useCylinder } from "use-cannon";
import BackfaceMaterial from "../threejs/materials/backface";
import Post from "./three-post-processing.js";
import RefractionMaterial from "../threejs/materials/refraction";

export const Mouse = () => {
  const { viewport } = useThree();
  const ref = useRef();
  const [_, api] = useBox(() => ({
    type: "Kinematic",
    // mass: 10,
    args: dimensions,
    position: [viewport.width / 2 + 3, viewport.height / 2, 10]
  }));
  const dimensions = [6, 6, 6];
  useFrame(state => {
    api.position.set(
      (state.mouse.x * viewport.width) / 2,
      (state.mouse.y * viewport.height) / 2,
      10
    );
    ref.current.position.set(
      (state.mouse.x * viewport.width) / 2,
      (state.mouse.y * viewport.height) / 2,
      9
    );
  });
  return (
    <instancedMesh ref={ref} castShadow>
      <boxBufferGeometry attatch="geometry" args={dimensions} />
      <meshPhysicalMaterial flatShading attatch="material" color="111111" />
    </instancedMesh>
  );
};

// A physical plane without visual representation
export const Plane = ({ color, ...props }) => {
  const { viewport } = useThree();
  const [ref] = usePlane(() => ({ ...props }));
  return (
    <mesh receiveShadow ref={ref} {...props}>
      <planeBufferGeometry
        attatch="geometry"
        args={[viewport.width * 2, viewport.width * 2, viewport.height * 2]}
      />
      <meshPhysicalMaterial
        roughness={0}
        attatch="material"
        transparent
        opacity={color != null}
        color={color || color}
      />
    </mesh>
  );
};

// Creates a crate that catches the spheres
export const Borders = ({ theme }) => {
  const { viewport } = useThree();
  return (
    <>
      <Plane
        position={[0, -viewport.height / 2 + 1.75, -150]} // ground
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <Plane
        position={[-viewport.width / 2 + 2, 0, 0]} // r
        rotation={[0, Math.PI / 2, 0]}
      />
      <Plane
        position={[viewport.width / 2 - 2, 0, 0]} // l
        rotation={[0, -Math.PI / 2, 0]}
      />
      <Plane position={[0, 0, 8]} rotation={[0, 0, 0]} /** back */ />
      <Plane position={[0, 0, 12]} rotation={[0, -Math.PI, 0]} /** front */ />
    </>
  );
};

// Spheres falling down
export const InstancedBoxs = ({ choice, color = "black", count = 50 }) => {
  const { size, viewport, gl, scene, camera, clock } = useThree();
  const dimensions = [1.25, 1.25, 1.25];
  // use react reference to generate the mesh
  const [ref] = useBox(index => {
    const options = {
      // used to ensure box's stack in a pyrimid like shape, (2 on top, 3 on bottom)
      rightOffset: [
        viewport.width - Math.random() - 1,
        -viewport.height + 1.5,
        0,
        0
      ],
      right: [viewport.width - Math.random(), -viewport.height, 0, 0]
    };
    return {
      mass: 1000,
      args: dimensions, // with use sphere there isnt an array passed
      position: options[choice]
      // onCollide: e => play(index, e.contact.impactVelocity),
    };
  });

  return (
    <instancedMesh
      castShadows
      receiveShadows
      ref={ref}
      args={[null, null, count]}
    >
      <boxBufferGeometry attatch="geometry" args={dimensions} />
      <meshPhysicalMaterial
        flatShading
        transparent
        attatch="material"
        color={color}
      />
    </instancedMesh>
  );
};

// https://inspiring-wiles-b4ffe0.netlify.app/2-objects-and-properties
export default ({ theme }) => {
  const ref = useRef();
  const { viewport } = useThree();

  return (
    <Canvas
      ref={ref}
      concurrent
      shadowMap
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 20], fov: 50, near: 17, far: 40 }}
    >
      <fog attach="fog" args={[theme.colors.foreground, 0, 60]} />
      <ambientLight color={theme.colors.foreground} intensity={0} />
      <directionalLight
        position={[50, 150, 400]}
        angle={0.25}
        intensity={1}
        color={theme.name === "dark" ? "384654" : theme.colors.foreground}
        castShadow
        // shadow-bias={0.01}
        shadow-radius={10}
        shadow-mapSize-width={7000} // fidelity of shadow maps (higher is sharper)
        shadow-mapSize-height={7000}
        // move shadows to cameras perspective instead of light
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
      {/**
       */}
      <Suspense fallback={null}>
        <Physics
          gravity={[0, -50, 0]}
          defaultContactMaterial={{ restitution: 0.6 }}
        >
          <group position={[0, 0, -10]}>
            <Mouse />
            <Borders theme={theme} />
            <InstancedBoxs
              choice="rightOffset"
              color={
                theme.name === "dark"
                  ? theme.colors.primary
                  : theme.colors.foreground
              }
              count={2}
            />
            <InstancedBoxs
              choice="right"
              color={
                theme.name === "dark"
                  ? theme.colors.primary
                  : theme.colors.foreground
              }
              count={3}
            />
          </group>
        </Physics>
      </Suspense>
    </Canvas>
  );
};
