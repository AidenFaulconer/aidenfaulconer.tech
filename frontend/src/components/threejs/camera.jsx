import React, { useEffect, useMemo, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  Vector3, Vector2,
} from 'three';
import { useStore } from '../../store/store';

const Camera = React.memo(
  () => {
    const changeHandPosition = useStore((state) => state.threejsContext.methods.changeHandPosition);

    const { viewport, camera } = useThree();
    const zoomOffset = [0, 3, 2];// negative values zoom IN not OUT

    const radius = Math.min(viewport.width, viewport.height) / 2;
    const center = new Vector2(viewport.width / 2, viewport.height / 2);
    const defaultCamera = {
      x: 0,
      y: 0,
    };

    const moveRelativeToMouse = (px, py, state, zoom) => {
      const upwards = 1;
      const offsetUp = -2;

      const mouse = new Vector2(px + upwards, py + upwards);
      const center = new Vector2(viewport.width / 2, viewport.height / 2);
      const angle = Math.atan2(mouse.y - center.y, mouse.x - center.x);
      const x = -(Math.cos(angle) * radius) + zoomOffset[0];
      const y = -(Math.sin(angle) * radius - offsetUp) + zoomOffset[1];
      const z = zoom + zoomOffset[2];
      const vec = new Vector3(x, y, z);

      state.camera.position.lerp(vec, 0.075);
      state.camera.lookAt(0, 0, 0);
      state.camera.updateProjectionMatrix();
    };
    const mouseMultiplier = 20;

    useEffect(() => {
      moveRelativeToMouse(4, 3, { camera }, 4.6);
    }, []);

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
  (pre, post) => pre.selectedIndex !== post.selectedIndex
    || pre.moveCameraTo !== post.moveCameraTo,
  // pre.mouse.x !== post.mouse.x ||
  // pre.mouse.y !== post.mouse.y ||
);

export default Camera;
