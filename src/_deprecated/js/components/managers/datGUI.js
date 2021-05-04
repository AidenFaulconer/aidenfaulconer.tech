import threeConfig from "../../config/threeConfig";
import dat from "../../vendor/dat.gui.min.js";

// Manages all dat.GUI interactions
export default class DatGUI {
  constructor(main, mesh) {
    const gui = new dat.GUI();

    this.camera = main.camera.threeCamera;
    this.controls = main.controls.threeControls;
    this.light = main.light;

    /* Global */
    // gui.close();

    /* Camera */
    const cameraFolder = gui.addFolder("Camera");
    const cameraFOVGui = cameraFolder
      .add(threeConfig.camera, "fov", 0, 180)
      .name("Camera FOV");
    cameraFOVGui.onChange(value => {
      this.controls.enableRotate = false;

      this.camera.fov = value;
    });
    cameraFOVGui.onFinishChange(() => {
      this.camera.updateProjectionMatrix();

      this.controls.enableRotate = true;
    });
    const cameraAspectGui = cameraFolder
      .add(threeConfig.camera, "aspect", 0, 4)
      .name("Camera Aspect");
    cameraAspectGui.onChange(value => {
      this.controls.enableRotate = false;

      this.camera.aspect = value;
    });
    cameraAspectGui.onFinishChange(() => {
      this.camera.updateProjectionMatrix();

      this.controls.enableRotate = true;
    });
    const cameraFogColorGui = cameraFolder
      .addColor(threeConfig.fog, "color")
      .name("Fog Color");
    cameraFogColorGui.onChange(value => {
      main.scene.fog.color.setHex(value);
    });
    const cameraFogNearGui = cameraFolder
      .add(threeConfig.fog, "near", 0.0, 0.01)
      .name("Fog Near");
    cameraFogNearGui.onChange(value => {
      this.controls.enableRotate = false;

      main.scene.fog.density = value;
    });
    cameraFogNearGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });

    /* Controls */
    const controlsFolder = gui.addFolder("Controls");
    controlsFolder
      .add(threeConfig.controls, "autoRotate")
      .name("Auto Rotate")
      .onChange(value => {
        this.controls.autoRotate = value;
      });
    const controlsAutoRotateSpeedGui = controlsFolder
      .add(threeConfig.controls, "autoRotateSpeed", -1, 1)
      .name("Rotation Speed");
    controlsAutoRotateSpeedGui.onChange(value => {
      this.controls.enableRotate = false;
      this.controls.autoRotateSpeed = value;
    });
    controlsAutoRotateSpeedGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });

    /* Mesh */
    const meshFolder = gui.addFolder("Mesh");
    meshFolder
      .add(threeConfig.mesh, "translucent", true)
      .name("Translucent")
      .onChange(value => {
        if (value) {
          mesh.material.transparent = true;
          mesh.material.opacity = 0.5;
        } else {
          mesh.material.opacity = 1.0;
        }
      });
    meshFolder
      .add(threeConfig.mesh, "wireframe", true)
      .name("Wireframe")
      .onChange(value => {
        mesh.material.wireframe = value;
      });

    /* Lights */
    // Ambient Light
    const ambientLightFolder = gui.addFolder("Ambient Light");
    ambientLightFolder
      .add(threeConfig.ambientLight, "enabled")
      .name("Enabled")
      .onChange(value => {
        this.light.ambientLight.visible = value;
      });
    ambientLightFolder
      .addColor(threeConfig.ambientLight, "color")
      .name("Color")
      .onChange(value => {
        this.light.ambientLight.color.setHex(value);
      });

    // Directional Light
    const directionalLightFolder = gui.addFolder("Directional Light");
    directionalLightFolder
      .add(threeConfig.directionalLight, "enabled")
      .name("Enabled")
      .onChange(value => {
        this.light.directionalLight.visible = value;
      });
    directionalLightFolder
      .addColor(threeConfig.directionalLight, "color")
      .name("Color")
      .onChange(value => {
        this.light.directionalLight.color.setHex(value);
      });
    const directionalLightIntensityGui = directionalLightFolder
      .add(threeConfig.directionalLight, "intensity", 0, 2)
      .name("Intensity");
    directionalLightIntensityGui.onChange(value => {
      this.controls.enableRotate = false;

      this.light.directionalLight.intensity = value;
    });
    directionalLightIntensityGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const directionalLightPositionXGui = directionalLightFolder
      .add(threeConfig.directionalLight, "x", -1000, 1000)
      .name("Position X");
    directionalLightPositionXGui.onChange(value => {
      this.controls.enableRotate = false;

      this.light.directionalLight.position.x = value;
    });
    directionalLightPositionXGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const directionalLightPositionYGui = directionalLightFolder
      .add(threeConfig.directionalLight, "y", -1000, 1000)
      .name("Position Y");
    directionalLightPositionYGui.onChange(value => {
      this.controls.enableRotate = false;

      this.light.directionalLight.position.y = value;
    });
    directionalLightPositionYGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const directionalLightPositionZGui = directionalLightFolder
      .add(threeConfig.directionalLight, "z", -1000, 1000)
      .name("Position Z");
    directionalLightPositionZGui.onChange(value => {
      this.controls.enableRotate = false;

      this.light.directionalLight.position.z = value;
    });
    directionalLightPositionZGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });

    // Shadow Map
    const shadowFolder = gui.addFolder("Shadow Map");
    shadowFolder
      .add(threeConfig.shadow, "enabled")
      .name("Enabled")
      .onChange(value => {
        this.light.directionalLight.castShadow = value;
      });
    shadowFolder
      .add(threeConfig.shadow, "helperEnabled")
      .name("Helper Enabled")
      .onChange(value => {
        this.light.directionalLightHelper.visible = value;
      });
    const shadowNearGui = shadowFolder
      .add(threeConfig.shadow, "near", 0, 400)
      .name("Near");
    shadowNearGui.onChange(value => {
      this.controls.enableRotate = false;

      this.light.directionalLight.shadow.camera.near = value;
    });
    shadowNearGui.onFinishChange(() => {
      this.controls.enableRotate = true;
      this.light.directionalLight.shadow.map.dispose();
      this.light.directionalLight.shadow.map = null;
      this.light.directionalLightHelper.update();
    });
    const shadowFarGui = shadowFolder
      .add(threeConfig.shadow, "far", 0, 1200)
      .name("Far");
    shadowFarGui.onChange(value => {
      this.controls.enableRotate = false;

      this.light.directionalLight.shadow.camera.far = value;
    });
    shadowFarGui.onFinishChange(() => {
      this.controls.enableRotate = true;
      this.light.directionalLight.shadow.map.dispose();
      this.light.directionalLight.shadow.map = null;
      this.light.directionalLightHelper.update();
    });
    const shadowTopGui = shadowFolder
      .add(threeConfig.shadow, "top", -400, 400)
      .name("Top");
    shadowTopGui.onChange(value => {
      this.controls.enableRotate = false;

      this.light.directionalLight.shadow.camera.top = value;
    });
    shadowTopGui.onFinishChange(() => {
      this.controls.enableRotate = true;
      this.light.directionalLight.shadow.map.dispose();
      this.light.directionalLight.shadow.map = null;
      this.light.directionalLightHelper.update();
    });
    const shadowRightGui = shadowFolder
      .add(threeConfig.shadow, "right", -400, 400)
      .name("Right");
    shadowRightGui.onChange(value => {
      this.controls.enableRotate = false;

      this.light.directionalLight.shadow.camera.right = value;
    });
    shadowRightGui.onFinishChange(() => {
      this.controls.enableRotate = true;
      this.light.directionalLight.shadow.map.dispose();
      this.light.directionalLight.shadow.map = null;
      this.light.directionalLightHelper.update();
    });
    const shadowBottomGui = shadowFolder
      .add(threeConfig.shadow, "bottom", -400, 400)
      .name("Bottom");
    shadowBottomGui.onChange(value => {
      this.controls.enableRotate = false;

      this.light.directionalLight.shadow.camera.bottom = value;
    });
    shadowBottomGui.onFinishChange(() => {
      this.controls.enableRotate = true;
      this.light.directionalLight.shadow.map.dispose();
      this.light.directionalLight.shadow.map = null;
      this.light.directionalLightHelper.update();
    });
    const shadowLeftGui = shadowFolder
      .add(threeConfig.shadow, "left", -400, 400)
      .name("Left");
    shadowLeftGui.onChange(value => {
      this.controls.enableRotate = false;

      this.light.directionalLight.shadow.camera.left = value;
    });
    shadowLeftGui.onFinishChange(() => {
      this.controls.enableRotate = true;
      this.light.directionalLight.shadow.map.dispose();
      this.light.directionalLight.shadow.map = null;
      this.light.directionalLightHelper.update();
    });
    const shadowBiasGui = shadowFolder
      .add(threeConfig.shadow, "bias", -0.00001, 1)
      .name("Bias");
    shadowBiasGui.onChange(value => {
      this.controls.enableRotate = false;

      this.light.directionalLight.shadow.bias = value;
    });
    shadowBiasGui.onFinishChange(() => {
      this.controls.enableRotate = true;
      this.light.directionalLight.shadow.map.dispose();
      this.light.directionalLight.shadow.map = null;
      this.light.directionalLightHelper.update();
    });

    // Point Light
    const pointLightFolder = gui.addFolder("Point Light");
    pointLightFolder
      .add(threeConfig.pointLight, "enabled")
      .name("Enabled")
      .onChange(value => {
        this.light.pointLight.visible = value;
      });
    pointLightFolder
      .addColor(threeConfig.pointLight, "color")
      .name("Color")
      .onChange(value => {
        this.light.pointLight.color.setHex(value);
      });
    const pointLightIntensityGui = pointLightFolder
      .add(threeConfig.pointLight, "intensity", 0, 2)
      .name("Intensity");
    pointLightIntensityGui.onChange(value => {
      this.controls.enableRotate = false;

      this.light.pointLight.intensity = value;
    });
    pointLightIntensityGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const pointLightDistanceGui = pointLightFolder
      .add(threeConfig.pointLight, "distance", 0, 1000)
      .name("Distance");
    pointLightDistanceGui.onChange(value => {
      this.controls.enableRotate = false;

      this.light.pointLight.distance = value;
    });
    pointLightDistanceGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const pointLightPositionXGui = pointLightFolder
      .add(threeConfig.pointLight, "x", -1000, 1000)
      .name("Position X");
    pointLightPositionXGui.onChange(value => {
      this.controls.enableRotate = false;

      this.light.pointLight.position.x = value;
    });
    pointLightPositionXGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const pointLightPositionYGui = pointLightFolder
      .add(threeConfig.pointLight, "y", -1000, 1000)
      .name("Position Y");
    pointLightPositionYGui.onChange(value => {
      this.controls.enableRotate = false;

      this.light.pointLight.position.y = value;
    });
    pointLightPositionYGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const pointLightPositionZGui = pointLightFolder
      .add(threeConfig.pointLight, "z", -1000, 1000)
      .name("Position Z");
    pointLightPositionZGui.onChange(value => {
      this.controls.enableRotate = false;

      this.light.pointLight.position.z = value;
    });
    pointLightPositionZGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });

    // Hemi Light
    const hemiLightFolder = gui.addFolder("Hemi Light");
    hemiLightFolder
      .add(threeConfig.hemiLight, "enabled")
      .name("Enabled")
      .onChange(value => {
        this.light.hemiLight.visible = value;
      });
    hemiLightFolder
      .addColor(threeConfig.hemiLight, "color")
      .name("Color")
      .onChange(value => {
        this.light.hemiLight.color.setHex(value);
      });
    hemiLightFolder
      .addColor(threeConfig.hemiLight, "groundColor")
      .name("ground Color")
      .onChange(value => {
        this.light.hemiLight.groundColor.setHex(value);
      });
    const hemiLightIntensityGui = hemiLightFolder
      .add(threeConfig.hemiLight, "intensity", 0, 2)
      .name("Intensity");
    hemiLightIntensityGui.onChange(value => {
      this.controls.enableRotate = false;

      this.light.hemiLight.intensity = value;
    });
    hemiLightIntensityGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const hemiLightPositionXGui = hemiLightFolder
      .add(threeConfig.hemiLight, "x", -1000, 1000)
      .name("Position X");
    hemiLightPositionXGui.onChange(value => {
      this.controls.enableRotate = false;

      this.light.hemiLight.position.x = value;
    });
    hemiLightPositionXGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const hemiLightPositionYGui = hemiLightFolder
      .add(threeConfig.hemiLight, "y", -500, 1000)
      .name("Position Y");
    hemiLightPositionYGui.onChange(value => {
      this.controls.enableRotate = false;

      this.light.hemiLight.position.y = value;
    });
    hemiLightPositionYGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const hemiLightPositionZGui = hemiLightFolder
      .add(threeConfig.hemiLight, "z", -1000, 1000)
      .name("Position Z");
    hemiLightPositionZGui.onChange(value => {
      this.controls.enableRotate = false;

      this.light.hemiLight.position.z = value;
    });
    hemiLightPositionZGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
  }
}
