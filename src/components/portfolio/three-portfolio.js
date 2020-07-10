import * as THREE from "three";
import { TextureLoader, WebGLRenderTarget, Object3D } from "three";
import React, { Suspense, useMemo, useState, useCallback, useRef } from "react";
import { Canvas, useFrame, useThree, useLoader } from "react-three-fiber";
import { Physics, usePlane, useSphere } from "use-cannon";
import BackfaceMaterial from "../threejs/materials/backface";
import RefractionMaterial from "../threejs/materials/refraction";

export const Mouse = () => {
  const { viewport } = useThree();
  const [, api] = useSphere(() => ({ type: "Kinematic", args: 4.5 }));
  return useFrame(state =>
    api.position.set(
      (state.mouse.x * viewport.width) / 2,
      (state.mouse.y * viewport.height) / 2,
      7
    )
  );
};

// A physical plane without visual representation
export const Plane = ({ color, ...props }) => {
  const [ref] = usePlane(() => ({ ...props }));
  return (
    <instancedMesh
receiveShadow ref={ref}>
      <planeBufferGeometry attatch="geometry" {...props} />
      <meshPhysicalMaterial roughness={0} attatch="material" color={color} />
    </instancedMesh>
  );
};

// Creates a crate that catches the spheres
export const Borders = () => {
  const { viewport } = useThree();
  return (
    <>
      <Plane
        position={[0, -viewport.height / 2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <Plane
        position={[-viewport.width / 2 - 1, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Plane
        position={[viewport.width / 2 + 1, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <Plane position={[0, 0, 6]} rotation={[0, 0, 0]} />
      <Plane position={[0, 0, 12]} rotation={[0, -Math.PI, 0]} />
    </>
  );
};

// Spheres falling down
export const InstancedSpheres = ({ color = "black", count = 50 }) => {
  const { size, viewport, gl, scene, camera, clock } = useThree();

  // use react reference to generate the mesh
  const [ref] = useSphere(index => ({
    mass: 50,
    position: [4 - Math.random() * 8, viewport.height, 0, 0],
    args: 1
    // onCollide: e => play(index, e.contact.impactVelocity),
  }));
  // #region deprecated
  // Create Fbo's and materials
  //   const [
  //     envFbo,
  //     backfaceFbo,
  //     backfaceMaterial,
  //     refractionMaterial
  //   ] = useMemo(() => {
  //     const envFbo = new WebGLRenderTarget(size.width, size.height);
  //     const backfaceFbo = new WebGLRenderTarget(size.width, size.height);
  //     const backfaceMaterial = new BackfaceMaterial();
  //     const refractionMaterial = new RefractionMaterial({
  //       envMap: envFbo.texture,
  //       backfaceMap: backfaceFbo.texture,
  //       resolution: [size.width, size.height]
  //     });
  //     return [envFbo, backfaceFbo, backfaceMaterial, refractionMaterial];
  //   }, [size]);

  // Render-loop
  //   useFrame(() => {
  //     ref.current.instanceMatrix.needsUpdate = true;
  //     // Render env to fbo
  //     gl.autoClear = false;
  //     camera.layers.set(1);
  //     gl.setRenderTarget(envFbo);
  //     gl.render(scene, camera);
  //     // Render cube backfaces to fbo
  //     camera.layers.set(0);
  //     ref.current.material = backfaceMaterial;
  //     gl.setRenderTarget(backfaceFbo);
  //     gl.clearDepth();
  //     gl.render(scene, camera);
  //     // Render env to screen
  //     camera.layers.set(1);
  //     gl.setRenderTarget(null);
  //     gl.render(scene, camera);
  //     gl.clearDepth();
  //     // Render cube with refraction material to screen
  //     camera.layers.set(0);
  //     ref.current.material = refractionMaterial;
  //     gl.render(scene, camera);
  //   }, 1);
  // #endregion deprecated

  return (
    <instancedMesh
      ref={ref}
      castShadow
      receiveShadow
      args={[null, null, count]}
    >
      <sphereBufferGeometry attatch="geometry" args={[1, 32, 32]} />
      <meshPhysicalMaterial
        transparent
        opacity={0.3}
        clearcoat={1}
        attatch="material"
        color={color}
      />
    </instancedMesh>
  );
};

export default ({ theme }) => {
  return (
    <Canvas
      concurrent
      shadowMap
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 20], fov: 50, near: 17, far: 40 }}
    >
      <fog attach="fog" args={[theme.colors.primary, 15, 40]} />
      {/**
      <color attach="background" args={[theme.colors.foreground]} />
      */}
      <ambientLight color={theme.colors.foreground} intensity={0.5} />
      <directionalLight
        position={[100, 150, 400]}
        angle={0.7}
        intensity={2.5}
        color={theme.colors.foreground}
        shadow-radius={50}
        castShadow
        shadow-mapSize-width={100}
        shadow-mapSize-height={100}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight
        position={[-10, -10, -5]}
        color={theme.colors.foreground}
        intensity={1.5}
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
            <Borders />
            <InstancedSpheres
              color={
                theme.name === "dark"
                  ? theme.colors.primary
                  : theme.colors.foreground
              }
              count={100}
            />
          </group>
        </Physics>
      </Suspense>
    </Canvas>
  );
};
