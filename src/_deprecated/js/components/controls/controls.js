import { DeviceOrientationControls } from "three/examples/jsm/controls/DeviceOrientationControls";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import threeConfig from "../../config/threeConfig";

// TODO: abstract further to inherit from a global static event handler class
export class Controls {
  // control object is the object being moved around from input
  // container is the canvas element we are using threejs in, so we know where to search for input at
  // takes in configuration to allow attatching more logic when a given event happens
  constructor(camera, container, scene) {
    // private base properties
    // #region

    this._camera = camera;
    this._scene = scene;
    this._container = container;
    this.orientationEnabled = false; // disabled by default, enabled through configuration
    // #endregion

    // public properties
    // #region
    this.windowHalf = { x: container.clientWidth, y: container.clientHeight };
    // #endregion

    // event listenrs for input
    if (threeConfig.controls.zoomEnabled)
      window.addEventListener(
        "mousewheel",
        this.onMouseWheel.bind(this),
        false
      );
    // configuration
    // #region
    if (threeConfig.isMobile) {
      // device orientation (if enabled no orbit controls / drag controls)
      if (threeConfig.controls.mobile.deviceOrentationEnabled) {
        this._orientation = new DeviceOrientationControls(this._camera);
        this._orientation.connect();
        this.orientationEnabled = true;
      }

      // orbit controls (mobile)
      // #region
      if (threeConfig.controls.mobile.orbitControlsEnabled)
        this._orbitControls = new OrbitControls(this._camera, this._container);
      if (threeConfig.controls.mobile.orbitControlsEnabled) {
        this._orbitControls.minAzimuthAngle =
          threeConfig.controls.mobile.minAzimuthAngle;
        this._orbitControls.maxAzimuthAngle =
          threeConfig.controls.mobile.maxAzimuthAngle;
        this._orbitControls.enableZoom = threeConfig.controls.mobile.enableZoom;
        this._orbitControls.minDistance =
          threeConfig.controls.mobile.minDistance;
        this._orbitControls.maxDistance =
          threeConfig.controls.mobile.maxDistance;
        if (!threeConfig.controls.mobile.infinitePolar) {
          this._orbitControls.maxPolarAngle =
            threeConfig.controls.mobile.maxPolarAngle;
          this._orbitControls.minPolarAngle =
            threeConfig.controls.mobile.minPolarAngle;
          this._orbitControls.enableDamping =
            threeConfig.controls.mobile.enableDamping;
        }
        if (threeConfig.controls.mobile.enableDamping) {
          this._orbitControls.dampingFactor =
            threeConfig.controls.mobile.dampingFactor;
          this._orbitControls.enableZoom =
            threeConfig.controls.mobile.zoomEnabled;
        }
      }
      // #endregion

      // drag controls (mobile)
      // #region
      if (threeConfig.controls.mobile.dragEnabled)
        this._dragControls = new DragControls(
          [],
          this._camera,
          this._container
        );
      // #endregion
    } else {
      // orbit controls (non mobile)
      // #region
      if (threeConfig.controls.orbitControlsEnabled)
        this._orbitControls = new OrbitControls(this._camera, this._container);
      if (threeConfig.controls.orbitControlsEnabled) {
        this._orbitControls.minAzimuthAngle =
          threeConfig.controls.minAzimuthAngle;
        this._orbitControls.maxAzimuthAngle =
          threeConfig.controls.maxAzimuthAngle;
        this._orbitControls.enableZoom = threeConfig.controls.enableZoom;
        this._orbitControls.minDistance = threeConfig.controls.minDistance;
        this._orbitControls.maxDistance = threeConfig.controls.maxDistance;
        if (!threeConfig.controls.infinitePolar) {
          this._orbitControls.maxPolarAngle =
            threeConfig.controls.maxPolarAngle;
          this._orbitControls.minPolarAngle =
            threeConfig.controls.minPolarAngle;
          this._orbitControls.enableDamping =
            threeConfig.controls.enableDamping;
        }
        if (threeConfig.controls.enableDamping) {
          this._orbitControls.dampingFactor =
            threeConfig.controls.mobile.dampingFactor;
          this._orbitControls.enableZoom =
            threeConfig.controls.mobile.zoomEnabled;
        }
      }
      // #endregion

      // drag controls (non mobile)
      // #region
      if (threeConfig.controls.dragEnabled)
        this._dragControls = new DragControls(
          [],
          this._camera,
          this._container
        );
      // #endregion
    }
  }
  // #endregion

  // TODO: move to a seperate class so we can re-use mouse inputs
  onMouseWheel(e) {
    console.log("asdfasdfas");
    this._camera.position.z += e.deltaY * 0.1;
  }

  onMouseMove(event) {
    this.mouse.x =
      (event.clientX / threeConfig.controls.mouseSpeed -
        this.windowHalf.x / threeConfig.controls.mouseSpeed) /
      8;
    this.mouse.y =
      (event.clientY / threeConfig.controls.mouseSpeed -
        this.windowHalf.y / threeConfig.controls.mouseSpeed) /
      8;
    let yAxis = Math.clamp(this.mouse.y, -2, 2);
    // let xAxis = Math.clamp(this.mouse.x, -100, 6)
    this.mouse.y = Math.lerp(yAxis, this.mouse.y, 0.5);
    // this.mouse.x = xAxis
    console.error(this.mouse.x);

    if (threeConfig.controls.mouseEnabled) {
      this._target = {
        x: (1 - this.mouse.x) * 0.002,
        y: (1 - this.mouse.y) * 0.002
      };
      this._camera.rotation.x +=
        0.5 * (this._target.y - this._camera.rotation.x);
      this._camera.rotation.y +=
        0.5 * (this._target.x - this._camera.rotation.y);
    }
  }

  // what will be called every frame from main update callbacks
  update() {
    if (this.orientationEnabled) this._orientation.update();
    // console.error(this._camera.position)
  }
}
