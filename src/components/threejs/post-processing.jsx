// import React, {
//   Suspense, useMemo, useEffect, useContext,
// } from 'react';
// import { useLoader, useThree, useFrame } from 'react-three-fiber';
// import {
//   SMAAImageLoader,
//   BlendFunction,
//   EffectComposer,
//   EffectPass,
//   RenderPass,
//   DepthEffect,
//   SMAAEffect,
//   SSAOEffect,
//   NormalPass,
// } from 'postprocessing';

// function Post({ theme }) {
//   const {
//     gl, scene, camera, size,
//   } = useThree();
//   const smaa = useLoader(SMAAImageLoader);

//   const composer = useMemo(() => {
//     const composer = new EffectComposer(gl);
//     composer.addPass(new RenderPass(scene, camera));
//     const smaaEffect = new SMAAEffect(...smaa);
//     smaaEffect.colorEdgesMaterial.setEdgeDetectionThreshold(0.25);

//     const normalPass = new NormalPass(scene, camera);
//     const ssaoEffect = new SSAOEffect(camera, normalPass.renderTarget.texture, {
//       blendFunction: BlendFunction.MULTIPLY,
//       color: 'black',
//       samples: 55, // May get away with less samples
//       rings: 11, // Just make sure this isn't a multiple of samples
//       distanceThreshold: 1, // control how far from camera occulusion occurs
//       rangeFalloff: 0.15, // how far from the max threshold it takes for occulision to discontinue smoothly
//       luminanceInfluence: 0.25,
//       radius: 5, // Spread range
//       intensity: 25,
//       bias: 0.25,
//     }); // ambient occulusion

//     // SSAO is supposed to be a subtle effect!
//     // ssaoEffect.blendMode.opacity.value = 1.0 // Debug.

//     const effectPass = new EffectPass(
//       camera,
//       smaaEffect,
//       // ssaoEffect
//       // new DepthEffect(), // Check if depth looks ok.
//     );
//     effectPass.renderToScreen = true;
//     // normalPass.renderToScreen = true; // Check if normals look ok.
//     composer.addPass(normalPass);
//     composer.addPass(effectPass);
//     return composer;
//   }, []);

//   useEffect(() => void composer.setSize(size.width, size.height), [size]);
//   return useFrame((_, delta) => composer.render(delta), 1);
// }

// export default function Effect({ theme }) {
//   return (
//     <Suspense fallback={null}>
//       <Post theme={theme} />
//     </Suspense>
//   );
// }
