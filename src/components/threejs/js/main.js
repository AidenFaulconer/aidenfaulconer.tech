// boilerplate for any threejs scene
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
  FrontSide
} from "three";

// boiler plate setup
import View from "./js/components/view/View";
import threeConfig from "./js/config/threeConfig";
// create a threejs experience
export default class extends View {
  constructor(canvas) {
    super(canvas); // handle actual rendering in seperate class

    // #region window

    if (typeof window !== "undefined") {
      // any code interacting with the window or the DOM
    }
    // #endregion window

    // #region scene
    // #endregion scene

    if (threeConfig.fog.isFog)
      this.scene.fog = new Fog(
        threeConfig.fog.color,
        threeConfig.fog.density,
        threeConfig.fog.far
      );

    this.scene.background = new Color(threeConfig.background.color);

    if (typeof window !== "undefined") this.update();
  }

  method() {}

  update() {}
}

// #region GUI controls

// export const datGUIConfigure = () => {
//   const gui = new dat.GUI();
//   if (typeof window !== "undefined") {
//     const cam = gui.addFolder("Camera");
//     cam.add(options.camera, "speed", 0, 0.001).listen();
//     cam.add(camera.position, "y", 0, 100).listen();
//     cam.open();

//     const velocity = gui.addFolder("Velocity");
//     velocity
//       .add(options, "velx", -0.2, 0.2)
//       .name("X")
//       .listen();
//     velocity
//       .add(options, "vely", -0.2, 0.2)
//       .name("Y")
//       .listen();
//     velocity.open();

//     const box = gui.addFolder("Cube");
//     box
//       .add(cube.scale, "x", 0, 3)
//       .name("Width")
//       .listen();
//     box
//       .add(cube.scale, "y", 0, 3)
//       .name("Height")
//       .listen();
//     box
//       .add(cube.scale, "z", 0, 3)
//       .name("Length")
//       .listen();
//     box.add(cube.material, "wireframe").listen();
//     box.open();

//     gui.add(options, "stop");
//     gui.add(options, "reset");
//   }
// };
// #endregion GUI controls
