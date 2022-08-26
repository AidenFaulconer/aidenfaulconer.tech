import React, { forwardRef, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AbberantRefraction } from '../util/customShaders';
// import lerp from 'lerp';

const Plane = forwardRef(({
  color = 'white', shift = 1, opacity = 1, args, map, ...props
}, ref) => {
//   const { viewportHeight, offsetFactor } = useBlock();
  const material = useRef();
  //   let last = state.top.current;
  useFrame(() => {
    // const { pages, top } = state;
    // material.current.scale = lerp(material.current.scale, offsetFactor - top.current / ((pages - 1) * viewportHeight), 0.1);
    // material.current.shift = lerp(material.current.shift, ((top.current - last) / shift) * 1.5, 0.1);
    // last = top.current;
  });
  return (
    <mesh ref={ref} {...props}>
      <planeBufferGeometry args={args} />
      <AbberantRefraction ref={material} color={color} map={map} transparent opacity={opacity} />
    </mesh>
  );
});
