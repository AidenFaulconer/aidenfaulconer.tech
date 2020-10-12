import * as THREE from "three";
import React, { Suspense, useState, useCallback, useRef } from "react";
import { Canvas, useFrame, useThree, useLoader } from "react-three-fiber";
import { Physics, useBox, usePlane, useSphere } from "use-cannon";
import Post from "./three-post-processing";

// A physical sphere tied to mouse coordinates without visual representation
function Mouse() {
  const ref = useRef();
  const { viewport } = useThree();
  const [_, api] = useSphere(() => ({ type: "Kinematic", args: cubeSizeOffset*8 }));
  return useFrame((state) =>{
    // api.position.set(
    //   -(state.mouse.x * viewport.width) / 2,
    //   (state.mouse.y * viewport.height) / 2,
    //   0
    // )
    // _.current.position.set(
    //   -(state.mouse.x * viewport.width) / 2,
    //   (state.mouse.y * viewport.height) / 2,
    //   0
    // )

    // return (<>
    //   <mesh ref={ref} receiveShadow castShadow>
    //     <boxGeometry attatch="geometry" args={[cubeSizeOffset,cubeSizeOffset,cubeSizeOffset]}/>
    //     <meshBasicMaterial attatch="material" color="red"/>
    //   </mesh>
    // </>)
  });
}

// A physical plane without visual representation
function Plane({ color, ...props }) {
  usePlane(() => ({ ...props }));
  return (
    <>
      <instancedMesh
        rotation={[0, Math.PI, 0]}
        castShadow
        receiveShadow
        args={[1]}
      >
        <planeBufferGeometry args={[1, 1, 1]} attatch="geometry" />
        <meshBasicMaterial color="red" attatch="material" />
      </instancedMesh>
    </>
  );
}

// Creates a crate that catches the spheres
function Borders() {
  const cornerOffsetDepth = .25;
  const { viewport } = useThree();
  return (
    <>
      <Plane
        position={[0, -viewport.height / 2 + .75, -3]}
        rotation={[-Math.PI / 2, 0, 0]} /**ground */
      />
      <Plane
        position={[0, viewport.height / 2 + cornerOffsetDepth, -3]}
        rotation={[Math.PI / 2, 0, 0]} /**ceiiling */
      />
      <Plane
        position={[-viewport.width / 2 + -cornerOffsetDepth, 0, 0]}
        rotation={[0, Math.PI / 2, 0]} /**right */
      />
      <Plane
        position={[viewport.width / 2 + cornerOffsetDepth, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]} /**left */
      />
      <Plane position={[0, 0, -cubeSizeOffset*1.85]} rotation={[0, 0, 0]} /**back */ />
      <Plane position={[0, 0, 0]} rotation={[0, -Math.PI, -1]} /**front */ />
    </>
  );
}


// Spheres falling down
function InstancedBoxs({theme}) {
  const { viewport } = useThree();
  // const texture = useLoader(THREE.TextureLoader, crossUrl)
  /*const [state] = useState(() => ({
    playing: [],
    sounds: [...new Array(10)].map(() => new Audio(strikeUrl))
  }))
  const play = useCallback((index, velocity) => {
    //console.log(state.playing, Math.max(...state.playing))
    if (velocity > 2 && velocity > Math.max(...state.playing) / 2 && state.playing.length < 10) {
      state.playing.push(velocity)
      setTimeout(() => state.playing.splice(0, 1), 200)
      state.playing.forEach((velocity, index) => {
        state.sounds[index].volume = clamp(velocity / 10, 0, 1)
        state.sounds[index].play()
      })
    }
  }, [])*/
  const [ref] = useBox((index) => {
    let x, y;
    y = -(viewport.height/2) * index ;
    x = -viewport.width/2 + index;
    return {
      mass: 10,
      // position: [x, y, 0],
      position: [x, viewport.height, 0],
      args: [cubeSizeOffset, cubeSizeOffset, cubeSizeOffset]
      //onCollide: e => play(index, e.contact.impactVelocity),
    };
  });
  return (
    <instancedMesh
      ref={ref}
      rotation={[0, Math.PI, 0]}
      castShadow
      receiveShadow
      args={[
        null,
        null,
        Math.floor(viewport.width * viewport.height * (1 / 16))
      ]}
    >
      <boxBufferGeometry args={[cubeSizeOffset, cubeSizeOffset, cubeSizeOffset]} />
      <meshBasicMaterial
        color={theme.colors.primary}
        flatShading
        toneMapped={false}
      />
    </instancedMesh>
  );
}

export const cubeSizeOffset = .5;
export const cameraDistance = 9;

export default ({theme}) => {
  return (
    <Canvas
      concurrent
      shadowMap
      gl={{ alpha: false, antialias: false }}
      camera={{
        position: [0, 0, cameraDistance],
        rotation: [0, Math.PI / 2, 0],
        fov: 50,
        near: 1,
        far: 20
      }}
    >
      <color attach="background" args={[theme.colors.foreground]} />
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[0, 0, .5]}
        angle={Math.PI * 2}
        intensity={.5}
        color={theme.colors.foreground}
        castShadow
        shadow-mapSize-width={100}
        shadow-mapSize-height={100}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {/**
      <gridHelper position={[0, -4.3, 0]} args={[20, 20, "red"]} />
       */}
      <Suspense fallback={null}>
        <Physics
          gravity={[0, -50, 0]}
          defaultContactMaterial={{ restitution: 0.1 }}
        >
          <group position={[0, 0, .5]}>
            <mesh>
            <planeGeometry receiveShadow position={[0,0,-10]} args={[25,25,1]}/>
            <meshPhysicalMaterial
              color={theme.colors.foreground}
              toneMapped={false}
              clearcoat={1}
              clearcoatRoughness={0}
            />
            </mesh>
            <Mouse/>
            <Borders />
            <InstancedBoxs theme={theme}/>
          </group>
        </Physics>
      </Suspense>
    </Canvas>
  );
}
