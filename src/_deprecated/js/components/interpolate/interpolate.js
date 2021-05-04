import Tween from "@tweenjs/tween.js";
import threeConfig from "../../config/threeConfig";

// https://medium.com/@lachlantweedie/animation-in-three-js-using-tween-js-with-examples-c598a19b1263

// create -> configure -> call
export default class Interpolate {
  // control object is the object being moved around from input
  // container is the canvas element we are using threejs in, so we know where to search for input at
  constructor(tweenObject, target) {
    this._tweenObject = tweenObject;
    this._target = target;
    // private base properties
  }

  // interpolate with custom configuration form threeconfig
  interpolate(interpolateType) {
    let thisTween = Tween.get(this._tweenObject)
      .to(this._target, ...threeConfig.tween[interpolateType])
      .call(() => {
        console.log("interpolation done");
      });
    thisTween.start();
    return thisTween; // if we apply further changes on this active tween
  }
}
