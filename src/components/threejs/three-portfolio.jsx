import * as THREE from 'three';
import {
  MeshBasicMaterial, Vector3, Vector2, Quaternion,
} from 'three';
import React, {
  Suspense,
  useMemo,
  useState,
  useCallback,
  useRef,
  useEffect,
  createRef,
} from 'react';
import { ResizeObserver } from '@juggle/resize-observer';

// animation and post processing
import { useSpring, interpolate } from '@react-spring/core';
import { a } from '@react-spring/three';

// three.js in react
import {
  extend,
  Canvas,
  useFrame,
  useThree,
  useLoader,
} from '@react-three/fiber';
import {
  meshBounds,
  Environment,
  softShadows,
  useDetectGPU,
  Sky,
  useGLTF,
  AdaptiveDpr,
  // useAspect
  Billboard,
  useTexture,
} from '@react-three/drei';
import {
  Physics, usePlane, useSphere, useBox,
} from '@react-three/cannon'; // not compatible with @react-three/fiber, needs redundant install of react-three-fiber

// import CurveModifier from "drei/CurveModifier";
import { Tween } from 'gsap/gsap-core';

// asset imports
// import Post from './post-processing';
import { useBreakpoints } from 'react-use-breakpoints';
import { clamp, degToRad } from 'three/src/math/MathUtils';
import { EffectComposer, SSAO, Bloom } from '@react-three/postprocessing';
import { KernelSize, BlendFunction } from 'postprocessing'; 
// import { SVGLoader } from 'three/jsm/loaders/SVGLoader.js';
import cube_import from '../../../static/assets/gameModels/cube.glb';

// eslint-disable-next-line import/no-unresolved
import one from '../../../static/assets/portfolio/dibbles.png';
import two from '../../../static/assets/portfolio/ajgardencare.png';
import three from '../../../static/assets/portfolio/hakn.png';
import four from '../../../static/assets/portfolio/railgun.png';
import five from '../../../static/assets/portfolio/clouds.png';

import envMap from './design.png';
import cloudImg from '../../../static/assets/cloud.png';
// import pingSound from '../../../static/assets/portfolio/interaction-sound.mp3';
import pingSound from '../../../static/assets/portfolio/transition.mp3';
import { useStore } from '../../store/store';

import brandImage from '../../../static/assets/brand_ring.png';

import ring_import from '../../../static/assets/gameModels/ring.gltf';

import HandModel from './hand';

// ========================================================================== //
// Clouds
// ========================================================================== //

// ========================================================================== //
// Post processing
// ========================================================================== //

// ========================================================================== //
// Physics plane
// ========================================================================== //

// A physical plane with collisions
// prettier-ignore
export const Plane = React.memo(({
  x, shadows = false, visible = false, density = 1, ...props
}) => {
  const { viewport, gl: { render }, camera } = useThree();
  const [ref, api] = usePlane(() => ({ args: [density, density], ...props }));
  // useEffect(() => {
  //   if (ref.current)
  //     //compute a bounding box on the plane
  //     // api.setBounds(meshBounds(ref.current));

  // },[ref])

  return (
    <a.mesh receiveShadow={shadows} ref={ref} {...props} dispose={null}>
      <a.planeBufferGeometry
        receiveShadow
        attatch="geometry"
        scale={props.scale ? props.scale : 1}
        args={[viewport.width, viewport.height, 1, 1]}
      />
      {/* some planes only used for collisions, but the ground is used for shadows and collisions */}
      {shadows && (
      <>
        {/* <a.meshPhysicalMaterial
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
          /> */}
        <shadowMaterial
          receiveShadow
          tonemapped={false}
          color="#ffffff"
          visible
          opacity={0.6}
          attach="material"
        />
      </>
      ) || (
      <>
        <meshBasicMaterial
          tonemapped={false}
          attach="material"
          opacity={0}
          // dont allow this material to occlude other objects
          visible={false}
          depthWrite={false}
          // depthTest={false}
          // visible={visible}

          side={THREE.BackSide}
          alphaTest={0.5}
          transparent
          dispose={null}
          // dispose={(e)=>ref.current.texture.dispose()}
          receiveShadow
        />
      </>
      )}
    </a.mesh>
  );
}, (pre, post) => {
  pre !== post;
});

// ========================================================================== //
// Physics bounds
// ========================================================================== //
// Creates a crate that catches the spheres
export const Borders = ({ opacity }) => {
  const { viewport } = useThree();
  const offset = 0;
  const widen = 1;
  const pos = -2;
  return (
    <group>
      {/* ground with shadow */}
      <Plane
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, pos, 0]} // ground
        scale={[5, 5, 5]}
        shadows
        opacity={1}
        density={10}
        visible
      />

      <Plane
        rotation={[0, Math.PI / 2, 0]}
        position={[-(viewport.width + widen) / 2, viewport.height / 2, 0]} // left
        opacity={0}
        visible={false}
      />
      <Plane
        rotation={[0, -Math.PI / 2, 0]}
        position={[(viewport.width + widen) / 2, viewport.height / 2, 0]} // right
        opacity={0}
        visible={false}
      />
      <Plane
        rotation={[0, 0, 0]} /** back */
        position={[0, viewport.height / 2, -2.5]}
        opacity={0}
        visible={false}
        shadows
      />
      <Plane
        rotation={[0, -Math.PI, 0]} /** front */
        position={[0, viewport.height / 2, 3.5]}
        opacity={0}
        visible={false}
      />
    </group>
  );
};

// ========================================================================== //
// Preload cube **convert gltf to glb**
// ========================================================================== //
useGLTF.preload(cube_import);

// ========================================================================== //
// Models
// ========================================================================== //
export const Models = ({
  children, set, x, mobile,
}) => {
  // tier: number;
  // type: TierType;
  // isMobile?: boolean;
  // fps?: number;
  // gpu?: string;
  // device?: string;
  const { tier } = useDetectGPU();

  // three loader **use draco one**
  // const {
  //   nodes: { Cube },
  // } = useLoader(GLTFLoader, cube_import);
  const postData = useStore((state) => state.threejsContext.context.postData);
  const {
    nodes: { Cube },
  } = useGLTF(cube_import);
  // ========================================================================== //
  //   Global state
  // ========================================================================== //
  const {
    selectedIndex, color, position, pageLink,
  } = useStore(
    (state) => state.threejsContext.context,
  );

  // ========================================================================== //
  //     Project selection
  // ========================================================================== //

  // useEffect(() => {
  //   console.log(selectedIndex);
  // }, [selectedIndex]);
  // ========================================================================== //
  //  Handle selection state
  // ========================================================================== //
  const colors = ['#000064', '#21bcfe', '#28bd7f', '#21bcfe'];
  const mapObjects = useCallback((showState) => postData.map((post, i) => {
    const {
      node: {
        frontmatter: {
          thumbnail, path, title, metaDescription,
        },
      },
    } = post;
      // slice textureData length to three if tier is 1
      // tier === 1 ? textureData.slice(0, 3) : textureData;
    const texture = (thumbnail && useLoader(THREE.TextureLoader, thumbnail))
        || new THREE.Texture();

    // const image = require(`${__dirname}static${thumbnail}`);
    return (
      <Model
        color={colors[i]}
        model={Cube}
        mobile={mobile}
        link={path}
        texture={texture}
        key={i}
        position={i}
        setColor={set}
        x={x}
        ratio={postData.length - 1}
      />
    );
  }, []));

  // const handleState = () => {
  //   console.log(selectedIndex);
  //   if (selectedIndex === -1) return mapObjects(true);
  //   return mapObjects(selectedIndex);
  //   // inspectObject(selectedIndex);
  // };

  return (
    <a.group
      receiveShadow
      castShadow
      position={[0, 0, 0]}
      scale={[0.5, 0.5, 0.5]}
    >
      {mapObjects()}
    </a.group>
  );
};

// ========================================================================== //
// Cubes
// ========================================================================== //
export const Model = React.memo(
  ({
    children,
    color,
    x,
    // setColor,
    model,
    mobile = false,
    texture,
    link,
    position,
    setCurrent,
    ratio,
  }) => {
    // ========================================================================== //
    // Global state methods
    // ========================================================================== //
    const triggerPageChange = useStore(
      (state) => state.threejsContext.methods.triggerPageChange,
    );
    const setColor = useStore((state) => state.threejsContext.methods.setColor);
    const changeContext = useStore(
      (state) => state.threejsContext.methods.changeContext,
    );
    const changePage = useStore(
      (state) => state.threejsContext.methods.changePage,
    );
    const { selectedIndex, animatedColor, animatedOpacity } = useStore(
      (state) => state.threejsContext.context,
    );
    const context = useStore((state) => state.threejsContext.context);
    const isSelectedProject = React.useCallback(
      () => selectedIndex === position,
      [selectedIndex, position],
    );
    // ========================================================================== //
    //     Cube animation
    // ========================================================================== //
    const [animated, setAnimated] = useState(false);
    const animateCube = useCallback(
      (useForce) => {
        setAnimated(true);
        if (useForce) api.applyImpulse([0, 30 * 5, 0], [0, 0, 0]);
        setTimeout(() => {
          setAnimated(false);
        }, 530);
      },
      [selectedIndex],
    );

    useFrame((state) => {
      if (animated) {
        // roate the cube in every angle with a quaternion
        const amnt = Math.sin(state.clock.getElapsedTime()) * 5;
        api.rotation.set(0, amnt, 0);
      }
    });

    const { viewport, set } = useThree();

    // ========================================================================== //
    //     Cube physics properties
    // ========================================================================== //
    const scale = Number(viewport.width / viewport.height / ratio + 0.7);

    // tier: number;
    // type: TierType;
    // isMobile?: boolean;
    // fps?: number;
    // gpu?: string;
    // device?: string;
    const cubeRef = createRef({});
    const { tier } = useDetectGPU();

    // prettier-ignore bounding box is the scale times 2.01
    const [ref, api] = useBox(() => ({
      mass: 10,
      args: [scale * 2.01, scale * 2.01, scale * 2.01],
      position: [position / (viewport.width / 2), 15, 0], // onCollide: (e) => console.log("hit")
    }));

    const [hovered, setHovered] = useState(false);
    React.useEffect(() => {
      // console.log(scale);
      cubeRef.current = ref;
    }, [ref, hovered]);

    // zoom camera to this model
    const zoomCamera = React.useCallback((to) => {}, []);

    const ping = useMemo(() => new Audio(pingSound), []);

    // prettier-ignore
    const onClick = useCallback((e) => {
      e.stopPropagation();

      if (selectedIndex === position) {
        ping.play();
        animateCube(true);

        triggerPageChange({ background: color, transform: 'skew(10deg)', left: '-115vw' });
        setColor({ x: color, y: 1.0 });
        changePage({
          selectedIndex: -1,
          position: new Vector3(ref.current.position.x, ref.current.position.y, ref.current.position.z),
          pageLink: '/',
        });
        // navigate('/', { replace: true });
      } else {
        ping.play();
        setColor({ x: color, y: 0 });
        animateCube(true);

        triggerPageChange({ background: color, transform: 'skew(-10deg)', left: '115vw' });
        changePage({
          selectedIndex: position,
          position: new Vector3(ref.current.position.x, ref.current.position.y, ref.current.position.z),
          pageLink: link,
          // PAGE CHANGE DATA
        });
        // navigate(link, { replace: true });
      }
    }, [selectedIndex]);

    // prettier-ignore
    const onPointerOver = useCallback((e) => {
    // when hovering over a cube in react three fiber ensure it only hovers the first raycast hit
      e.stopPropagation();
      // get this cubes position relative to usecannon
      // valtioState.threejsContext.color = x;
      // triggerPageChange({ background: color, transform: "skew(10deg)", left: '200vw' });
      setHovered(true);
      setColor({ x: color });
      animateCube(false);
      set({ moveCameraTo: new Vector3(ref.current.position.x, ref.current.position.y, ref.current.position.z) });
      set({ moveCamera: true });

      // if (isSelectedProject()) { triggerPageChange({ background: color, transform: "skew(10deg)", left: '-90vw' }); } else { triggerPageChange({ background: color, transform: "skew(10deg)", left: '90vw' }); }
    }, [hovered]);

    // prettier-ignore
    const onPointerOut = useCallback(() => {
      setHovered(false);/* set({ x: "#FFFFFF" });* */
      set({ moveCamera: false });

      // if (isSelectedProject()) { triggerPageChange({ background: color, transform: "skew(10deg)", left: '-115vw' }); } else { triggerPageChange({ background: color, transform: "skew(10deg)", left: '115vw' }); }
    }, [hovered]);

    const determineMaterialFactor = useMemo(() => (hovered ? 0.9 : 0.6), [
      hovered,
    ]);
    const determineClearcoat = useMemo(() => (hovered ? 0.7 : 0.6), [hovered]);
    const determineColor = useMemo(() => (hovered ? '#F0F3FC' : x), [hovered]);
    const checkTier = useCallback(
      (returnValue) => (tier !== 1 ? returnValue : false),
      [],
    );

    const normalMap = useMemo(() => {
      // convert texture to a normal map
      const normalMap = texture.clone();
      normalMap.wrapS = THREE.RepeatWrapping;
      normalMap.wrapT = THREE.RepeatWrapping;
      normalMap.repeat.set(1, 1);
      normalMap.anisotropy = 16;
      normalMap.encoding = THREE.sRGBEncoding;
      normalMap.blending = THREE.NormalBlending;
      return normalMap;
    }, [texture]);
    return (
      // make a.mesh an instanced mesh
      <>
        {/* (selectedIndex === -1 || selectedIndex === position) && ( */}
        {
          <a.mesh
            scale={mobile ? [0.5, 0.5, 0.5] : [scale, scale, scale]}
            onPointerOver={onPointerOver}
            onPointerOut={onPointerOut}
            geometry={model.geometry}
            // raycast={instancedMeshBounds} somehow fix's raycasting, not sure how its working without yet
            dispose={null} // dont dispose objects once spawned for performance
            onClick={onClick}
            position={position + viewport.height}
            receiveShadow
            castShadow
            ref={ref}
          >
            {/* repalce with animatedMaterial(drei) where the props are the props from this material in a js object */}

            {/*
          // ========================================================================== //
          //       Cube material
          // ========================================================================== //
       */}
            <a.meshPhysicalMaterial
              map={texture}
              map-flipY={false}
              map-wrapS={THREE.RepeatWrapping}
              map-wrapT={THREE.RepeatWrapping}
              map-repeat={[1, 1]}
              map-offset={[0.01, 0.01]} // no gaps between textures, scale the image inwards just slightly
              map-anisotropy={tier == 1 ? 3 : 10}
              // flatShading
              toneMapped
              transparent
              opacity={(isSelectedProject() && 1) || animatedOpacity}
              // visible={selectedIndex === -1 || selectedIndex === position}// disable ghost cubes
              attach="material"
              receiveShadow
              castShadow
              color={determineColor}
              roughness={0.5}
              // alphaMap={checkTier(texture)}
              // aoMap={checkTier(texture)}
              roughnessMap={texture} // sexy
              // lightMap={checkTier(texture)}// sexy
              // clearcoat={determineClearcoat}
              // envMap={[texture, texture, texture]}
              // opacity={0.7}
              envMapIntensity={0.6}
              // dispose={null}
              normalMap={normalMap}
              normalMap-repeat={[35, 35]}
              normalScale={[0.15, 0.15]}
            />
          </a.mesh>
        }
        {/* ) */}
      </>
    );
  },
);

// ========================================================================== //
// Backdrop scene
// ========================================================================== //
export const Scene = ({
  children, set, x, mobile,
}) => {};

// ========================================================================== //
// Camera
// ========================================================================== //
export const cameraCoords = [0, 6, -4.5];

const X_SPACING = 2;
const Y_SPACING = -1;
export const getPositionExternalGrid = (index, columnWidth = 3) => {
  const x = (index % columnWidth) * X_SPACING;
  const y = Math.floor(index / columnWidth) * Y_SPACING;
  return [x, y, 0];
};

export const Camera = React.memo(
  () => {
    const { viewport } = useThree();

    const radius = Math.min(viewport.width, viewport.height) / 2;
    const center = new Vector2(viewport.width / 2, viewport.height / 2);
    const defaultCamera = {
      x: 0,
      y: 0,
    };

    const moveRelativeToMouse = (px, py, state, zoom) => {
      const upwards = 2;
      const offsetUp = 3;

      const mouse = new Vector2(px + upwards, py + upwards);
      const center = new Vector2(viewport.width / 2, viewport.height / 2);
      const angle = Math.atan2(mouse.y - center.y, mouse.x - center.x);
      const x = -(Math.cos(angle) * radius);
      const y = -(Math.sin(angle) * radius - offsetUp);
      const z = zoom;
      const vec = new Vector3(x, y, z);

      state.camera.position.lerp(vec, 0.075);
      state.camera.lookAt(0, 0, 0);
      state.camera.updateProjectionMatrix();
    };
    const mouseMultiplier = 20;
    return useFrame((state) => {
      // move camera to selected cube
      if (state.zoomCamera) {
        // offset mouse coordinites by moveCameraTo coordinites to get relative mouse position
        const px = state.moveCameraTo.x - state.mouse.x / 2;
        const py = state.moveCameraTo.y - state.mouse.y / 2;

        moveRelativeToMouse(px, py, state, 6.6);

        return;
      }
      if (state.moveCamera) {
        // offset mouse coordinites by moveCameraTo coordinites to get relative mouse position
        const px = state.moveCameraTo.x - state.mouse.x;
        const py = state.moveCameraTo.y - state.mouse.y;

        moveRelativeToMouse(px, py, state, 6.6);
        //  moveRelativeToCube(state.moveCameraTo.x,state.moveCameraTo.y,state)
        return; // skip mouse move logic
      }
      // rotate camera in a sphere around origin 0,0,1 based on mouse position
      if (state.mouse.x !== 0 && state.mouse.y !== 0 && state.camera) {
        const px = defaultCamera.x - state.mouse.x * mouseMultiplier;
        const py = defaultCamera.y - state.mouse.y * mouseMultiplier;
        moveRelativeToMouse(px, py, state, 7);
      }
    });
  },
  (pre, post) =>
    // pre.mouse.x !== post.mouse.x ||
    // pre.mouse.y !== post.mouse.y ||
    pre.selectedIndex !== post.selectedIndex
    || pre.moveCameraTo !== post.moveCameraTo,
);

// ========================================================================== //
// Brand ring
// ========================================================================== //
useGLTF.preload(ring_import);

export const BrandRing = ({ x, rotation }) => {
  const ref = useRef();
  const { viewport } = useThree();
  const scale = clamp((viewport.width / 7) * 2.55, 2, 2.55);

  const {
    nodes: { Cylinder },
  } = useGLTF(ring_import);
  const texture = (brandImage && useLoader(THREE.TextureLoader, brandImage))
    || new THREE.Texture();

  const degsPerSecond = 0.25;
  useFrame((state) => {
    // move camera to selected cube
    ref.current.rotateY(degToRad(degsPerSecond));
    // ref.current.rotateZ(degToRad(degsPerSecond));
    // ref.current.rotateX(degToRad(degsPerSecond));
  });
  const vertexShader = `
uniform vec3 viewVector;
uniform float c;
uniform float p;
varying float intensity;
void main() 
{
    vec3 vNormal = normalize( normalMatrix * normal );
	vec3 vNormel = normalize( normalMatrix * viewVector );
	intensity = pow( c - dot(vNormal, vNormel), p );
	
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`;

  const fragmentShader = `
uniform vec3 glowColor;
varying float intensity;
void main() 
{
	vec3 glow = glowColor * intensity;
    gl_FragColor = vec4( glow, 1.0 );
}
  `;
  const createEmissiveMap = React.useCallback((x) => {
    const shader = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        c: { type: 'f', value: 1 },
        p: { type: 'f', value: 1 },
        glowColor: { type: 'c', value: new THREE.Color(x) },
      },
    });
  });

  return (
    <>
      <a.mesh
        receiveShadow
        ref={ref}
        rotation={rotation || [degToRad(90), 0, 0]}
        // scale={[scale, scale, scale]}
        scale={[3, 3, 3]}
        castShadow
        position={[0, 0, 0]}
        geometry={Cylinder.geometry}
        dispose={null} // dont dispose objects once spawned for performance
        // attach="geometry"
      >
        {/* glass like material */}
        <a.meshPhysicalMaterial
          attach="material"
          // transparent
          // opacity={0.3}
          flatShading={false}
          // clearcoat
          // wireframe
          emissive={x}
          emissiveIntensity={4}
          emissiveMap={createEmissiveMap(x)}
          roughness={0.5}
          // clearcoatRoughness={0.25}
          reflectivity={0.5}
          color={x}
          side={THREE.DoubleSide}
          // depthTest={false}
          // depthWrite={false}
          //   map={texture}
          //   map-flipY
          //   map-wrapS={THREE.WrapAroundEnding}
          //   map-wrapT={THREE.WrapAroundEnding}
          //   map-repeat={[5, 5]}
          // map-offset={[0.01, 0.01]} // no gaps between textures, scale the image inwards just slightly
          //   map-anisotropy={10}
        />
      </a.mesh>
    </>
  );
};

// ========================================================================== //
// Orb
// ========================================================================== //

// create transparent orb in react three fiber
export const Orb = ({ x }) => {
  const ref = useRef();
  const { viewport } = useThree();
  const scale = clamp((viewport.width / 7) * 2.55, 2, 2.55);
  return (
    <a.mesh
      receiveShadow
      ref={ref}
      scale={[scale, scale, scale]}
      position={[0, 0, 0]}
    >
      <sphereBufferGeometry
        attach="geometry"
        // args={[1, 1,1]}
        args={[1, 32, 32]}
        rotation={[0, 0, 0]}
        position={[0, 0, 0]}
        onPointerOver={() => {}}
        onPointerOut={() => {}}
        onClick={() => {}}
        dispose={null}
      />
      {/* glass like material */}

      <a.meshPhysicalMaterial
        attach="material"
        color={x}
        // transparent={.3}
        // opacity={0.3}
        // transparent
        // flatShading={false}
        clearcoat
        // roughness={0.5}
        // clearcoatRoughness={0.25}
        // reflectivity={0.5}
        depthTest={false}
        depthWrite={false}
        opacity={0.6}
        // alphaTest={0.5}
        // clearcoatMap
        // clearcoatNormalMap
        // clearcoatNormalScale={[1, 1]}
        // clearcoatNormalMap-flipY={false}
        // clearcoatNormalMap-wrapS={THREE.RepeatWrapping}
        // clearcoatNormalMap-wrapT={THREE.RepeatWrapping}
        // clearcoatNormalMap-repeat={[1, 1]}
        // clearcoatNormalMap-offset={[0.01, 0.01]}
        // clearcoatNormalMap-anisotropy={3}
      />
    </a.mesh>
  );
};

function Effects() {
  const ref = useRef();
  useFrame((state) => {
    // Disable SSAO on regress
    // ref.current.blendMode.setBlendFunction(state.performance.current < 1 ? BlendFunction.SKIP : BlendFunction.MULTIPLY);
  }, []);
  return (
    <EffectComposer multisampling={8}>
      {/* <SSAO ref={ref} intensity={15} radius={10} luminanceInfluence={0} bias={0.035} /> */}
      {/* <Bloom kernelSize={KernelSize.LARGE} luminanceThreshold={0.55} luminanceSmoothing={0.2} /> */}
    </EffectComposer>
  );
}

function Cloud({
  size = 2,
  opacity = 0.3,
  speed = 0.4,
  spread = 2,
  length = 1.5,
  segments = 10,
  dir = 1,
  position = [0, 0, 0],
  ...props
}) {
  const texture = (cloudImg && useLoader(THREE.TextureLoader, cloudImg))
    || new THREE.Texture();
  const group = useRef();
  // const texture = useTexture('/cloud.png');
  const clouds = useMemo(
    () => [...new Array(segments)].map((_, index) => ({
      x: spread / 2 - Math.random() * spread,
      y: spread / 2 - Math.random() * spread,
      scale:
          0.4
          + Math.sin(((index + 1) / segments) * Math.PI)
            * ((0.2 + Math.random()) * 10)
            * size,
      density: Math.max(0.2, Math.random()),
      rotation: Math.max(0.002, 0.005 * Math.random()) * speed,
    })),
    [spread, segments, speed, size],
  );
  useFrame((state) => group.current?.children.forEach((cloud, index) => {
    cloud.rotation.z += clouds[index].rotation * dir;
    cloud.scale.setScalar(
      clouds[index].scale
          + (((1 + Math.sin(state.clock.getElapsedTime() / 10)) / 2) * index) / 10,
    );
  }));
  return (
    <group {...props}>
      <group
        position={[position[0], position[1], (segments / 2) * length]}
        ref={group}
      >
        {clouds.map(({
          x, y, scale, density,
        }, index) => (
          <Billboard
            key={index}
            scale={[scale, scale, scale]}
            position={[x, y, -index * length]}
            lockZ
          >
            <meshStandardMaterial
              map={texture}
              transparent
              alphaTest={-1}
              opacity={(scale / 6) * density * opacity}
              depthTest={false}
            />
          </Billboard>
        ))}
      </group>
    </group>
  );
}

function Clouds() {
  return (
    <Cloud
      segments={2}
      size={1.2}
      rotation={[0, Math.PI / 2, 0]}
      position={[0, 0, -10]}
      scale={[1, 1, 1]}
    />
  );
}

// ========================================================================== //
// Canvas
// ========================================================================== //
// the canvas and scene graph are here or derive from it
export default React.memo(
  ({
    x, setColor, theme, id, themeTools, setTheme,
  }) => {
    // softShadows({
    //   frustum: 3.75,
    //   size: 0.005,
    //   near: 9.5,
    //   samples: 17,
    //   rings: 11 // Rings (default: 11) must be a int
    // });

    const {
      fps, gpu, isMobile, tier,
    } = useDetectGPU();
    const { propsUsing } = useStore((state) => state.threejsContext.context.hand);

    const physicsProps = {
      gravity: [0, -20, 0],
      size: 20,
      allowSleep: true,
      step: 1 / 60,
      shouldInvalidate: true,
      tolerance: 0.001,
    };

    const determineScene = useCallback(() => (
      <>
        {(propsUsing.length > 0)
          || (
          <>
            <Borders opacity={1} />
            <Models set={setColor} x={x} mobile={false} />
            <Orb x={x} />
          </>
          )}
      </>
    ),
    [propsUsing]);

    return (
      <Canvas
        colorManagement
        resize={{ polyfill: ResizeObserver }} // dont update canvas on user scroll
        concurrent
        shadowMap
        shadows
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        // raycaster={{ computeOffsets: ({ clientX, clientY }) => ({ offsetX: clientX, offsetY: clientY }) }}>
        // onCreated={(state) => state.events.connect(overlay.current)}
        // sRGB
        // orthographic
        id={id}
        pixelRatio={typeof window !== 'undefined' && window.devicePixelRatioo}
        gl={{
          alpha: true,
          powerPreference: tier !== 1 ? 'high-performance' : 'default',
          stencil: false,
          depth: tier !== 1,
          antialias: tier !== 1,
        }}
        camera={{
          position: cameraCoords,
          fov: 50,
          near: 1,
          far: 50,
          rotation: [Math.PI * 0.25, 0, 0],
        }}
      >
        <ambientLight color={x} intensity={0.6} />
        {/* <directionalLight
        castShadow
        position={[3.5, 5, -10]}
        intensity={1.5}
        color={x}
        // enabling shadows
        // // 2k texture
        // shadow-mapSize-width={2048}
        // shadow-mapSize-height={2048}
        // // 1k texture
        // // shadow-mapSize-width={1024}
        // // shadow-mapSize-height={1024}
        // shadow-camera-far={50}
        // shadow-camera-left={-10}
        // shadow-camera-right={10}
        // shadow-camera-top={10}
        // shadow-camera-bottom={-10}
        /> */}
        <Camera />
        {/* <Mouse /> */}
        <Suspense fallback={null}>
          {/* not dependant on physics */}
          {/* <SkyScene3> */}
          {/* <Clouds /> */}

          <Environment preset="studio" scene={undefined} />
          <HandModel />

          <group dispose={null} scale={[0.75, 0.75, 0.75]} position={[0, 0.7, 0]}>
            {/* <BrandRing x={x} /> */}
            {/* all dependendant on physics */}
            <Physics {...physicsProps}>
              {determineScene()}

              {/* <axesHelper args={[1, 1, 1]} position={[0,0,0]} /> */}
              {/* <PreviewPlane /> */}
              {/* <Scene set={set} x={x} mobile={false}/> */}
            </Physics>
          </group>

          {/* </SkyScene3> */}
        </Suspense>

        {/* <Post theme={theme} /> */}
        <Effects />
        <AdaptiveDpr />
      </Canvas>
    );
  },
  (pre, post) => pre?.x !== post?.x,
);

// {
//   /* <ContactShadows
//           rotation={[Math.PI/2, 0, 0]}
//           ref={shadowRef}
//           position={[0, -1.6, 0]}
//           attach="material"
//           opacity={0.6}
//           resolution={2480}
//           width={15}
//           // dispose={()=>dispose}
//           // dispose={(e)=>planeRef.current.texture.dispose()}
//           height={15}
//           blur={2.5}
//           far={1.6}
//         /> */
// }
// // ========================================================================== //
// // orbit controls
// // ========================================================================== //
// extend({ OrbitControls });
// export const deg2rad = (deg) => deg * (Math.PI / 180);
// const CameraControls = () => {
//   const {
//     camera,
//     gl: { domElement },
//     viewport,
//   } = useThree();

//   const curveRef = useRef();
//   const [handlePos, setHandlePos] = React.useState([0, 0, 0]);

//   const curve = React.useMemo(
//     () => new THREE.CatmullRomCurve3([...handlePos], true, 'centripetal'),
//     [handlePos],
//   );

//   const controls = useRef();

//   useEffect(() => {
//     const orbitControls = controls.current;
//     orbitControls.target = new Vector3(
//       // cameraCoords[0],
//       // cameraCoords[1] + -0.2,
//       // cameraCoords[0],
//       0,.5,1
//     ); // set to center of shifting column construct
//     // isMobile && orbitControls.dispose();
//     orbitControls.autoRotate = true;
//     orbitControls.autoRotateSpeed = .5;
//     orbitControls.maxDistance = 15;

//     orbitControls.maxZoom = 9;
//     // orbitControls.minZoom = 0;
//     // orbitControls.enableZoom = false;
//     // orbitControls.enabled = true;
//     // orbitControls.maxPolarAngle = 1.25;
//     // orbitControls.maxAzimuthAngle = -0.5;

//     orbitControls.enablePan = true;
//     orbitControls.touches = THREE.TOUCH.TWO;
//   }, []);

//   //move camera in a circle always looking at 0,0,0
//   useFrame((state) => {
//     const orbitControls = controls.current;
//     orbitControls.update();
//     // orbitControls.target = new Vector3(0, 0 + 0.6, 0);

//     // state.camera.position.lerp(vec, 0.075);
//     // state.camera.lookAt(0, 0, 0);
//     // state.camera.updateProjectionMatrix();
//     //rotate camera opposite and relative to mouse
//     // const mouse = new Vector2(mouseX, mouseY);
//     // const center = new Vector2(viewport.width / 2, viewport.height / 2);
//     // (state.mouse.x * viewport.width) / 2,
//     // (state.mouse.x * viewport.width) / 2,
//     //       (state.mouse.y * viewport.height) / 2,
//     //       8,

//     // if (state.mouse.x !== 0 && state.mouse.y !== 0) {
//     //   const mouse = state.mouse
//     //   const { x, y } = mouse;
//     //   const center = new Vector2((x*viewport.width)/2, (y*viewport.height)/2);
//     //   const delta = mouse.clone().sub(center);
//     //   const angle = delta.angle();
//     //   const axis = new Vector3(0, 1, 0);
//     //   const quaternion = new Quaternion().setFromAxisAngle(axis, angle);
//     //   camera.quaternion.multiply(quaternion);
//     // };
//   });

//   return <orbitControls ref={controls} args={[camera, domElement]} />;
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

// interact with the scene via collisions if desired
// export const Mouse = () => {
//   const viewportOffset = 2;
//   const mouseRef = useRef();
//   const { viewport } = useThree();
//   const position = [0, 0, 0];
//   const dimensions = [1, 1, 1, 1];
//   const [_, api] = useSphere((index) => ({
//     type: 'Kinematic',
//     args: dimensions,
//     position,
//   }));
//   useFrame((state) => {
//     if (!mouseRef.current || state.mouse.x === 0) return;
//     api.position.set(
//       (state.mouse.x * viewport.width) / 2,
//       (state.mouse.y * viewport.height) / 2,
//       8,
//     );
//   });
//   return (
//     <instancedMesh ref={mouseRef}>
//       <sphereBufferGeometry
//         attatch="geometry"
//         args={dimensions}
//         position={position}
//       />
//       <meshStandardMaterial flatShading attatch="material" color="black" />
//     </instancedMesh>
//   );
// };

// //* *requires a texture path prop passed in as url** */
// export const PreviewPlane = ({
//   x,
//   shadows = false,
//   visible = false,
//   density = 1,
//   url,
//   ...props
// }) => {
//   const { viewport, gl } = useThree()
//   // const texture = useLoader(THREE.TextureLoader, url);
//   const {
//     nodes: { Plane },
//   } = useLoader(GLTFLoader, previewPlane_import)
//   // const [ref, api] = usePlane(() => ({ args: [density, density], ...props }));

//   const determineMaterialFactor = useMemo(() => 0.3, [])
//   // prettier-ignore
//   const determineColor = useMemo(() => ('darkgrey'), []);

//   return (
//     <mesh
//       {...props}
//       geometry={Plane.geometry}
//       raycast={meshBounds}
//       receiveShadow
//       castShadow
//       // dispose={null}
//       // ref={ref}
//     >
//       <planeBufferGeometry
//         attatch="geometry"
//         scale={props.scale ? props.scale : 1}
//         args={[viewport.width, viewport.width, viewport.height]}
//       />
//       <a.meshPhysicalMaterial
//         //  map={texture}
//         // map-flipY
//         side={THREE.DoubleSide}
//         // map-wrapS={THREE.RepeatWrapping}
//         // map-wrapT={THREE.RepeatWrapping}
//         map-repeat={[1, 1]}
//         map-offset={[0.001, 0.001]} // no gaps between textures, scale the image inwards just slightly
//         map-anisotropy={10}
//         transparent={false}
//         flatShading={false}
//         toneMapped={false}
//         attach="material"
//         receiveShadow
//         castShadow
//         color={determineColor}
//         opacity={0}
//         roughness={determineMaterialFactor}
//         clearcoat={determineMaterialFactor}
//       />
//     </mesh>
//   )
// }
