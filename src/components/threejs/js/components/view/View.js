import {
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  Clock,
  OrthographicCamera
} from "three";
// import * as dat from "dat.gui";
import threeConfig from "../../config/threeConfig";

// post processing
// import Composer from '@superguigui/wagner/src/Composer'

export default class {
  constructor(canvas) {
    this._canvas = canvas; // passed in from start of program if its decided we want a custom container
    this._winWidth = this._canvas.clientWidth;
    this._winHeight = this._canvas.clientHeight;
    this._updateCallbacks = [];
    // this._objectPool = new ObjectPool();

    // scene
    this.scene = new Scene();
    this.renderer = new WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true
    });

    // #region configuration
    if (typeof window !== "undefined") {
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(this._winWidth, this._winHeight, false);
      this.renderer.shadowMap.enabled = threeConfig.renderer.shadow.enabled;
      this.renderer.shadowMap.type = threeConfig.renderer.shadow.type;
      this._canvas.appendChild(this.renderer.domElement); // append threejs canvas to the canvas on the document
    }
    // #endregion

    // orthographic or perspective?
    if (threeConfig.isMobile && threeConfig.camera.mobile.orthographic) {
      this.camera = new OrthographicCamera(
        70,
        this._winWidth / this._winHeight,
        1,
        1000
      );
    } else if (threeConfig.camera.orthographic) {
      this.camera = new OrthographicCamera(
        70,
        this._winWidth / this._winHeight,
        1,
        1000
      );
    } else {
      this.camera = new PerspectiveCamera(
        threeConfig.camera.fov,
        this._winWidth / this._winHeight,
        threeConfig.isMobile
          ? threeConfig.camera.mobile.near
          : threeConfig.camera.near,
        threeConfig.isMobile
          ? threeConfig.camera.mobile.far
          : threeConfig.camera.far
      );
    }

    // camera config
    if (threeConfig.isMobile) {
      this.camera.aspect = threeConfig.camera.mobile.aspect;
      this.camera.position.x = threeConfig.camera.mobile.posX;
      this.camera.position.y = threeConfig.camera.mobile.posY;
      this.camera.position.z = threeConfig.camera.mobile.posZ;
      this.camera.rotateX(threeConfig.camera.mobile.rotX);
      this.camera.rotateY(threeConfig.camera.mobile.rotY);
      this.camera.rotateZ(threeConfig.camera.mobile.rotZ);
    } else {
      this.camera.aspect = threeConfig.camera.aspect;
      this.camera.position.x = threeConfig.camera.posX;
      this.camera.position.y = threeConfig.camera.posY;
      this.camera.position.z = threeConfig.camera.posZ;
      this.camera.rotateX(threeConfig.camera.rotX);
      this.camera.rotateY(threeConfig.camera.rotY);
      this.camera.rotateZ(threeConfig.camera.rotZ);
    }

    // #region post processing
    this._pixelRatio = this.renderer.getPixelRatio(); // used in postprocessing uniform values in shader
    this._passes = [];
    // this._composer = new Composer(this.renderer)// manager allowing piping in new passes to render pipeline
    // if (threeConfig.PostProcessing.enabled) this.enablePostProcessing();
    // else this.disablePostProcessing();
    // #endregion

    // #region event listeners
    if (typeof window !== "undefined")
      window.addEventListener("resize", this.onWindowResize.bind(this), false);
    // #endregion
  }

  // public
  enablePostProcessing() {
    for (const pass in threeConfig.PostProcessing.Types) {
      console.log(pass);
      this._passes.push(new threeConfig.PostProcessing.Types[pass]()); // new pass in pipeline to antialias in final render stages
    }
    this.onWindowResize(); // ensure resolution is set when we enable this shader
  }

  onWindowResize() {
    if (typeof window !== "undefined") {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.render(this.scene,this.camera);
    }
  }

  // onWindowResize(e) {
  //   // camera
  //   // const canvas = this.renderer.domElement.parentNode
  //   const width = this._canvas.clientWidth;
  //   const height = this._canvas.clientHeight;
  //   // adjust displayBuffer size to match
  //   if (width !== this._winWidth || height !== this._winHeight) {
  //     this._winHeight = height;
  //     this._winWidth = width;
  //     this.camera.aspect = width / height;// you must pass false here or three.js fights the browser
  //     this.camera.fov =
  //       (360 / Math.PI) * Math.atan(this._tanFov * (height / this._winHeight));
  //     this.camera.updateProjectionMatrix();
  //     // update render pipeline
  //     this.renderer.setSize(width, height, false);
  //     this.renderer.render(this.scene, this.camera);
  //     // this._composer.setSize(width, height)
  //     // update any render passes here
  //     // for(let i=0;i<this._passes.length;++i){
  //     //   this._passes[i]
  //     // }
  //   }
  //   this.update();
  // }
}
