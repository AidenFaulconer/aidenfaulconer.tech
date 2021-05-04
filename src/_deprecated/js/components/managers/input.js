import Keyboard from "../../utils/keyboard";
import Helpers from "../../com/helpers";
import threeConfig from "../../config/threeConfig";

// Manages all input interactions
export default class Interaction {
  constructor(renderer, scene, camera, controls) {
    // Properties
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.controls = controls;

    this.timeout = null;

    // Instantiate keyboard helper
    this.keyboard = new Keyboard();

    // Listeners
    // Mouse events
    this.renderer.domElement.addEventListener(
      "mousemove",
      event => Helpers.throttle(this.onMouseMove(event), 250),
      false
    );
    this.renderer.domElement.addEventListener(
      "mouseleave",
      event => this.onMouseLeave(event),
      false
    );
    this.renderer.domElement.addEventListener(
      "mouseover",
      event => this.onMouseOver(event),
      false
    );

    // Keyboard events
    this.keyboard.domElement.addEventListener("keydown", event => {
      // Only once
      if (event.repeat) {
        return;
      }

      if (this.keyboard.eventMatches(event, "escape")) {
        console.log("Escape pressed");
      }
    });
  }

  onMouseOver(event) {
    event.preventDefault();

    threeConfig.isMouseOver = true;
  }

  onMouseLeave(event) {
    event.preventDefault();

    threeConfig.isMouseOver = false;
  }

  onMouseMove(event) {
    event.preventDefault();

    clearTimeout(this.timeout);

    this.timeout = setTimeout(function() {
      threeConfig.isMouseMoving = false;
    }, 200);

    threeConfig.isMouseMoving = true;
  }
}
