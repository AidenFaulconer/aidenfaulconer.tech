import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import {
  Canvas, useFrame, useThree, useLoader,
} from '@react-three/fiber';

function Smoke({
  amount = 3, speed = 0.2, color = 0xffffff, offsetPos = [4, 4, 6], ...props
}) {
  const smokeTexture = useLoader(THREE.TextureLoader, 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png');
  const smokeGeo = new THREE.PlaneGeometry(300, 300);
  const smokeMaterial = new THREE.MeshLambertMaterial({
    color,
    map: smokeTexture,
    transparent: true,
  });
  const smokeParticles = Array.from({ length: amount }, () => {
    const particle = new THREE.Mesh(smokeGeo, smokeMaterial);
    particle.position.set(
      Math.random() * 2 - offsetPos[0],
      Math.random() * 2 - offsetPos[1],
      Math.random() * 2 - offsetPos[2],
    );
    // particle.rotation.z = Math.random() * 360;
    return particle;
  });

  useFrame((state, delta) => {
    smokeParticles.forEach((particle) => {
      particle.lookAt(state.camera.position); // This line adds the facing towards camera behavior
      particle.rotation.x += delta * speed;
    });
  });

  return (
    <>
      {smokeParticles.map((particle, i) => (
        <primitive object={particle} key={i} scale={[0.05, 0.05, 0.05]} />
      ))}
    </>
  );
}

export default Smoke;
