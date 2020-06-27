import threeConfig from "../../config/threeConfig";
import {
  AmbientLight,
  PointLight,
  DirectionalLight,
  CameraHelper,
  HemisphereLight
} from "three";

// TODO: make a loop through lighting rather than this manual configuration
export default class Lighting {
  constructor(scene) {
    this._scene = scene;

    // ambient lighting
    this.ambientLight = new AmbientLight(
      threeConfig.lighting.ambientLight.color
    );
    this.ambientLight.visible = threeConfig.lighting.ambientLight.enabled;

    // Point light
    this.pointLight = new PointLight(
      threeConfig.lighting.pointLight.color,
      threeConfig.lighting.pointLight.intensity,
      threeConfig.lighting.pointLight.distance
    );
    this.pointLight.position.set(
      threeConfig.lighting.pointLight.x,
      threeConfig.lighting.pointLight.y,
      threeConfig.lighting.pointLight.z
    );
    this.pointLight.visible = threeConfig.lighting.pointLight.enabled;

    // Directional light
    this.directionalLight = new DirectionalLight(
      threeConfig.lighting.directionalLight.color,
      threeConfig.lighting.directionalLight.intensity
    );
    this.directionalLight.position.set(
      threeConfig.lighting.directionalLight.x,
      threeConfig.lighting.directionalLight.y,
      threeConfig.lighting.directionalLight.z
    );
    this.directionalLight.visible =
      threeConfig.lighting.directionalLight.enabled;

    // Shadow map
    this.directionalLight.castShadow = threeConfig.lighting.shadow.enabled;
    this.directionalLight.shadow.bias = threeConfig.lighting.shadow.bias;
    this.directionalLight.shadow.camera.near = threeConfig.lighting.shadow.near;
    this.directionalLight.shadow.camera.far = threeConfig.lighting.shadow.far;
    this.directionalLight.shadow.camera.left = threeConfig.lighting.shadow.left;
    this.directionalLight.shadow.camera.right =
      threeConfig.lighting.shadow.right;
    this.directionalLight.shadow.camera.top = threeConfig.lighting.shadow.top;
    this.directionalLight.shadow.camera.bottom =
      threeConfig.lighting.shadow.bottom;
    this.directionalLight.shadow.mapSize.width =
      threeConfig.lighting.shadow.mapWidth;
    this.directionalLight.shadow.mapSize.height =
      threeConfig.lighting.shadow.mapHeight;

    // Shadow camera helper
    if (threeConfig.lighting.helperEnabled) {
      this.directionalLightHelper = new CameraHelper(
        this.directionalLight.shadow.camera
      );
      this.directionalLightHelper.visible = threeConfig.lighting.helperEnabled;
    }

    // Hemisphere light
    this.hemiLight = new HemisphereLight(
      threeConfig.lighting.hemiLight.color,
      threeConfig.lighting.hemiLight.groundColor,
      threeConfig.lighting.hemiLight.intensity
    );
    this.hemiLight.position.set(
      threeConfig.lighting.hemiLight.x,
      threeConfig.lighting.hemiLight.y,
      threeConfig.lighting.hemiLight.z
    );
    this.hemiLight.visible = threeConfig.lighting.hemiLight.enabled;

    // enums
    this.lightTypes = {
      ambient: "ambient",
      directional: "directional",
      point: "point",
      hemi: "hemi"
    };
  }

  place(lightName) {
    switch (lightName) {
      case "ambient":
        this._scene.add(this.ambientLight);
        break;

      case "directional":
        this._scene.add(this.directionalLight);
        if (threeConfig.lighting.helperEnabled)
          this._scene.add(this.directionalLightHelper);
        break;

      case "point":
        this._scene.add(this.pointLight);
        break;

      case "hemi":
        this._scene.add(this.hemiLight);
        break;
    }
  }
}
