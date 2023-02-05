import React, {
  useCallback, useState, useEffect, createRef, useMemo,
} from 'react';
import { useDetectGPU, useGLTF } from '@react-three/drei';
import { useLoader, useThree } from '@react-three/fiber';
import { useSpring, config } from '@react-spring/web';
import { a } from '@react-spring/three';
import * as THREE from 'three';
import {
  Vector3,
} from 'three';
import { useStore } from '../../store/store';
import cubeImport from '../../../static/assets/gameModels/cube.glb';
import pingSound from '../../../static/assets/portfolio/transition.mp3';

// Preload cube **convert gltf to glb**
useGLTF.preload(cubeImport);

/**
 * The Models function renders a group of objects.
 *
 * @param {children Pass in the children of the parent component
 * @param set Set the color of the model
 * @param x Offset the position of the models in a way that makes them appear to be spinning
 * @param mobile Determine if the model is rendered on a mobile device
 * @param } Pass the state to the function
 *
 * @return A group of cubes
 */
export default function Cubes({
  children, set, x, mobile,
}) {
  // tier: number;
  // type: TierType;
  // isMobile?: boolean;
  // fps?: number;
  // gpu?: string;
  // device?: string;
  const { tier } = useDetectGPU();
  // const postData = useStore((state) => state.threejsContext.context.postData);
  const {
    nodes: { Cube },
  } = useGLTF(cubeImport);

  const {
    selectedIndex, color, position, pageLink, postData,
  } = useStore(
    (state) => state.threejsContext.context,
  );

  //  Handle selection state
  const colors = ['#000064', '#21bcfe', '#28bd7f', '#21bcfe'];

  const calculatePosition = useCallback((i) => {
    const angleSliceSize = (Math.PI * 2) / postData.length;
    const origin = [0, 0, 0];
    const radius = 3.5;
    // return position;

    // return a position from the origin moving in i angleSliceSizes across the x plane
    return [
      origin[0] + radius * Math.cos(angleSliceSize * i),
      origin[1],
      origin[2] + radius * Math.sin(angleSliceSize * i),
    ];
  }, []);

  const [{ y }, spinRoulette] = useSpring(() => ({
    config: {
      ...config.gentle,
      duration: 230,
    },
    to: { y: 0 },
  }));

  const NUM = 3;
  const getPositions = (amount) => new Array(amount).fill().map((_, index) => [
    0,
    -2 * Math.sin((2 * Math.PI * index) / NUM),
    -2 * Math.cos((2 * Math.PI * index) / NUM),
  ]);
  // angle: Math.PI * index / itemsLength
  // cosnt { rotY } = useSpring({
  //   ref: springRotY,
  //   rotY: wheelOpen ? Math.PI / 4 : Math.PI / 2
  // })
  // const { posX, posZ } = useSpring({
  //   ref: springPosX,
  //   posX: wheelOpen ? 2 : -3,
  //   posZ: wheelOpen ? -4 : -1.9,
  // })
  // useChain(!wheelOpen?[springRotY, springPosX]:[springPosX, springRotY], [0, 0.2])

  const calculateAngle = (i) => {
    console.log(`angle: ${2 * Math.PI * i / postData.length} index ${i}`);
    return (2 * Math.PI * i) / postData.length;
  };

  const mapObjects = useCallback(() => {
    const data = tier === 1 ? postData.slice(0, 4) : postData;
    return data.map(({
      node: {
        frontmatter: {
          thumbnail, path, title, metaDescription,
        },
      },
    }, i) => {
      // slice textureData length to three if tier is 1
      const texture = (thumbnail ? useLoader(THREE.TextureLoader, thumbnail) : new THREE.Texture());
      // debugger;
      return texture && (
        <Model
        // spinRoulette={(i) => setTimeout(() => {
        //   // spinRoulette({ y: calculateAngle(i) });
        // }, 230)}
          color={colors[i]}
          model={Cube}
          mobile={mobile}
          link={path}
          texture={texture}
          key={i}
          position={calculatePosition(i)}
          index={i}
          setColor={set}
          x={x}
          itemsLength={postData.length}
        />
      );
    });
  }, [tier]);

  // const handleState = () => {
  //   console.log(selectedIndex);
  //   if (selectedIndex === -1) return mapObjects(true);
  //   return mapObjects(selectedIndex);
  //   // inspectObject(selectedIndex);
  // };

  // receiveShadow
  // castShadow
  // rotation-y={180}
  return (
    <a.group
      rotation-y={y}
      scale={[0.5, 0.5, 0.5]}
    >
      {mapObjects()}
    </a.group>
  );
}

// cube model
export const Model = React.memo(
  ({
    angle,
    spinRoulette,
    children,
    color,
    x,
    model,
    mobile = false,
    texture,
    link,
    rotation,
    position,
    index,
    setCurrent,
    itemsLength,
  }) => {
    const triggerPageChange = useStore((state) => state.threejsContext.methods.triggerPageChange);
    const setColor = useStore((state) => state.threejsContext.methods.setColor);
    const changePage = useStore((state) => state.threejsContext.methods.changePage);
    const { selectedIndex, animatedColor, animatedOpacity } = useStore((state) => state.threejsContext.context);
    const { viewport, set, clock } = useThree();
    const scale = Number(viewport.width / viewport.height / itemsLength + 0.7);
    const cubeRef = createRef(new THREE.Mesh());
    const { tier } = useDetectGPU();
    const [hovered, setHovered] = useState(false);

    //     Cube animation
    const clamp = (value) => Math.max(0, Math.min(1, value));
    const [animated, setAnimated] = useState(false);
    const animDurMs = 530;// in miliseconds

    const [{ py, s }, hoverAnimate] = useSpring(() => ({
      config: { ...config.wobbly, duration: 130 },
      // spring: animated,
      reset: animated,
      to: { py: 0, s: 1 },
    }));
    // const jumpSpringAnim = spring.to([0, 0.25], [0.15, 0.25]);
    // const scaleSpringAnim = spring.to([0, 1], [1, 1.25]);

    // handle hover state
    useEffect(() => {
      if (hovered) {
        hoverAnimate({
          py: 0.9,
          s: 1.1,
        });
        // scaleSpringAnim.
      } else {
        hoverAnimate({
          py: 0,
          s: 1,
        });
      }
    }, [hovered]);

    // const animateCube = useCallback(
    //   () => {
    //     setAnimated(true);
    //     // if (useForce) api.applyImpulse([0, 30 * 5, 0], [0, 0, 0]);
    //     setTimeout(() => {
    //       setAnimated(false);
    //     }, animDurMs);
    //   },
    //   [selectedIndex],
    // );

    //     Cube methods and properties
    const ping = useMemo(() => new Audio(pingSound), []);
    const isSelectedProject = React.useCallback(() => selectedIndex === index, [selectedIndex, position]);
    const onClick = useCallback((e) => {
      const { x, y, z } = cubeRef.current.position;
      e.stopPropagation();
      if (selectedIndex === index) {
        // set({ moveCamera: true, moveCameraTo: new Vector3(x, y, z) });
        ping.play();
        // animateCube(true);
        setColor({ x: color, y: 1.0 });
        triggerPageChange({ background: color, transform: 'skew(10deg)', left: '-215vw' });
        changePage({
          selectedIndex: -1, // no selected post, negative values represent a page, ie: -1 is the home page
          position: new Vector3(x, y, z),
          pageLink: '/',
        });
      } else {
        // set({ moveCamera: true, moveCameraTo: new Vector3(x, y, z) });
        // animateCube(true);
        setColor({ x: color, y: 0.3 });
        triggerPageChange({ background: color, transform: 'skew(-10deg)', left: '215vw' });
        changePage({
          selectedIndex: index, // select this post
          position: new Vector3(x, y, z),
          pageLink: link,
        });
      }
    }, [cubeRef, index]);

    const onPointerOver = useCallback((e) => {
      const { x, y, z } = cubeRef.current.position;
      e.stopPropagation(); // when hovering over a cube in react three fiber ensure it only hovers the first raycast hit
      setHovered(true);
      setColor({ x: color });
      setAnimated(true);
      set({ moveCamera: true, moveCameraTo: new Vector3(x, y, z) });
    }, [cubeRef, hovered]);

    const onPointerOut = useCallback(() => {
      setHovered(false);/* set({ x: "#FFFFFF" });* */
      set({ moveCamera: false });
    }, [cubeRef, hovered]);

    const determineMaterialFactor = useMemo(() => (hovered ? 0.9 : 0.6), [hovered]);
    const determineClearcoat = useMemo(() => (hovered ? 0.7 : 0.6), [hovered]);
    const checkTier = useCallback((returnValue) => (tier !== 1 ? returnValue : false), []);
    const determineColor = useMemo(() => (hovered ? '#F0F3FC' : x), [hovered]);

    // convert texture to a normal map
    const normalMap = useMemo(() => {
      const normalMap = texture.clone();
      normalMap.wrapS = THREE.RepeatWrapping;
      normalMap.wrapT = THREE.RepeatWrapping;
      normalMap.repeat.set(1, 1);
      normalMap.anisotropy = 16;
      normalMap.encoding = THREE.sRGBEncoding;
      normalMap.blending = THREE.NormalBlending;
      return normalMap;
    }, [texture]);
    const textureMemo = useMemo(() => texture || new THREE.Texture(), [texture]);

    return (
      <a.group position={position}>
        <a.mesh
          scale={isSelectedProject() ? [scale + 0.2, scale + 0.2, scale + 0.2] : [scale, scale, scale]}
          onPointerOver={onPointerOver}
          onPointerOut={onPointerOut}
          geometry={model.geometry}
          // raycast={instancedMeshBounds} somehow fix's raycasting, not sure how its working without yet
          dispose={null} // dont dispose objects once spawned for performance
          onClick={onClick}
          rotation-y={(2 * Math.PI * index) / itemsLength}
          scale-y={s}
          scale-x={s}
          scale-z={s}
          position-y={py}
          receiveShadow
          castShadow
          ref={cubeRef}
        >
          {/* repalce with animatedMaterial(drei) where the props are the props from this material in a js object */}
          <a.meshPhysicalMaterial
            map={textureMemo}
            dispose={null}
            map-flipY={false}
            map-wrapS={THREE.RepeatWrapping}
            map-wrapT={THREE.RepeatWrapping}
            map-repeat={[1, 1]}
            map-offset={[0.01, 0.01]} // no gaps between textures, scale the image inwards just slightly
            map-anisotropy={tier === 1 ? 3 : 10}
            toneMapped
            transparent
            opacity={(isSelectedProject() || hovered && 1) || animatedOpacity}
            attach="material"
            receiveShadow
            sheen={0.25}
            metalness={0}
            castShadow
            color={determineColor}
            roughness={1.25}
            roughnessMap={textureMemo}
            // alphaMap={checkTier(texture)}
            // aoMap={checkTier(texture)}
            // lightMap={checkTier(texture)}// sexy
            // clearcoat={determineClearcoat}
            // envMap={[texture, texture, texture]}
            // opacity={0.7}
            // dispose={null}
            envMapIntensity={0.025}
            normalMap={normalMap}
            normalMap-repeat={[35, 35]}
            normalScale={[0.15, 0.15]}
          />
        </a.mesh>
      </a.group>

    );
  },
  (pre, post) => pre.x !== post.x || pre.color !== post.color,
);
