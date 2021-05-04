import { PerspectiveCamera, Scene, WebGLRenderer } from "three";

// vr
import { WEBVR } from "three/examples/jsm/vr/WebVR";
import { OrbitControls } from "three/examples/jsm/Controls/OrbitControls";

// config
import { threeConfig } from "../../config/threeConfig";

// postprocessing
import EffectComposer from "../../shaders/EffectComposer";
import RenderPass from "../../shaders/RenderPass";

class VRView {
  constructor(canvas) {
    this._camera = new PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      10
    );

    this._canvas = canvas; // passed in from start of program
    // initilaize (all values private for time being)

    // camera
    this._camera = new PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    // configuration
    this._camera.fov = threeConfig.camera.fov;
    this._camera.near = threeConfig.camera.near;
    this._camera.far = threeConfig.camera.far;
    this._camera.aspect = threeConfig.camera.aspect;
    this._camera.position.x = threeConfig.camera.posX;
    this._camera.position.y = threeConfig.camera.posY;
    this._camera.position.z = threeConfig.camera.posZ;

    // scene
    this._scene = new Scene();
    // configuration
    this._scene.background = threeConfig.this._renderer = new WebGLRenderer({ // renderer (the render pipeline)
      antialias: true,
      preserveDrawingBuffer: true
    });
    // configuration
    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    this._renderer.shadowMap.enabled = threeConfig.shadow.enabled;
    this._renderer.shadowMap.type = threeConfig.shadow.type;
    this._canvas.appendChild(this._renderer.domElement); // append threejs canvas to the canvas on the document

    // post processing
    this._pixelRatio = this._renderer.getPixelRatio(); // used in postprocessing uniform values in shader
    this._renderPass = new RenderPass(this._scene, this._camera); // initial render pass in render pipeline
    this._composer = new EffectComposer(this._renderer); // manager allowing piping in new passes to render pipeline
    threeConfig.PostProcessing.FXAA.enabled
      ? this.toggleFXAA()
      : console.log("disabled FXAA filtering");

    // camera controls  TODO:(may make public refrence)
    this._controls = new OrbitControls(this._camera, this._renderer.domElement);
    // this._controls.addEventListener( 'change', render ) // add this only if there is no animation loop (requestAnimationFrame)
    this._controls.enableDamping = true;
    this._controls.dampingFactor = 0.25;
    this._controls.enableZoom = false;

    this._scene = new Scene();
    this._scene.add(this._camera);

    this._renderer = new WebGLRenderer();
    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    this._renderer.vr.enabled = true;
    document.body.appendChild(this._renderer.domElement);

    document.body.appendChild(WEBVR.createButton(this._renderer));

    window.addEventListener("resize", this.onWindowResize.bind(this), false);
  }

  // public
  enableFXAA() {
    this._fxaaPass = new threeConfig.PostProcessing.shaderPass(
      threeConfig.FXAA.fxaaShader
    ); // new pass in pipeline to antialias in final render stages
    this.onWindowResize(); // ensure resolution is set when we enable this shader
  }
  disableFXAA() {
    delete this._fxaaPass(); // delete allocated memory
    this.onWindowResize();
  }

  get renderer() {
    return this._renderer;
  }

  get camera() {
    return this._camera;
  }

  get scene() {
    return this._scene;
  }

  get effect() {
    return this._effect;
  }

  get controls() {
    return this._controls;
  }

  onWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate(timestamp) {
    this._effect.requestAnimationFrame(this.animate.bind(this));
    this._controls.update();
    this._effect.render(this._scene, this._camera);
  }
}
export default VRView;
