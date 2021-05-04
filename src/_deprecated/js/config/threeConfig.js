import {
  FrontSide,
  MeshPhysicalMaterial,
  PCFSoftShadowMap,
  MeshBasicMaterial,
  DoubleSide
} from "three";

// post processing
// // import MultiPassBloomPass from '@superguigui/wagner/src/passes/bloom/MultiPassBloomPass'
// // import FXAAPass from '@superguigui/wagner/src/passes/fxaa/FXAAPass'
import { TweenMax } from "gsap";
import ShatterEffect from "../components/Interaction/ShatterEffect";

// environment paths
const modelPath = "../../../../../static/models/";
const texturePath = "../../../../../static/img/";

// This object contains the initial state of the app which will change realtime from datGUI
// TODO: make confiugration work realtime rather than at initialization
export default {
  isDev: true,
  isVR: false,
  isMobile: false,
  background: {
    enabled: true, // toggle use of background
    color: "#180F3E", // #95E5E1 to test
    sceneBg: {
      mobile: ["bg_mobile-01.png", "bg-blank-01.png"],
      pc: ["bg-01.png", "bg-blank-01.png"]
    }
  },
  PostProcessing: {
    enabled: false,
    Types: {
      FXAA: "FXAAPass",
      Bloom: "MultiPassBloomPass"
    }
  },
  materials: {
    raycastPlane: new MeshBasicMaterial({
      color: "0xffffff",
      transparent: true,
      opacity: 0,
      side: FrontSide
      // shininess: 900,
      // specular: 0x111111,
      // // opacity: 1,
      // blending: THREE.GreaterDepth,
      // metalness: 0.0,
      // depth: THREE.GreaterDepth,
      // ide: THREE.Backside
    })
  },
  // order is type, from, to
  tween: {
    // https://createjs.com/docs/tweenjs/modules/TweenJS.html
    quadratic: [
      TweenMax, // ease type
      500 // duration
    ],
    bounce: [
      TweenMax, // ease type
      500 // duration
    ],
    circular: [
      TweenMax, // ease type
      500 // duration
    ],
    linear: [
      TweenMax, // ease type
      500 // duration
    ]
  },
  models: {
    // lionobj: [
    //   {
    //     interactive: true,
    //     path: "./models/lion.OBJ",
    //     scale: [2.3, 2.3, 2.3],
    //     position: [2, -0.8, 0],
    //     material: [
    //       {
    //         type: "physical",
    //         props: [
    //           {
    //             wireframe: false,
    //             color: "#95E5E1",
    //             // transparent: true,
    //             metalness: 1,
    //             clearcoat: 3.74,
    //             roughness: 0.5,
    //             // flatShading: true,
    //             // opacity: 1,
    //             side: FrontSide,
    //             reflectivity: 2.19
    //             // vertexColors: true,
    //             // shininess: 900,
    //             // refractionRatio: 1.95,
    //             // envMapIntensity: 1,
    //             // envMap:  (()=>`${relativePath(texturePath)}/`+'textures/bg-01.png')(),
    //             // premultipliedAlpha: true
    //             // envMap: (()=>`${relativePath(texturePath)}/`+'textures/bg-01.png')() 'textures/bg-01.png',
    //             // specular: 0x111111,
    //             // // opacity: 1,
    //             // blending: THREE.GreaterDepth
    //             // metalness: 0.0,
    //             // depth: THREE.GreaterDepth,
    //             // ide: THREE.Backside
    //           },
    //           {
    //             // fx
    //             fx: "ShatterEffect"
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // ],
    backdropobj: [
      {
        interactive: false,
        path: "./models/backdrop.OBJ",
        scale: [1, 1, 1],
        // position: [5, -2, -4],
        position: [0, -3, 6],
        rotation: [0.2, -4.08, 0.05],
        material: [
          {
            type: "physical",
            props: [
              {
                color: "#8CF2D9",
                wireframe: true,
                reflectivity: 0.5,
                metalness: 0.25,
                roughness: 5.5,
                // transparent: true,
                opacity: 0.8,
                side: FrontSide
                // envMapIntensity: 1,
                // refractionRatio: 1,
                // envMap: 'https://i.imgur.com/IaVPGpn.png',
                // specular: 0x111111,
                // // opacity: 1,
                // blending: THREE.GreaterDepth,
                // depth: THREE.GreaterDepth,
                // ide: THREE.Backside
              }, // no fx
              { fx: false }
            ]
          }
        ]
      }
    ],
    backdropobj_mobile: [
      {
        interactive: false,
        path: "./models/backdrop_mobile.OBJ",
        scale: [1.8, 1.8, 1.8],
        position: [0, 0, 0],
        material: [
          {
            type: "physical",
            props: [
              {
                color: "#8CF2D9",
                wireframe: true,
                reflectivity: 0.2,
                metalness: 0.5,
                roughness: 0.5,
                transparent: true,
                opacity: 0.1,
                side: DoubleSide
                // envMapIntensity: 1,
                // refractionRatio: 1,
                // envMap: 'https://i.imgur.com/IaVPGpn.png',
                // specular: 0x111111,
                // // opacity: 1,
                // blending: THREE.GreaterDepth,
                // depth: THREE.GreaterDepth,
                // ide: THREE.Backside
              }, // no fx
              { fx: false }
            ]
          }
        ]
      }
    ]
  },
  mesh: {
    enableHelper: false,
    wireframe: false,
    translucent: false,
    material: {
      color: 0x95e5e1,
      emissive: 0x95e5e1
    }
  },
  fog: {
    isFog: true,
    color: "#180F3E", // was #100A29 and 080515
    density: 2,
    near: 0.20008,
    far: 420
  },
  camera: {
    orthographic: false,
    fov: 50,
    near: 0.01,
    far: 600,
    aspect: 1,
    // base position
    posX: -14,
    posY: -3,
    posZ: 40,
    // base orientation
    rotX: 0,
    rotY: 0,
    rotZ: 0,

    mobile: {
      orthographic: false,
      fov: 90,
      near: 0.01,
      far: 150,
      aspect: 1,
      // base position
      posX: 2,
      posY: 0,
      posZ: 6,
      // base orientation
      rotX: 0,
      rotY: 0,
      rotZ: 0
    }
  },
  interaction: {
    showRaycast: false
  },
  controls: {
    // togglables
    orbitControlsEnabled: false,
    // damp controls
    dragEnabled: false,
    // mouse
    mouseSpeed: 40, // higher is lower speed
    mouseDepth: -6, // how far a ray from the mouse goes into worldspace

    // orbit controls
    zoomEnabled: false,
    clickEnabled: false,
    infinitePolar: true,
    mouseEnabled: false,
    enableDamping: false,
    autoRotate: false,
    autoRotateSpeed: -0.5,
    zoomSpeed: 0.8,
    minDistance: 0,
    maxDistance: 100,
    minPolarAngle: Math.PI / 5,
    maxPolarAngle: Math.PI / 1,
    minAzimuthAngle: -Infinity,
    maxAzimuthAngle: Infinity,
    dampingFactor: 0.5,
    // camera position
    target: {
      x: 0,
      y: 0,
      z: 0
    },
    // configuration options for mobile (duplicate of above)
    mobile: {
      deviceOrentationEnabled: true,
      // mouse
      mouseSpeed: 50, // higher is lower speed
      mouseDepth: 4.5, // how far a ray from the mouse goes into worldspace
      // orbit controls
      orbitControlsEnabled: false,
      dragEnabled: false,
      zoomEnabled: false,
      clickEnabled: false,
      infinitePolar: false,
      mouseEnabled: false,
      enableDamping: false,
      zoomSpeed: 0.8,
      minDistance: 0,
      maxDistance: 100,
      minPolarAngle: Math.PI / 5,
      maxPolarAngle: Math.PI / 1,
      minAzimuthAngle: -Infinity,
      maxAzimuthAngle: Infinity,
      dampingFactor: 0.5,
      // misc
      autoRotate: false,
      autoRotateSpeed: -0.5,
      // camera position
      target: {
        x: 0,
        y: 0,
        z: 0
      }
    }
  },
  renderer: {
    shadow: {
      type: PCFSoftShadowMap,
      enabled: true,
      helperEnabled: true,
      bias: 0,
      mapWidth: 2048,
      mapHeight: 2048,
      near: 250,
      far: 300,
      top: 100,
      right: 100,
      bottom: -100,
      left: -100
    }
  },
  lighting: {
    // lights are a huge performance killer, be weary if enabling > 1 light sources
    helperEnabled: false,
    shadow: {
      enabled: false,
      bias: 0,
      mapWidth: 2048,
      mapHeight: 2048,
      near: 250,
      far: 400,
      top: 100,
      right: 100,
      bottom: -100,
      left: -100
    },
    ambientLight: {
      enabled: false,
      color: "#95E5E1",
      intensity: 0.5
    },
    directionalLight: {
      enabled: true,
      color: "#95E5E1",
      intensity: 0.5,
      x: -20,
      y: 150,
      z: 15
    },
    pointLight: {
      enabled: false,
      color: "#95E5E1",
      intensity: 1,
      distance: -2,
      x: 1,
      y: 0,
      z: -15
    },
    hemiLight: {
      enabled: true,
      color: "#95E5E1",
      intensity: 1,
      x: 0,
      y: 0,
      z: 10
      // groundColor: '#95E5E1',
    }
  },
  // isShowingStats: true,
  isLoaded: false,
  isRotating: true,
  isMouseMoving: false,
  isMouseOver: false,
  maxAnisotropy: 1,
  dpr: 1
};

// #region
// let time = {t: 0};

// let r = new TWEEN.Tween(time, this.tweens)
//     .to({t: 1}, CAMERA_TWEEN_DURATION)
//     .onUpdate((tween) => {
//          this.camera.quaternion.slerp(this.player.quaternion, tween.t);
//     })
//     .easing(TWEEN.Easing.Quartic.InOut)
//     .start();

// #endregion
