import * as THREE from "three";
import { TextureLoader, WebGLRenderTarget, Object3D, Vector3 } from "three";
import React, { Suspense, useMemo, useState, useCallback, useRef, useEffect } from "react";
import {
  Canvas,
  useFrame,
  useThree,
  useLoader,
  Renderer
} from "react-three-fiber";
import { Physics, usePlane, useSphere, useBox, useCylinder } from "use-cannon";
import Post from "./three-post-processing.js";
import linesUrl from "../../../static/assets/lines.png";
import * as SimplexNoise from "simplex-noise"

export const Mouse = () => {
  const viewportOffset = 2;
  const { viewport } = useThree();
  const position = [-viewport.width, -viewport.height, 8.7];
  const dimensions = [6, 6, 6, 6];
  const [_, api] = useBox(index => ({
    type: "Kinematic",
    args: dimensions,
    position
  }));
  useFrame(state => {
    if (state.mouse.x === 0) return;
    api.position.set(
      (state.mouse.x * viewport.width) / 2,
      (state.mouse.y * viewport.height) / 2,
      8
    );
  });
  return (
    <instancedMesh castShadow>
      <sphereBufferGeometry
        attatch="geometry"
        args={dimensions}
        position={position}
      />
      <meshStandardMaterial flatShading attatch="material" color="black" />
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
      <meshBasicMaterial
        attatch="material"
        opacity={.25}
        color="white"
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
        position={[0, -viewport.height / 2 + 3.45, -150]} // ground
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <Plane
        position={[-viewport.width / 2, 0, 0]} // left
        rotation={[0, Math.PI / 2, 0]}
      />
      <Plane
        position={[viewport.width / 2, 0, 0]} // right
        rotation={[0, -Math.PI / 2, 0]}
      />
      <Plane position={[0, 0, 7]} rotation={[0, 0, 0]} /** back */ />
      <Plane position={[0, 0, 11.5]} rotation={[0, -Math.PI, 0]} /** front */ />
    </>
  );
};

// Creates a crate that catches the spheres
export const MovingColumns = ({ theme }) => {
  const { viewport, clock } = useThree();
  const noise = new SimplexNoise(Math.random);

  const ref = useRef()
  const Columns = useRef([]);

  const GenerateMappings = () => {
    let result= []//vec3 array
    for (let x=0;x<25;x++) {
      for (let z=0;z<25;z++) result.push(new Vector3(x,Math.random(),z))
    }
    return result
  }
  let ColumnMappings = GenerateMappings();

  const ModulateColumn = (objectRef) => {
    let time = clock.elapsedTime;
    let newY = noise.noise2D(position.x + time * 0.0001, position.y + time * 0.0003);
    objectRef.position.set(position.x,newY,position.z);//is of type object3d
  }

  useEffect(() => {

      alert(JSON.stringify(JSON.stringify(Columns.current)))
    return () => {
    }
  }, [])

  useFrame(state=>{
    // Columns.current.forEach(ModulateColumn);
  })

  return (

  <>{
  ColumnMappings.forEach(position=>{
      return(
        <instancedMesh receiveShadow ref={(r)=>{ alert(r)}>
          <boxBufferGeometry attatch="geometry" parameters={[1,position.y,4]} posiiton={position}/>
          <meshBasicMaterial attatch="material" opacity={1} color="grey" toneMapped={false} flatShading/>
        </instancedMesh>)
      })}
  </>);
};


export const InstancedBoxs = ({
  dims,
  choice,
  color = "black",
  count = 50
}) => {
  const { size, viewport, gl, scene, camera, clock } = useThree();

  const texture = useLoader(THREE.TextureLoader, linesUrl);
  texture.anisotropy = 15; // high res textures, no matter the distance

  const dimensions = dims;
  const viewportOffset = -16;
  // use react reference to generate the mesh
  const [ref] = useBox(index => {
    const options = {
      // used to ensure box's stack in a pyrimid like shape, (2 on top, 3 on bottom)
      // right
      rightOffset: [
        viewport.width + viewportOffset - 1.85,
        -viewport.height + 2,
        0,
        8.7
      ],
      right: [viewport.width + viewportOffset - 1.5, -viewport.height, 0, 8.7],
      // left
      leftOffset: [
        -(viewport.width / viewportOffset - Math.random() - 1),
        -viewport.height + 1,
        0,
        0
      ],
      left: [
        -(viewport.width / viewportOffset - Math.random() - 1),
        -viewport.height,
        0,
        8.7
      ]
    };
    return {
      mass: 20,
      material: { friction: 0.09, restitution: 0.09 },
      args: dimensions, // with use sphere there isnt an array passed
      position: options[choice]
      // onCollide: e => play(index, e.contact.impactVelocity),
    };
  });
  // alert(JSON.stringify(texture));
  return (
    <instancedMesh
      castShadows
      receiveShadows
      ref={ref}
      args={[null, null, count]}
    >
      <boxBufferGeometry attatch="geometry" args={dimensions} />
      <meshBasicMaterial
        flatShading
        attatch="material"
        color={color}
        map={texture}
        alphaMap={texture}
        transparent
        opacity={1}
        depthTest
        toneMapped={false}
      />
    </instancedMesh>
  );
};

// https://inspiring-wiles-b4ffe0.netlify.app/2-objects-and-properties
export default ({ theme }) => {
  const { viewport } = useThree();

  return (
    <div id="three-portfolio">
      <Canvas
        concurrent
        shadowMap
        pixelRatio={typeof window !== "undefined" && window.devicePixelRatio}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, -10], fov: 50, near: 17, far: 100 }}
      >
        <ambientLight
          color={
            theme.name === "dark"
              ? theme.colors.primary
              : theme.colors.foreground
          }
          intensity={0.5}
        />
        <directionalLight
          position={[50, 150, 400]}
          angle={0.25}
          intensity={theme.name === "dark" ? 1 : 1}
          color={
            theme.name === "dark"
              ? theme.colors.primary
              : theme.colors.foreground
          }
          castShadow
          // shadow-bias={0.01}
          shadow-radius={10}
          shadow-mapSize-width={7000} // fidelity of shadow maps (higher is sharper)
          shadow-mapSize-height={7000}
          // move shadows to cameras perspective instead of light
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
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
              {/** right group */}
              <MovingColumns/>
            </group>
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
};
//  {/** left group */}
//               <InstancedBoxs
//                 dims={[4, 2.25, 2.25]}
//                 choice="rightOffset"
//                 color={theme.colors.primary}
//                 count={1}
//               />
//               <InstancedBoxs
//                 dims={[4.25, 2.5, 2.5]}
//                 choice="right"
//                 color={theme.colors.primary}
//                 count={1}
//               />
//  <fog
//     attach="fog"
//     args={[
//       theme.name === "dark"
//         ? theme.colors.textSecondary
//         : theme.colors.foreground,
//       50,
//       60
//     ]}
//   />
