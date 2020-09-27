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
import SimplexNoise from "simplex-noise"

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

//https://discourse.threejs.org/t/how-to-change-texture-color-per-object-instance-in-instancedmesh/11271/3


function MovingColumns() {
  const { viewport, clock, gl, camera, size } = useThree();
  const instancedColumns = useRef();

  //#region maintain position with shader
  // const vertexShader = `
  //   precision highp float;
  //   uniform mat4 modelViewMatrix;
  //   uniform mat4 projectionMatrix;

  //   attribute vec3 position;
  //   attribute vec3 cubePos;

  //   void main(){
  //     gl_position = projectionMatrix * modelViewMatrix * vec4(cudePos+position, 1,0);
  //   }
  // `;
  // <rawShaderMaterial
  // attatch="material"
  // vertexShader={vertexShader}
  // fragmentShader={fragmentShader}
  // />

  // const fragmentShader = `
  //     precision highp float;
  //     void main(){
  //       gl_FragColor = vec4(1.0,0.0,0.0,1.0);
  //     }
  // `
  // useEffect(() => {
  //   if (instancedColumns.current.length > 3)
  //     instancedColumns.current = instancedColumns.current.slice(0, 2);
  //   let obj = instancedColumns.current;
  //   // if (obj)//attributes are hanadled and maintained by a shader
  //   //   obj.setAttribute("cubePos",new THREE.InstancedBufferAttribute(new Float32Array([
  //   //     25, 25, 25,
  //   //     25, 25, -25, -25, 25, 25, -25, 25, -25,
  //   //     25, -25, 25,
  //   //     25, -25, -25, -25, -25, 25, -25, -25, -25
  //   //   ]),3,true/**vectors normalized? */, 1/**mesh per attribute*/));
  //   console.log(obj);
  // }, [instancedColumns]);
  //#endregion

  const noise = new SimplexNoise(Math.random()); //only instance once, hence use of usememo

  //create position data
  const dummyObj = useMemo(() => new Object3D(), []); //used to generate a matrix we can use based on the ref'ed blueprint of the object

  const cubeSize = 4;
  const columnDepth = 15;
  const generatedGrid = useMemo(() => {
    let result = []; //vec3 array
    for (let x = 0; x < viewport.width; x += cubeSize)
      for (let z = 0; z < (columnDepth * cubeSize); z += cubeSize)
        result.push({ position: [x, Math.random(), z] });
    return result;
  }, []);

  useFrame(() => {
    //update objects
    generatedGrid.forEach((data, i) => {
      const t = clock.getElapsedTime()/2;

      const { position } = data; //get prefitted positions on the grid
      dummyObj.position.set(
        position[0],
        noise.noise2D(position[1]+t, position[0]+t),
        position[2]
      );
      dummyObj.updateMatrix();
      //place created object in instancedMesh for management
      instancedColumns.current.setMatrixAt(i, dummyObj.matrix);
    });
    instancedColumns.current.instanceMatrix.needsUpdate = true; //force update of matrix
  }, 1 /**number 1 render priority */);

  return (
    <instancedMesh
      ref={instancedColumns}
      castShadow
      position={[-viewport.width / 2, 0, columnDepth / cubeSize]}
      receiveShadow
      args={[null, null, generatedGrid.length]}
    >
      <boxBufferGeometry
        /**we are consistently mapping position data, dont dispose objects
         * once a frame finishes*/
        // dispose={false}
        args={[cubeSize, cubeSize, cubeSize, 1]}
        attatch="geometry"
      />
      <meshPhongMaterial
        color="white"
        side={THREE.DoubleSide}
        attatch="material"
      />
    </instancedMesh>
  );
}


function Box({ position, color }) {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01));

  return (
    <mesh position={position} ref={ref}>
      <boxBufferGeometry args={[1, 1, 1]} attach="geometry" />
      <meshPhongMaterial color={color} attach="material" />
    </mesh>
  );
}

export default ({ theme }) => {
  const { viewport } = useThree();

  return (
    <div id="three-portfolio">
      <Canvas
        concurrent
        shadowMap
        pixelRatio={typeof window !== "undefined" && window.devicePixelRatio}
        gl={{ alpha: true, antialias: true }}
        camera={{position: [0, 0, 20], fov: 50, near: 1, far: 70 }}
      >
        <fog attach="fog" args={["white", 10, 100]} />
        <color attach="background" args={["white"]} />
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[50, 50, 25]}
          angle={0.3}
          intensity={2}
          castShadow
        />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} />
        <Suspense fallback={null}>
          <Physics
            gravity={[0, -50, 0]}
            defaultContactMaterial={{ restitution: 0.6 }}
          >
            <group position={[0, 15, -15]} rotation={[1.5,0,0]}>
              <Mouse />
              <MovingColumns/>
              <Borders />
            </group>
            <Post/>
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
};
// <Post />
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
