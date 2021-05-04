import { Raycaster, Vector3, ArrowHelper, Math } from "three";
// import { TweenLite, Quad } from "gsap";
import threeConfig from "../../config/threeConfig";

// refrences to objects are passed in through config
export default class {
  // container is the canvas element we are using threejs in, so we know where to search for input at
  // create -> configure -> persists and checks input
  constructor(
    camera,
    container,
    eventHandlers = [],
    scene,
    objectpool,
    raycastPlane
  ) {
    // private base properties
    // #region
    this._camera = camera;
    this._scene = scene;
    this._objectPool = objectpool;
    this.raycastPlane = raycastPlane; // cheapest way to raycast to approximate mouse position in world space
    this._container = container;
    this._mouseRay = new Vector3(); // mouse ray in world coodinites
    // #endregion

    // public properties
    // #region

    // used for objects that have there own event handlers for interaction events to pass onto
    this.eventHandlers = eventHandlers; // we allow passing in an array of event handlers at initialization

    // have a mouse variable track mouse position
    this.mouse = { x: 0, y: 0 };
    // get center of current canvas
    this.windowHalf = {
      x: this._container.clientWidth / 2,
      y: this._container.clientHeight / 2
    }; // measure window
    // base raycaster
    this.raycaster = new Raycaster(
      this._camera.position,
      new Vector3(0, 0, 0).sub(this._camera.position).normalize()
    );
    if (threeConfig.interaction.showRaycast) this.debugRaycast = true;

    // #endregion

    // event listeners
    // #region
    if (threeConfig.isMobile) {
    } else {
      // document.addEventListener("mousedown", this.onMouseDown.bind(this), false);
      window.addEventListener("mousemove", this.onMouseMove.bind(this), false);
    }
    // #endregion
  }

  tweenToObject(object) {
    let pos;
    object === "camera"
      ? (pos =
          (threeConfig.camera.posX,
          threeConfig.camera.posY,
          threeConfig.camera.posZ))
      : (pos = object.position.z + threeConfig.camera.posZ);
    // first arg gets properties, object tells where to tween properties to
    const tween = TweenMax.to(camera, {
      duration: 1,
      ease: Quart,
      position: pos
    });
    tween.play();
  }

  // https://stackoverflow.com/questions/13055214/mouse-canvas-x-y-to-three-js-world-x-y-z
  onMouseMove(e) {
    this.mouse.x =
      (event.clientX / threeConfig.controls.mouseSpeed -
        this.windowHalf.x / threeConfig.controls.mouseSpeed) /
      8;
    this.mouse.y =
      (event.clientY / threeConfig.controls.mouseSpeed -
        this.windowHalf.y / threeConfig.controls.mouseSpeed) /
      8;
    const yAxis = Math.clamp(this.mouse.y, -3, 3);
    const xAxis = Math.clamp(this.mouse.x, -3, 3);
    this.mouse.y = Math.lerp(yAxis, this.mouse.y, 0.5);
    this.mouse.x = xAxis;

    // projects a flat up facing vector, to be a forward facing vector with respect to perspective camera
    this._mouseRay.set(
      -this.mouse.x,
      this.mouse.y,
      threeConfig.controls.mouseDepth
    );
    this._mouseRay.unproject(this._camera);
    this._mouseRay.sub(this._camera.position).normalize();
    this._mouseRay.z = threeConfig.controls.mouseDepth;

    // every event checks and passes in event data, since this is a manager aiming to only maintain one instance of event listening
    if (this.eventHandlers.length > 0) {
      for (const eventHandler of this.eventHandlers) {
        // TweenLite.to([this._mouseRay.x, this._mouseRay.y], 100.3, { ease: Quad })
        //  TODO: make this more generic, to handle a wider range of events that dont require world-mouse-coordinites
        eventHandler(this._mouseRay.toArray());
      }
    }

    // this.debugMouse(this._mouseRay.x, this._mouseRay.y, this._mouseRay.z)
  }

  debugMouse(x, y, z) {
    const origin = new Vector3(x, y, z);
    this._scene.add(
      new ArrowHelper(new Vector3(0, 0, -2), origin, this._mouseRay.z, 0x00ff00)
    );
  }

  // https://stackoverflow.com/questions/26652888/three-js-orthographic-camera-object-picking/26656345#26656345
  onMouseDown(e) {
    e.preventDefault();

    // track mouse coodinites
    // (TODO: SOURCE FROM CONTROL.JS OR MAKE A MOUSE HANDLER CLASS FOR BOTH TO REFRENCE)
    // this._mouseRay.y = -(e.clientY - this.windowHalf.y) * 2 - 1
    // this._mouseRay.x = (e.clientX - this.windowHalf.x) * 2 + 1

    // this.debugMouse(e.clientX, e.clientY, 20)

    // ray
    this.raycaster.setFromCamera({ x: e.clientX, y: e.clientY }, this._camera);

    // raycast and detect intersections
    const intersects = this.raycaster.intersectObjects(
      this._objectPool.getPool()
    ); // true means we recursivly look at what we hit

    if (intersects.length > 0) {
      alert("Mouse on target");
      // TODO:call event on geometry to toggle wireframe, when this event is fired we check for the raycast exits on this event call
      // intersects[0].material.wireframe = true
    }
  }

  debugRaycast() {
    this._debugRay = new ArrowHelper(
      this.raycaster.ray.direction,
      this.raycaster.ray.origin,
      100,
      "#afafff"
    );
    this._scene.add(this._debugRay);
  }
}

// #region TODO: consolidate this code into this class for raycasting
// const { height, width } = this.environment;
// this.plane = new PlaneBufferGeometry(width * 0.75, height * 0.75, 100, 50);
// detect user position in scroll
// this.position.current += (this.scroll.values.target - this.position.current) * 0.1;
// if (this.position.current < this.position.previous) {
//   this.direction = "up";
// } else if (this.position.current > this.position.previous) {
//   this.direction = "down";
// } else {
//   this.direction = "none";
// }
// this.position.previous = this.position.current;
// #endregion raycasting
