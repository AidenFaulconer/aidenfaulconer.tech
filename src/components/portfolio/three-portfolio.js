import * as THREE from "three";
import { TextureLoader, WebGLRenderTarget, Object3D, Vector3, Camera, DirectionalLight, Raycaster, ArrowHelper } from "three";
import React, { Suspense, useMemo, useState, useCallback, useRef, useEffect } from "react";
import {
  Canvas,
  useFrame,
  useThree,
  useLoader,
  Renderer,
  extend
} from "react-three-fiber";
import { Physics, usePlane, useSphere, useBox, useCylinder } from "use-cannon";
import Post from "./three-post-processing.js";
import linesUrl from "../../../static/assets/lines.png";
import SimplexNoise from "simplex-noise"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export const Mouse = () => {
  const viewportOffset = 2;
  const { viewport } = useThree();
  const position = [-viewport.width, -viewport.height, 8.7];
  const dimensions = [6, 6, 6, 6];
  const [_, api] = useBox((index) => ({
    type: "Kinematic",
    args: dimensions,
    position
  }));
  useFrame((state) => {
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
      <meshBasicMaterial attatch="material" opacity={0.25} color="white" />
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

export const deg2rad = (deg) => deg * (Math.PI/180)

extend({OrbitControls});
const CameraControls = () => {
  const { camera,gl:{domElement},viewport} = useThree();
  const controls = useRef();

  useEffect(()=>{
    // camera.rotation.x = THREE.MathUtils.degToRad(90);
    //init
    let orbitControls = controls.current;
    let camera = orbitControls.object;

    orbitControls.target = new Vector3(viewport.width * cubeSize, -3, viewport.width * cubeSize);
    orbitControls.maxDistance = 25;
    orbitControls.autoRotate = true;
    orbitControls.maxZoom = 4;
    orbitControls.enableZoom = false;
    orbitControls.autoRotateSpeed = .5;
    orbitControls.maxPolarAngle = 0;
    orbitControls.enablePan = false;
  },[])
  useFrame((state)=>{
  let orbitControls = controls.current;
  orbitControls.update();
  });
  return <orbitControls ref={controls} args={[camera,domElement]}/>;
}

export const cubeSize = 4
function MovingColumns({theme}) {
  const { viewport, clock,camera, scene } = useThree();
  const instancedColumns = useRef();

  const noise = new SimplexNoise(Math.random()); //only instance once, hence use of usememo
  const noiseSpeed = 4;
  //create position data
  const dummyObj = useMemo(() => new Object3D(), []); //used to generate a matrix we can use based on the ref'ed blueprint of the object

  const columnDepth = viewport.width * 4;
  const generatedGrid = useMemo(() => {
    let result = []; //vec3 array
    for (let x = 0; x < columnDepth * cubeSize; x += cubeSize)
      for (let z = 0; z < columnDepth * cubeSize; z += cubeSize)
        result.push({ position: [x, z, z] });
    return result;
  }, []);

  const pickColumn = useCallback((normalizedPosition)=>{
  if(!normalizedPosition) return;

  const raycast = new Raycaster();
  //set raycast from camera
  raycast.setFromCamera(normalizedPosition, camera);
  raycast.ray

  const hits = raycast.intersectObjects(scene.children);
  const arrow = new ArrowHelper(camera.getWorldDirection(), camera.getWorldPosition(), 100,Math.random()*0xffffff);

  if (hits.length > 0){
    const objectHit = hits[0].object;
    alert(JSON.stringify(objectHit))
    // const {position} = objectFit;
    // objectHit.position.set(position.x,position.y+clock.getElapsedTime(), position.z);
    objectHit.material.color.set( 0xff0000 )
  }
  },[])

  useFrame((state) => {
    //update objects

    //check mouse input
    // state.mouse.x
    // state.mouse.y


    //generate grid and position them according to noise
    generatedGrid.forEach((data, i) => {
      const t = clock.getElapsedTime() / noiseSpeed;
      const { position } = data; //get prefitted positions on the grid
      dummyObj.position.set(
        position[0],
        noise.noise2D(position[1] + t, position[0] + t),
        position[2]
      );
      dummyObj.updateMatrix();
      //place created object in instancedMesh for management
      instancedColumns.current.setMatrixAt(i, dummyObj.matrix);
    });

    // if(state.mouse.x && state.mouse.y){
    // // alert(state.mouse.x)
    //   pickColumn({
    //   x:(state.mouse.x * viewport.width) * 2 - 1,
    //   y:(state.mouse.y * viewport.height) * 2 + 1,
    //   });
    // }


    instancedColumns.current.instanceMatrix.needsUpdate = true; //force update of matrix

    camera.rotation.x += .1;
  }, 1 /**number 1 render priority */);

  return (
    <instancedMesh
      ref={instancedColumns}
      castShadow
      matrixAutoUpdate={false}/**matrix is manually updated in frame loop */
      position={[0, 10, columnDepth / cubeSize]}
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
      <meshBasicMaterial
        color={theme.colors.foreground}
        transparent={false}
        opacity="1"
        toneMapped={false}
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


  export default ({theme}) => {

const {viewport} = useThree();
  return (
    <Canvas
      concurrent
      shadowMap
      pixelRatio={typeof window !== "undefined" && window.devicePixelRatioo}
      gl={{ alpha: true, antialias: false }}
      camera={{
        fov: 50,
        near: 1,
        far: 40
      }}
    >
      <color attach="background" color={theme.colors.foreground}/>
      <CameraControls/>
      <directionalLight
       castShadow
       position={[0, 10, 0]}
       scale={[1,1,1]}
       color={theme.colors.primary}
       intensity={20}
      />
      <Suspense fallback={null}>
        <Physics
          gravity={[0, -50, 0]}
          defaultContactMaterial={{ restitution: 0.6 }}
        >
          <group position={[0, -6, 0]} >
            <MovingColumns theme={theme}/>
          </group>
        </Physics>
        <Post />
      </Suspense>
    </Canvas>
  );
};