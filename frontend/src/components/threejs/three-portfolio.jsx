/* eslint-disable react/no-unknown-property */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/no-unknown-property */
// eslint-disable-next-line import/no-unresolved
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable camelcase */
import React, {
  Suspense,
  useMemo,
  useState,
  useCallback,
  useRef,
  createRef,
  useEffect,
} from 'react';

// three.js in react
import { ResizeObserver } from '@juggle/resize-observer';
import * as VR from 'three/examples/jsm/webxr/VRButton';
import {
  Canvas,
  useFrame,
  useThree,
  useLoader,
  extend,
} from '@react-three/fiber';// or @react-three-fiber or react-three-fiber
import {
  Environment,
  useDetectGPU,
  useGLTF,
  AdaptiveDpr,
  // useAspect
  Billboard,
  Reflector,
  Html,
  Stage,
} from '@react-three/drei';

import { useInView } from 'react-intersection-observer';
import { useWindowSize } from 'react-use-breakpoints';
import { useStore } from '../../store/store';

// scene assets
import Camera from './camera';
import Cubes from './cubes';
import HandModel from './hand';
import Orb from './orb';
import Smoke from './smoke';

const DisableRender = () => useFrame(() => null, 1000);

// too large for bundle, re-use in some other project **also computationally expensive**
function Effects() {
  const ref = useRef();
  useFrame((state) => {
    // Disable SSAO on regress
    // ref.current.blendMode.setBlendFunction(state.performance.current < 1 ? BlendFunction.SKIP : BlendFunction.MULTIPLY);
  }, []);
  //   // <EffectComposer multisampling={8}>
  //     {/* <SSAO ref={ref} intensity={15} radius={10} luminanceInfluence={0} bias={0.035} /> */}
  //     {/* <Bloom kernelSize={KernelSize.LARGE} luminanceThreshold={0.55} luminanceSmoothing={0.2} /> */}
  // {/* </EffectComposer> */ }
  return (null);
}

export const PortfolioCanvas = React.memo(
  ({
    x, setColor, theme, id, setTheme,
  }) => {
    const { cameraCoords, scenePosition, hand: { handPosition, propsUsing, numHands } } = useStore((state) => state.threejsContext.context);
    const {
      fps, gpu, isMobile, tier, // tier goes up to 3
    } = useDetectGPU();
    const { ref, inView } = useInView();
    const { innerWidth } = useWindowSize();// detect resize
    const [windowScale, setWindowScale] = React.useState(1);
    useEffect(() => {
      const { clientWidth } = innerWidth;
      const res = innerWidth > 1250 ? 1 : innerWidth > 600 ? 0.95 : 0.65; // cap the width at 1250
      setWindowScale(res);
    }, [innerWidth, ref]);

    const physicsProps = {
      gravity: [0, -20, 0],
      size: 20,
      allowSleep: true,
      step: 1 / 60,
      shouldInvalidate: true,
      tolerance: 0.001,
    };

    const determineScene = useCallback(
      () => (
        <>
          {(propsUsing.length > 0)
          || (
            <>
              <Cubes set={setColor} x={x} mobile={false} />
              <Orb x={x} />
            </>
          )}
        </>
      ),
      [propsUsing],
    );
    const d2r = (degrees) => degrees * (Math.PI / 180);
    // if (process.env.NODE_ENV === 'development') console.log('threejs: time elapsed now ', performance.now());
    return (
      <Canvas
        ref={ref}
        // colorManagement
        resize={{ polyfill: ResizeObserver }} // dont update canvas on user scroll
        concurrent="true"
        // shadowMap
        shadows
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        // raycaster={{ computeOffsets: ({ clientX, clientY }) => ({ offsetX: clientX, offsetY: clientY }) }}>
        // onCreated={(state) => state.events.connect(overlay.current)}
        // sRGB
        // orthographic
        id={id}
        // vr
        // pixelRatio={typeof window !== 'undefined' && window.devicePixelRatio}
        // onCreated={({ gl }) => document.body.appendChild(VR.VRButton.createButton(gl))}
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
        {!inView && <DisableRender />}
        <group position={scenePosition} scale={windowScale}>

          <ambientLight color={x} intensity={0.4} />

          {tier === 4 && (
          <Environment preset="lobby" scene={undefined} />
          ) || (
          <directionalLight color={x} intensity={0.7} rotation={[d2r(10), d2r(45), 0]} position={[0, 5, 0]} />
          )}
          {/* TODO: dont use presets, they are requested over network and block resources, pass your own */}
          <Camera />
          <Suspense fallback={null}>
            {/* do not render hands if the device has a bad GPU */}
            <>
              {(numHands > 1 && tier !== 1) && (
                <>
                  {/* left */}
                  <HandModel
                    // theatreKey="handLeft"
                    scale={-1.65}
                    position={[-4, 1.75, 1.5]}
                    rotation={[d2r(-90), d2r(-190), d2r(-100)]}
                  />
                  {/* right hand */}
                  <HandModel
                    // theatreKey="handRight"
                    scale={1.65}
                    position={[4, 1.75, 1.5]}
                    rotation={[d2r(-270), d2r(-190), d2r(-100)]}
                  />
                </>
              ) || (
                <>
                  <HandModel
                    // theatreKey="handRight"
                    scale={1.65}
                    position={handPosition}
                    rotation={[0, d2r(-180), 0]}
                  />
                </>
              )}
            </>

            {/* <axesHelper args={[1, 1, 1]} scale={4} position={[0, 0, 0]} /> */}
            <group dispose={null} scale={[1.2, 1.2, 1.2]} position={[0, 2.5, 0]}>
              {/* all dependendant on physics */}
              {/* <Physics {...physicsProps}> */}
              {/* <Smoke /> */}
              {determineScene()}
              {/* <Scene set={set} x={x} mobile={false}/> */}
              {/* </Physics> */}
            </group>
            {/* <Effects /> */}
          </Suspense>
          <AdaptiveDpr pixelated />
        </group>
      </Canvas>
    );
  },
  (pre, post) => pre?.x !== post?.x,
);

// the canvas and scene graph are here or derive from it
export default function PortfolioScene(props) {
  return (
    <Suspense fallback={null}>
      <PortfolioCanvas {...props} />
    </Suspense>
  );
}

// consider adding controls next time
// import { useControl, Controls } from 'react-three-gui'

// consider react a11y for handling state and events in react three fiber with accessibility
// import { A11y, useA11y, A11yAnnouncer, useUserPreferences, A11ySection, A11yUserPreferencesContext } from "@react-three/a11y"
// const X_SPACING = 2;
// const Y_SPACING = -1;
// export const getPositionExternalGrid = (index, columnWidth = 3) => {
//   const x = (index % columnWidth) * X_SPACING;
//   const y = Math.floor(index / columnWidth) * Y_SPACING;
//   return [x, y, 0];
// };

/* Three point lighting setup */
/* <spotLight
          intensity={0.5}
          color="ffffff"
          name="TriLamp-Back"
          position={[-4.395, 5, 0.913]}
        />
        <spotLight
          intensity={0.25}
          color="ffffff"
          name="TriLamp-Fill"
          position={[4.487, 5, -0.136]}
        />
        <spotLight
          intensity={1.5}
          color="ffffff"
          name="TriLamp-Key"
          position={[1.589, 5, 4.198]}
        /> */
