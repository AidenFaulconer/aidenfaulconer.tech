import * as THREE from "three";
import { MeshBasicMaterial, Vector3 } from "three";
import React, {
  Suspense,
  useMemo,
  useState,
  useCallback,
  useRef,
  useEffect
} from "react";

//animation and post processing
import { useSpring, interpolate } from "@react-spring/core";
import { isEmpty } from "lodash-es";
import { a } from "@react-spring/three";
import Post from "./Post.js";
import SimplexNoise from "simplex-noise";

//three.js in react
import {
  extend,
  Canvas,
  useFrame,
  useThree,
  useLoader
} from "@react-three/fiber";
import {
  meshBounds,
  Environment,
  softShadows,
  useDetectGPU,
  Sky
  // useAspect
} from "@react-three/drei";
import { Physics, usePlane, useSphere, useBox } from "use-cannon"; //not compatible with @react-three/fiber, needs redundant install of react-three-fiber
// import CurveModifier from "drei/CurveModifier";

//asset imports
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import cube_import from "./assets/cube.gltf";
import previewPlane_import from "./assets/previewPlane.gltf";

//interact with the scene via collisions if desired
export const Mouse = () => {
  const viewportOffset = 2;
  const { viewport } = useThree();
  const position = [0, 0, 0];
  const dimensions = [1, 1, 1, 1];
  const [_, api] = useSphere((index) => ({
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
    <instancedMesh>
      <sphereBufferGeometry
        attatch="geometry"
        args={dimensions}
        position={position}
      />
      <meshStandardMaterial flatShading attatch="material" color="black" />
    </instancedMesh>
  );
};

//**requires a texture path prop passed in as url** */
export const PreviewPlane = ({
  x,
  shadows = false,
  visible = false,
  density = 1,
  url,
  ...props
}) => {
  const { viewport, gl } = useThree();
  const texture = useLoader(THREE.TextureLoader, url);
  const {
    nodes: { Plane }
  } = useLoader(GLTFLoader, previewPlane_import);
  // const [ref, api] = usePlane(() => ({ args: [density, density], ...props }));

  const determineMaterialFactor = useMemo(() => 0.3, []);
  // prettier-ignore
  const determineColor = useMemo(() => ("darkgrey"),[]);

  return (
    <mesh
      {...props}
      geometry={Plane.geometry}
      raycast={meshBounds}
      receiveShadow
      castShadow
      // dispose={null}
      // ref={ref}
    >
      <planeBufferGeometry
        attatch="geometry"
        scale={props.scale ? props.scale : 1}
        args={[viewport.width, viewport.width, viewport.height]}
      />
      <a.meshPhysicalMaterial
        //  map={texture}
        map-flipY={true}
        side={THREE.DoubleSide}
        map-wrapS={THREE.RepeatWrapping}
        map-wrapT={THREE.RepeatWrapping}
        map-repeat={[1, 1]}
        map-offset={[0.001, 0.001]} //no gaps between textures, scale the image inwards just slightly
        map-anisotropy={10}
        transparent={false}
        flatShading={false}
        toneMapped={false}
        attach="material"
        receiveShadow
        castShadow
        color={determineColor}
        opacity={0}
        roughness={determineMaterialFactor}
        clearcoat={determineMaterialFactor}
      />
    </mesh>
  );
};

// A physical plane with collisions
//prettier-ignore
export const Plane = React.memo(({x,shadows = false,visible = false,density = 1,...props}) => {
 
  const {viewport,gl: { render },camera} = useThree();
  const [ref, api] = usePlane(() => ({ args: [density, density], ...props }));
  // const planeRef = React.useRef(ref)
  // const shadowRef = React.useRef(ref)

  // React.useEffect(()=>{
  //   // console.log(planeRef.current)
  //   if (typeof shadowRef.current?.children != 'undefined')
  //     console.log(shadowRef.current?.children)
  // },[])
  // /https://github.com/pmndrs/drei#softshadows
  // https://threejs.org/docs/#api/en/textures/Texture.dispose
  // const dispose = React.useCallback(() => {
  //   if (typeof shadowRef.current?.children != 'undefined')
  //     {
  //       console.log(shadowRef.current?.children)
  //       // shadowRef.current?.children[0].material.map
  //     }
  // },[])

  return (
    <a.mesh receiveShadow={shadows} ref={ref} {...props} >
      <a.planeBufferGeometry
        receiveShadow
        attatch="geometry"
        scale={props.scale ? props.scale : 1}
        args={[viewport.width, viewport.width, viewport.width*20,viewport.height*20]}
      /> 
        {/* some planes only used for collisions, but the ground is used for shadows and collisions */}
        {shadows && (
          <> 
          <a.meshPhysicalMaterial
            tonemapped={false}
            attach="material"
            visible={visible}
            opacity={1}
            
            //debugging
            color={x||"black"}
            roughness={0.7}
            // wireframe
            // dispose={(e)=>planeRef.current.texture.dispose()}
            // transparent
          />
        <shadowMaterial
          receiveShadow
          tonemapped={false}
          visible
          color={x}
          opacity={0.6}
          attach="material"
          // wireframe
          // dispose={null}
        />
      </>)||(
        <>
      <meshPhysicalMaterial
         tonemapped={false}
          emissive
         attach="material"
         opacity={0}
         visible={visible}
         transparent
         receiveShadow
        //  debugging
        //  roughness={0}
        //  clearcoat={.6}
        //  color={x}
        //  wireframe
       />
      </>
      )}
    </a.mesh>
  );
});

// Creates a crate that catches the spheres
export const Borders = ({ opacity, x }) => {
  const { viewport } = useThree();
  const offset = 0;
  return (
    <group>
      {/* ground with shadow*/}
      <Plane
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]} // ground
        x={x}
        scale={[5, 5, 5]}
        shadows
        opacity={1}
        density={10}
        visible={true}
      />

      <Plane
        rotation={[0, Math.PI / 2, 0]}
        position={[-viewport.width / 2, viewport.height / 2, 0]} // left
        x={x}
        opacity={0}
        visible={false}
      />
      <Plane
        rotation={[0, -Math.PI / 2, 0]}
        position={[viewport.width / 2, viewport.height / 2, 0]} // right
        x={x}
        opacity={0}
        visible={false}
      />
      <Plane
        rotation={[0, 0, 0]} /** back */
        position={[0, viewport.height / 2, -2]}
        x={x}
        opacity={0}
        visible={false}
        shadows
      />
      <Plane
        rotation={[0, -Math.PI, 0]} /** front */
        position={[0, viewport.height / 2, 3.5]}
        x={x}
        opacity={0}
        visible={false}
      />
    </group>
  );
};

extend({ OrbitControls });
export const deg2rad = (deg) => deg * (Math.PI / 180);
const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
    viewport
  } = useThree();

  const curveRef = useRef();
  const [handlePos, setHandlePos] = React.useState([0, 0, 0]);

  const curve = React.useMemo(
    () => new THREE.CatmullRomCurve3([...handlePos], true, "centripetal"),
    [handlePos]
  );

  const controls = useRef();

  useEffect(() => {
    let orbitControls = controls.current;
    orbitControls.target = new Vector3(
      cameraCoords[0],
      cameraCoords[1] + 0.5,
      cameraCoords[0]
    ); //set to center of shifting column construct
    // isMobile && orbitControls.dispose();
    // orbitControls.autoRotate = true;
    // orbitControls.maxDistance = 15;
    orbitControls.maxZoom = 2;
    // orbitControls.enableZoom = false;
    // orbitControls.autoRotateSpeed = 1.5;
    // orbitControls.enabled = true;
    // orbitControls.maxPolarAngle = 1.25;
    // orbitControls.maxAzimuthAngle = -0.5;

    orbitControls.enablePan = true;
    orbitControls.touches = THREE.TOUCH.TWO;
  }, []);
  useFrame((state) => {
    let orbitControls = controls.current;
    orbitControls.update();
  });

  return <orbitControls ref={controls} args={[camera, domElement]} />;
};

export const Models = ({ children, set, x, mobile }) => {
  const textureData = [
    require("./assets/graphic.png"),
    require("./assets/frame-95.png"),
    require("./assets/hero.png"),
    require("./assets/tank-driver.png")
  ];

  const {
    nodes: { Cube }
  } = useLoader(GLTFLoader, cube_import);

  const [current, setCurrent] = useState(0);
  const [inspect, setInspect] = useState(-1);
  useEffect(() => {
    console.log(inspect);
  }, [inspect]);

  const colors = ["#000064", "#21bcfe", "#28bd7f", "#21bcfe"];

  const mapObjects = useCallback(
    () =>
      textureData.map((url, i) => (
        <Model
          color={colors[i]}
          model={Cube}
          mobile={mobile}
          url={url}
          key={i}
          position={i}
          set={set}
          x={x}
          setCurrent={setCurrent}
          setInspect={setInspect}
          ratio={textureData.length - 1}
        />
      )),
    []
  );

  const inspectObject = useCallback(
    (index) => (
      <Model
        mobile={mobile}
        //determined by number of posts displayed
        ratio={textureData.length - 1}
        color={colors[index]}
        model={Cube}
        url={textureData[index]}
        key={index}
        position={index}
        set={set}
        x={x}
        setCurrent={setCurrent}
        setInspect={setInspect}
      />
    ),
    []
  );

  const handleState = useCallback(() => {
    if (inspect >= 0) return inspectObject(inspect);
    else return mapObjects();
  }, [inspect]);

  return (
    <a.group
      receiveShadow
      castShadow
      position={[0, 0, 1.25]}
      scale={[0.5, 0.5, 0.5]}
    >
      {handleState()}
    </a.group>
  );
};

export const Model = ({
  children,
  color,
  set,
  x,
  model,
  mobile = false,
  url,
  position,
  setCurrent,
  setInspect,
  ratio
}) => {
  const { viewport } = useThree();
  const texture = useLoader(THREE.TextureLoader, url);
  const scale = Number(viewport.width / viewport.height / (ratio*.47));

  //prettier-ignore bounding box is the scale times 2.01
  const [ref, api] = useBox(() => ({
    mass: 10,
    args: [scale * 2.01, scale * 2.01, scale * 2.01],
    position: [position / (viewport.width / 4), 0, 0] // onCollide: (e) => console.log("hit")
  }));

  const [hovered, setHovered] = useState(false);

  //prettier-ignore
  const onClick = useCallback(() => {setInspect(position);set({ x: color });}, []);
  //prettier-ignore
  const onPointerOver = useCallback((e) => {setHovered(true);set({ x: color });setCurrent(position);}, [hovered]);
  //prettier-ignore
  const onPointerOut = useCallback(() => {setHovered(false);/* set({ x: "#FFFFFF" });**/}, [hovered]);

  // prettier-ignore
  const determineMaterialFactor = useMemo(() => (hovered ? 0.6 : 1),[hovered]);
  const determineClearcoat = useMemo(() => (hovered ? 0 : 1), [hovered]);
  // prettier-ignore
  const determineColor = useMemo(() => (hovered ? "white" : x),[hovered]);

  return (
    <a.mesh
      scale={mobile ? [0.5, 0.5, 0.5] : [scale, scale, scale]}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      geometry={model.geometry}
      // raycast={meshBounds} somehow fix's raycasting, not sure how its working without yet
      dispose={null} //dont dispose objects once spawned for performance
      onClick={onClick}
      position={position + viewport.height}
      receiveShadow
      castShadow
      ref={ref}
    >
      {/* repalce with animatedMaterial(drei) where the props are the props from this material in a js object */}
      <a.meshPhysicalMaterial
        map={texture}
        map-flipY={false}
        map-wrapS={THREE.RepeatWrapping}
        map-wrapT={THREE.RepeatWrapping}
        map-repeat={[1, 1]}
        map-offset={[0.01, 0.01]} //no gaps between textures, scale the image inwards just slightly
        map-anisotropy={10}
        transparent={false}
        flatShading={false}
        toneMapped={false}
        attach="material"
        receiveShadow
        castShadow
        color={determineColor}
        opacity={1}
        roughness={determineMaterialFactor}
        clearcoat={determineClearcoat}
      />
    </a.mesh>
  );
};

//the canvas and scene graph are here or derive from it
export const cameraCoords = [0, 1.25, -3.5];
export default ({ x, set, theme, id, themeTools, setTheme }) => {
  // softShadows({
  //   frustum: 3.75,
  //   size: 0.005,
  //   near: 9.5,
  //   samples: 17,
  //   rings: 11 // Rings (default: 11) must be a int
  // });

  const GPUTier = useDetectGPU();

  return (
    <Canvas
      colorManagement
      resize={false} //dont update canvas on user scroll
      concurrent
      shadowMap
      id={id}
      pixelRatio={typeof window !== "undefined" && window.devicePixelRatioo}
      gl={{
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
        antialias: true
      }}
      camera={{
        position: cameraCoords,
        fov: 50,
        near: 1,
        far: 50,
        rotation: [Math.PI * 0.25, 0, 0]
      }}
    >
      <fog args={[x, 5, 50]} attatch="background" />
      <ambientLight color={x} intensity={0.15} />
      <directionalLight
        castShadow
        position={[3.5, 2.5, -3]}
        intensity={1.5}
        color={x}
        //enabling shadows

        //2k texture
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        //1k texture
        // shadow-mapSize-width={1024}
        // shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <CameraControls />
      <Suspense fallback={null}>
        {/* not dependant on physics */}
        {/* <SkyScene3> */}
        {/* all dependendant on physics */}
        <Physics allowSleep gravity={[0, -20, 0]}>
          <axesHelper args={[1, 1, 1]} />
          <Borders opacity={1} x={x} />
          <Models set={set} x={x} mobile={false} />
        </Physics>

        <Environment preset="studio" />
        {/* </SkyScene3> */}
      </Suspense>

      {/* <Post theme={theme} /> */}
    </Canvas>
  );
};

//old stuff and ideas to derive from
//removed @react-three/fiber because of incompatiblility with use-cannon :(
//still finicky with @react-three/drei :(
//damn physics library I need!

// function SkyScene3({ children }) {
//   // NOT the right way to do it...
//   const [inclination, setInclination] = React.useState(0);
//   useFrame(() => {
//     setInclination((a) => a + 0.002);
//   });

//   return (
//     <>
//       <Sky
//         distance={3000}
//         turbidity={Number("Turbidity", 8, { range: true, max: 10, step: 0.1 })}
//         rayleigh={Number("Rayleigh", 6, { range: true, max: 10, step: 0.1 })}
//         mieCoefficient={Number("mieCoefficient", 0.005, {
//           range: true,
//           max: 0.1,
//           step: 0.001
//         })}
//         mieDirectionalG={Number("mieDirectionalG", 0.8, {
//           range: true,
//           max: 1,
//           step: 0.01
//         })}
//         inclination={inclination}
//         azimuth={Number("Azimuth", 0.25, { range: true, max: 1, step: 0.01 })}
//       />
//       {children}
//       {/* <Plane rotation-x={Math.PI / 2} args={[100, 100, 4, 4]}> */}
//       {/* <meshBasicMaterial color="black" wireframe attach="material" /> */}
//       {/* </Plane> */}
//     </>
//   );
// }

// const movecamera = props => {
//   const { camera } = useThree();

//   useFrame(() => {
//     const t = clock.elapsedTime / noiseSpeed;
//     // camera.
//   })
// }

// const RenderConditionally = (props) =>
//   useFrame(
//     ({ gl, scene, camera }) => props.isScrolling && gl.render(scene, camera),
//     1
//   );
{
  /* <directionalLight
        position={[3.5, 2.5, -3]}
        intensity={1.25}
        color={x}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      /> */
}
//curve modifiers can be used to move camera, although in drei documentation it says its for mesh's, a hackly work around should work
{
  /*<CurveModifier ref={curveRef} curve={curve}>*/
}
{
  /* </CurveModifier> */
}

{
  /* <shadowMaterial
          tonemapped={false}
          attach="material"
          visible={visible}
          color={x||"red"}
          opacity={0}
        />  */
}
{
  /* <a.meshPhysicalMaterial
            tonemapped={false}
            roughness={0.7}
            // wireframe
            attach="material"
            visible={visible}
            opacity={0.3}
            transparent
        /> */
}

{
  /* <ContactShadows
          rotation={[Math.PI/2, 0, 0]}
          ref={shadowRef}
          position={[0, -1.6, 0]}
          attach="material"
          opacity={0.6}
          resolution={2480}
          width={15}
          // dispose={()=>dispose}
          // dispose={(e)=>planeRef.current.texture.dispose()}
          height={15}
          blur={2.5}
          far={1.6}
        /> */
}

// Reflector
//   args={[1, 1]} // PlaneBufferGeometry arguments
//   resolution={256} // Off-buffer resolution, lower=faster, higher=better quality
//   mirror={0.5} // Mirror environment, 0 = texture colors, 1 = pick up env colors
//   mixBlur={1.0} // How much blur mixes with surface roughness (default = 0), note that this can affect performance
//   mixStrength={0.5} // Strength of the reflections
//   depthScale={1} // Scale the depth factor (0 = no depth, default = 0)
//   minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
//   maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
//   depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
//   distortion={0} // Amount of distortion based on the distortionMap texture
//   distortionMap={distortionTexture} // The red channel of this texture is used as the distortion map. Default is null
//   debug={0} /* Depending on the assigned value, one of the following channels is shown:
//     0 = no debug
//     1 = depth channel
//     2 = base channel
//     3 = distortion channel
//     4 = lod channel (based on the roughness)
//   */
// >
//   {(Material, props) => <Material {...props}>}
// </Reflector>
