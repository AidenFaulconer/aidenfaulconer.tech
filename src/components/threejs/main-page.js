import {
  DefaultLoadingManager,
  Fog,
  Color,
  Mesh,
  Group,
  AmbientLight,
  MeshBasicMaterial,
  PlaneGeometry,
  DoubleSide,
  IcosahedronGeometry,
  MeshLambertMaterial,
  SpotLight,
  Vector3,
  FrontSide,
  BackSide,
  LineBasicMaterial
} from "three";

// boiler plate setup
import * as SimplexNoise from "simplex-noise";
import View from "./js/components/view/View";
import threeConfig from "./js/config/threeConfig";
// other
// import Geometry from "./js/components/gameobject/geometry";
// import threeConfig from "./js/config/threeConfig.js";
// import Lighting from "./js/components/lighting/lighting";
// the view class contains the camera, render pipeline, and scene... TODO: abstract scene seperatly

// #region experience functions

// export const opacify = analyser => {
//   analyser.onaudioprocess = function(e) {
//     // no need to get the output buffer anymore
//     const int = e.inputBuffer.getChannelData(0);
//     let max = 0;
//     for (let i = 0; i < int.length; i++) {
//       max = int[i] > max ? int[i] : max;
//     }
//     // artist.style.opacity = max;
//   };
// };

// export const onchange = audio => {
//   audio.classList.add("active");
//   audio.src = URL
//     .createObjectURL
//     // require("../../../static/sounds/Kiiara - Whippin (feat. Felix Snow) [Official Video].mp3")
//     ();
//   audio.load();
//   audio.play();
//   play();
// };
// #endregion experience functions

//   audio.addEventListener('canplay', function () {
//     play();
//   })  audio.src="https://thomasvanglabeke.github.io/SoundCity/assets/holy.mp3"
//    // Initialization of audio and analyser
// if (AudioContext) {
//     var audio = new Audio()
//     audio.crossOrigin = "anonymous";
//     audio.controls = false
//     audio.src = "https://thomasvanglabeke.github.io/SoundCity/assets/holy.mp3"
//     document.body.appendChild(audio)
// // Once the song is playable, the loader disappears and the init function start
// }

// create a threejs experience
export default class extends View {
  constructor(canvas) {
    super(canvas);
    if (typeof window !== "undefined") this.window = window;
    else this.window = null;

    this.window.AudioContext =
      this.window.AudioContext ||
      this.window.webkitAudioContext ||
      this.window.mozAudioContext ||
      this.window.msAudioContext ||
      this.window.oAudioContext;
    // #region window
    this.noise = new SimplexNoise();

    // bind methods to this class
    // this.modulate = this.modulate.bind(this);
    // this.fractionate = this.fractionate.bind(this);
    // this.makeRoughBall = this.makeRoughBall.bind(this);
    // this.makeRoughGround = this.makeRoughGround.bind(this);
    // this.avg = this.avg.bind(this);
    // this.max = this.max.bind(this);
    this.audio;
    this.context;
    this.analyser;
    this.src;
    this.dataArray = new Uint8Array(20);
    this.audioContextCreated = false;

    const createAudioContext = () => {
      // TODO: this funciton runs twice for some reason
      if (!this.audioContextCreated) {
        this.audio = document.getElementById("audio");
        this.context = new AudioContext();
        this.analyser = this.context.createAnalyser();
        // this.audio.src = `/sounds/Whippin.mp3`;
        this.audio.crossOrigin = "anonymous";
        this.audio.loop = true;
        this.audio.muted = false; // must be enabled first
        this.audio.load();
      }

      if (AudioContext) {
        this.analyser.connect(this.context.destination);
        this.analyser.fftSize = 512;
        const dataLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(dataLength);

        if (!this.src)
          this.src = this.context.createMediaElementSource(this.audio); // important check!
        this.src.connect(this.analyser);
      }
      this.audioContextCreated = true;
    };
    // start audio on user interaction
    document.getElementById("main").addEventListener(
      "click",
      () => {
        createAudioContext();
        this.audioEnabled = !this.audioEnabled;
        this.audio.muted = !this.audioEnabled;
        createAudioContext();
        this.analyser.getByteFrequencyData(this.dataArray);

        if (this.audioEnabled) this.audio.play();
        else this.audio.pause();
      },
      false
    );

    this.camera.position.set(0, 0, 110);
    this.camera.lookAt(this.scene.position);
    // #endregion window

    // #region scene
    this.group = new Group();
    let planeSpan = 800;
    let planeDetail = 50;
    if (threeConfig.isMobile) {
      planeSpan = 0;
      planeDetail = 0;
    }
    this.planeGeometry = new PlaneGeometry(
      planeSpan,
      planeSpan,
      planeDetail,
      planeDetail
    );
    this.planeMaterial = new MeshLambertMaterial({
      color: "#6bb7a8", // was #211e2d
      side: FrontSide,
      transparent: true,
      opacity: threeConfig.isMobile ? 0 : 1,
      wireframe: true
    });

    // this.plane = new Mesh(this.planeGeometry, this.planeMaterial);
    // this.plane.rotation.x = -0.5 * Math.PI;
    // this.plane.position.set(0, 30, 0);
    // this.group.add(this.plane);

    // this.plane2 = new Mesh(this.planeGeometry, this.planeMaterial);
    // this.plane2.rotation.x = -0.5 * Math.PI;
    // this.plane2.position.set(0, -50, 0);
    // this.group.add(this.plane2);

    this.icosahedronGeometry = new IcosahedronGeometry(10, 4);
    this.lambertMaterial = new MeshLambertMaterial({
      color: "#8CF2D9",
      wireframe: true
    });

    this.ball = new Mesh(this.icosahedronGeometry, this.lambertMaterial);
    this.ball.position.set(2, -14, 4);
    this.group.add(this.ball);

    this.ambientLight = new AmbientLight(0xaaaaaa);
    this.scene.add(this.ambientLight);

    this.spotLight = new SpotLight(0xffffff);
    this.spotLight.intensity = 0.9;
    this.spotLight.position.set(-10, 40, 20);
    this.spotLight.lookAt(this.ball);
    // this.spotLight.castShadow = true;
    this.scene.add(this.spotLight);

    this.scene.add(this.group);

    if (threeConfig.fog.isFog)
      this.scene.fog = new Fog(
        threeConfig.fog.color,
        threeConfig.fog.density,
        threeConfig.fog.far
      );

    this.scene.background = new Color(threeConfig.background.color);
    // #endregion scene

    // #region loading manager
    // DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) =>
    //   (global.windowLoadProgress = Math.floor(itemsLoaded / itemsTotal));
    // DefaultLoadingManager.onLoad = () => (global.windowLoadProgress = 1 && console.log(global.windowLoadProgress));
    // #endregion loading manager
    if (typeof window !== "undefined") this.update();
  }

  // some helper functions here
  fractionate(val, minVal, maxVal) {
    return (val - minVal) / (maxVal - minVal);
  }

  modulate(val, minVal, maxVal, outMin, outMax) {
    const fr = this.fractionate(val, minVal, maxVal);
    const delta = outMax - outMin;
    return outMin + fr * delta;
  }

  avg(arr) {
    const total = arr.reduce((sum, b) => sum + b);
    return total / arr.length;
  }

  max(arr) {
    return arr.reduce((a, b) => Math.max(a, b));
  }

  makeRoughGround(distortionFr, time) {
    const mesh = this.plane2;
    mesh.geometry.vertices.forEach(vertex => {
      // const amp = 2;
      const time = Date.now();
      const distance =
        (this.noise.noise2D(
          vertex.x + time * 0.0003,
          vertex.y + time * 0.0001
        ) +
          0) *
        distortionFr *
        2;
      vertex.z = distance;
    });
    mesh.geometry.verticesNeedUpdate = true;
    mesh.geometry.normalsNeedUpdate = true;
    mesh.geometry.computeVertexNormals();
    mesh.geometry.computeFaceNormals();
  }

  makeRoughBall(bassFr, treFr, r, time) {
    const { geometry } = this.ball;
    geometry.vertices.forEach(vertex => {
      const offset = geometry.parameters.radius;
      const amp = 9;
      // const time = this.window.performance.now();
      vertex.normalize();
      const rf = 0.00001;
      const distance =
        offset +
        bassFr +
        this.noise.noise4D(
          vertex.x + time * rf * 7,
          vertex.y + time * rf * 8,
          vertex.z + time * rf * 9,
          r
        ) *
          amp *
          treFr;
      vertex.multiplyScalar(distance);
    });

    geometry.verticesNeedUpdate = true;
    geometry.normalsNeedUpdate = true;
    geometry.computeVertexNormals();
    geometry.computeFaceNormals();
  }

  update() {
    if (this.audioEnabled) this.analyser.getByteFrequencyData(this.dataArray);

    const lowerHalfArray = this.dataArray.slice(
      0,
      this.dataArray.length / 2 - 1
    );
    const upperHalfArray = this.dataArray.slice(
      this.dataArray.length / 2 - 1,
      this.dataArray.length - 1
    );
    // const overallAvg = avg(this.dataArray);

    const lowerMax = this.max(lowerHalfArray);
    let lowerMaxFr;

    // const lowerAvg = avg(lowerHalfArray);
    // const lowerAvgFr = lowerAvg / lowerHalfArray.length;

    const upperAvg = this.avg(upperHalfArray);
    // const upperMax = max(upperHalfArray);
    // const upperMaxFr = upperMax / upperHalfArray.length;

    let upperAvgFr;

    const time = this.window.performance.now();
    const r = time * 0.0005;

    if (lowerMax < 1) {
      upperAvgFr = 0.15;
      lowerMaxFr = 0.35;
    } else {
      upperAvgFr = upperAvg / upperHalfArray.length;
      lowerMaxFr = lowerMax / lowerHalfArray.length / 1.5;
    }

    // this.makeRoughGround(this.plane, modulate(upperAvgFr, 0, 1, 0.5, 4));
    // const groundModulate = this.modulate(lowerMaxFr, 0, 1, 0.5, 4);
    // this.makeRoughGround(groundModulate, time);

    const yModulate = this.modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 8);
    const zModulate = this.modulate(upperAvgFr, 0, 1, 0, 3);
    this.makeRoughBall(yModulate, zModulate, r / 2, time);

    this.group.rotation.y += 0.00008;

    this.group.position.x = 5 * Math.cos(r);
    this.group.position.z = 5 * Math.sin(r);
    this.group.position.y = 5 * Math.sin(r);

    this.group.children[0].position.x = 70 * Math.cos(2 * r);
    this.group.children[0].position.z = 70 * Math.sin(r);
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.update.bind(this));
  }
}
