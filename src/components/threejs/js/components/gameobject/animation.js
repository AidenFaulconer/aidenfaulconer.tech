import * as THREE from 'three'
import {TweenMax} from 'gsap'
import threeConfig from '../../config/threeConfig'

export default class Animation {
  constructor (obj, clip) {
    // Scene that the clip will be applied to
    this.obj = obj

    // Initialize animation mixer
    this.mixer = new THREE.AnimationMixer(this.obj)

    // Simple animation player
    this.playClip(clip)
  }

  playClip (clip) {
    this.action = this.mixer.clipAction(clip)

    this.action.play()
  }

  Tween (config ={}, targetObg, to) {
    TweenMax.to(targetObj,config.duration,{to.x,to.y,to.z,})

  }

  // Call update in loop
  update (delta) {
    if (this.mixer) {
      this.mixer.update(delta)
    }
  }
}
