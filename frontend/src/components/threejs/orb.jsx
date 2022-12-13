/* eslint-disable react/no-unknown-property */
// /* eslint-disable react/no-unknown-property */
import { useThree } from '@react-three/fiber';
import React, { useRef } from 'react';
import { clamp } from 'three/src/math/MathUtils';
import { a } from '@react-spring/three';

function Orb({ x }) {
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
      <sphereGeometry
        attach="geometry"
        // args={[1, 1,1]}
        args={[1, 32, 32]}
        rotation={[0, 0, 0]}
        position={[0, 0, 0]}
        onPointerOver={() => { }}
        onPointerOut={() => { }}
        onClick={() => { }}
        dispose={null}
      />
      {/* glass like material */}

      <a.meshPhysicalMaterial
        attach="material"
        color={x}
        // transparent
        // flatShading={false}
        clearcoat
        // roughness={0.5}
        // clearcoatRoughness={0.25}
        reflectivity={0.5}
        depthTest
        depthWrite={false}
        opacity={0.4}
      // side={THREE.BackSide}
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
}
export default Orb;
