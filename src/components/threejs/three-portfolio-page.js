import * as THREE from "three";
import { Vector3 } from "three";
import React, {
  useContext,
  Suspense,
  useMemo,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  Canvas,
  useFrame,
  useThree,
  useLoader,
  Renderer,
  extend,
} from "react-three-fiber";
import Post from "./three-post-processing";

//asset imports
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import cube_import from "../../static/assets/gameModels/previewPlane.gltf";
import previewPlane_import from "../../static/assets/gameModels/previewPlane.gltf";

//physics and animation
import { a } from "@react-spring/three";
import { Physics, usePlane, useSphere, useBox } from "use-cannon";
import { useSpring, interpolate } from "@react-spring/core";
// import { meshBounds } from "drei";
import SimplexNoise from "simplex-noise";
import { GlobalStore } from "../../layout/layout";

export const Mouse = () => {
  const viewportOffset = 2;
  const { viewport } = useThree();
  const position = [0, 0, 0];
  const dimensions = [1, 1, 1, 1];
  const [_, api] = useSphere((index) => ({
    type: "Kinematic",
    args: dimensions,
    position,
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

//prettier-ignore
//**requires a texture path prop passed in as url** */
export const PreviewPlane = ({x,shadows = false,visible = false,density = 1, url, ...props}) => {
  

  // const [ref, api] = usePlane(() => ({ args: [density, density], ...props }));
  const {viewport,gl} = useThree();
  const texture = useLoader(THREE.TextureLoader, url);
  const {
    nodes: { Plane }
  } = useLoader(GLTFLoader, previewPlane_import);
  const determineMaterialFactor = useMemo(() => (0.6),[]);
  // prettier-ignore
  const determineColor = useMemo(() => ("darkgrey"),[]);
  return ( 
      <mesh 
        {...props} 
        geometry={Plane.geometry}
        // raycast={meshBounds} 
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
         map={texture}
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
         opacity={determineMaterialFactor}
         roughness={determineMaterialFactor}
         clearcoat={determineMaterialFactor}
       />                              
    </mesh>
  );
};

// A physical plane without visual representation
//prettier-ignore
export const Plane = ({x,shadows = false,visible = false,density = 1,...props}) => {
 
  const {viewport,gl: { render },camera} = useThree();
  const [ref, api] = usePlane(() => ({ args: [density, density], ...props }));


  const BlurShadows = useCallback(() => {
    // renderTargetBlur = new THREE.WebGLRenderTarget(512, 512);
    // renderTargetBlur.texture.generateMipmaps = false;
  }, []);

  const depthMaterial = useMemo(() => {
    // like MeshDepthMaterial, but goes from black to transparent
    let depthMaterial = new THREE.MeshDepthMaterial();
    depthMaterial.userData.darkness = { value: 0.75 };
    depthMaterial.onBeforeCompile = function (shader) {
      shader.uniforms.darkness = depthMaterial.userData.darkness;
      shader.fragmentShader = /* glsl */ `
						uniform float darkness;
						${shader.fragmentShader.replace(
              "gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );",
              "gl_FragColor = vec4( vec3( 0.0 ), ( 1.0 - fragCoordZ ) * darkness );"
            )}`;
    };

    depthMaterial.depthTest = false;
    depthMaterial.depthWrite = false;

    return depthMaterial;
  }, []);

  const blurMaterials = useMemo(() => {
    // let horizontalBlurMaterial = new THREE.ShaderMaterial(HorizontalBlurShader);
    // horizontalBlurMaterial.depthTest = false;
    // let verticalBlurMaterial = new THREE.ShaderMaterial(VerticalBlurShader);
    // verticalBlurMaterial.depthTest = false;
    // return ({ verticalBlurMaterial, horizontalBlurMaterial })
  }, []);

  // renderTarget --> blurPlane (horizontalBlur) --> renderTargetBlur --> blurPlane (verticalBlur) --> renderTarget
  useFrame(({ scene }) => {
    // ref.current.visible = true;
    // // blur horizontally and draw in the renderTargetBlur
    // ref.current.material = horizontalBlurMaterial;
    // ref.current.material.uniforms.tDiffuse.value = renderTarget.texture;
    // horizontalBlurMaterial.uniforms.h.value = amount * 1 / 256;
    // // renderer.setRenderTarget(renderTargetBlur);
    // // renderer.render(ref.current, shadowCamera);
    // // blur vertically and draw in the main renderTarget
    // ref.current.material = verticalBlurMaterial;
    // ref.current.material.uniforms.tDiffuse.value = renderTargetBlur.texture;
    // verticalBlurMaterial.uniforms.v.value = amount * 1 / 256;
    // // renderer.setRenderTarget(renderTarget);
    // // renderer.render(ref.current, shadowCamera);
    // ref.current.visible = false;
    // scene.overrideMaterial = depthMaterial
  });

  return (
    <mesh receiveShadow={shadows} ref={ref} {...props} >
      <planeBufferGeometry
        attatch="geometry"

        scale={props.scale ? props.scale : 1}
        args={[viewport.width, viewport.width, viewport.height]}
      /> 
        <shadowMaterial
          tonemapped={false}
          attach="material"
          visible={visible}
          color={x||"red"}
          opacity={0.3}
        /> 
    </mesh>
  );
};

// Creates a crate that catches the spheres
export const Borders = ({ opacity, x }) => {
  const { viewport } = useThree();
  const offset = 0.5;
  return (
    <group>
      {/* <Plane
        position={[0, viewport.height / 2 + offset, 0]} // ceiiling
        rotation={[-Math.PI / 2, 0, 0]}
      /> */}
      <Plane
        scale={[5, 5, 5]}
        shadows
        opacity={1}
        density={10}
        visible={true}
        x={x}
        position={[0, 0, 0]} // ground
        rotation={[-Math.PI / 2, 0, 0]}
      />

      <Plane
        opacity={0}
        position={[-viewport.width - offset, 0, 0]} // left
        rotation={[0, Math.PI / 2, 0]}
      />
      <Plane
        opacity={0}
        position={[viewport.width / 4, 0, 0]} // right
        rotation={[0, -Math.PI / 2, 0]}
      />
      <Plane
        opacity={0}
        position={[0, 0, -2]}
        rotation={[0, 0, 0]} /** back */
      />
      <Plane
        opacity={0}
        position={[0, 0, 3.5]}
        rotation={[0, -Math.PI, 0]} /** front */
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
    viewport,
  } = useThree();
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

export const Models = ({
  children,
  set,
  x,
  threejsContext,
  setThreejsContext,
}) => {
  const {
    nodes: { Cube },
  } = useLoader(GLTFLoader, cube_import);

  //#region store
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    // setThreejsContext();
  }, [current]);
  //#endregion store

  return (
    <a.group
      receiveShadow
      castShadow
      position={[0, 0, 1.25]}
      scale={[0.5, 0.5, 0.5]}
    >
      <PreviewPlane
        opacity={0}
        scale={[2.25, 1.5, 1]}
        position={[0, 3.2, 4]}
        rotation={[deg2rad(180), 0, 0]} /** back */
        x={x}
        url={threejsContext.blogThemes.images[current]}
      />
      {threejsContext.blogThemes.images.map((url, i) => (
        <Model
          color={colors[i]}
          model={Cube}
          url={url}
          key={i}
          position={i}
          set={set}
          x={x}
          setCurrent={setCurrent}
        />
      ))}
    </a.group>
  );
};

export const Model = ({
  children,
  color,
  set,
  x,
  model,
  url,
  position,
  setCurrent,
}) => {
  const { viewport } = useThree();
  const texture = useLoader(THREE.TextureLoader, url);

  //prettier-ignore
  const [ref, api] = useBox(() => ({mass: 10,args: [2.01, 2.01, 2.01],position: [position / (viewport.width / 4), 0, 0]// onCollide: (e) => console.log("hit")
  }));

  const [hovered, setHovered] = useState(false);
  //prettier-ignore
  const onClick = useCallback(() => set({ x: color }), []);
  //prettier-ignore
  const onPointerOver = useCallback((e) => {setHovered(true);set({ x: color });setCurrent(position);}, [hovered]);
  //prettier-ignore
  const onPointerOut = useCallback(() => {setHovered(false);/* set({ x: "#FFFFFF" });**/}, [hovered]);
  // prettier-ignore
  const determineMaterialFactor = useMemo(() => (hovered ? 0.6 : 1),[hovered]);
  // prettier-ignore
  const determineColor = useMemo(() => (hovered ? "grey" : "white"),[hovered]);

  return (
    <a.mesh
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      geometry={model.geometry}
      // raycast={meshBounds}
      onClick={onClick}
      // dispose={null}
      receiveShadow
      castShadow
      ref={ref}
    >
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
        opacity={determineMaterialFactor}
        roughness={determineMaterialFactor}
        clearcoat={determineMaterialFactor}
      />
    </a.mesh>
  );
};

export const cameraCoords = [0, 1.25, -4];
export default ({ x, set, id, setThreejsContext, threejsContext }) => {
  console.log(JSON.stringify(threejsContext, null, ""));
  return (
    <Canvas
      colorManagement
      resize={true} //dont update canvas on user scroll
      concurrent
      shadowMap
      id={id}
      pixelRatio={typeof window !== "undefined" && window.devicePixelRatioo}
      gl={{
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: false,
        antialias: true,
      }}
      camera={{
        position: cameraCoords,
        fov: 50,
        near: 1,
        far: 50,
      }}
    >
      <ambientLight color={x} intensity={0.25} />
      <fog args={[x, 5, 50]} attatch="background" />
      <directionalLight
        position={[3.5, 2.5, -3]}
        intensity={1.25}
        color={"white"}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <CameraControls />
      <Suspense fallback={null}>
        <Physics allowSleep gravity={[0, -10, 0]}>
          <axesHelper args={[1, 1, 1]} />
          <Borders opacity={1} x={x} />
          <Models
            set={set}
            x={x}
            setThreejsContext={setThreejsContext}
            threejsContext={threejsContext}
          />
        </Physics>
      </Suspense>
      {/* <Post theme={threejsContext.theme} /> */}
    </Canvas>
  );
};

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
