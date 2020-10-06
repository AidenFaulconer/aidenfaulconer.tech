import React, { Suspense, useMemo, useEffect, useContext } from "react"
import { useLoader, useThree, useFrame } from "react-three-fiber"
import {
  SMAAImageLoader,
  BlendFunction,
  EffectComposer,
  EffectPass,
  RenderPass,
  DepthEffect,
  SMAAEffect,
  SSAOEffect,
  NormalPass,
} from "postprocessing"

import {GlobalStore} from "../../components/layout.js";

function Post({theme}) {
  const { gl, scene, camera, size } = useThree()
  const composer = useMemo(() => {
    const composer = new EffectComposer(gl)
    composer.addPass(new RenderPass(scene, camera))
    // const smaa = useLoader(SMAAImageLoader)
    // const smaaEffect = new SMAAEffect(...smaa)
    // smaaEffect.colorEdgesMaterial.setEdgeDetectionThreshold(0.1)

    const normalPass = new NormalPass(scene, camera)
    const ssaoEffect = new SSAOEffect(camera, normalPass.renderTarget.texture, {
      blendFunction: BlendFunction.MULTIPLY,
      color: theme.colors.textSecondary,
      samples: 30, // May get away with less samples
      rings: 4, // Just make sure this isn't a multiple of samples
      distanceThreshold: 0.4,
      distanceFalloff: 1,
      rangeThreshold: 1.5, // Controls sensitivity based on camera view distance **
      rangeFalloff: 0.1,
      luminanceInfluence: 0.05,
      radius: 1, // Spread range
      intensity: 25,
      bias: 0.5,
    })//ambient occulusion

    // SSAO is supposed to be a subtle effect!
    ssaoEffect.blendMode.opacity.value = 1.0 // Debug.

    const effectPass = new EffectPass(
      camera,
      // smaaEffect,
      ssaoEffect,
      //new DepthEffect(), // Check if depth looks ok.
    )
    effectPass.renderToScreen = true
    //normalPass.renderToScreen = true // Check if normals look ok.
    composer.addPass(normalPass)
    composer.addPass(effectPass)
    return composer
  }, [])

  useEffect(() => void composer.setSize(size.width, size.height), [size])
  return useFrame((_, delta) => composer.render(delta), 1)
}

export default function Effect({theme}) {
  return (
  <Suspense fallback={null}>
      <Post theme={theme} />
  </Suspense>
  )
}
