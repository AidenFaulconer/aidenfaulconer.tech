import {
  DefaultLoadingManager,
  Fog,
  Color,
  Mesh,
  Group,
  MathUtils,
  BoxBufferGeometry,
  Object3D,
  DoubleSide,
  SphereBufferGeometry,
  MeshBasicMaterial,
  SpotLight,
  VertexColors,
  Vector3,
  BufferAttribute,
  TextureLoader,
  FrontSide
} from "three";
import { BufferGeometryUtils } from "three/examples/jsm/utils/BufferGeometryUtils";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import {BufferGeometryUtils} from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/utils/BufferGeometryUtils.js';
// import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js';

// boiler plate setup
import View from "./js/components/view/View";
import threeConfig from "./js/config/threeConfig";

// create a threejs experience
export default class extends View {
  constructor(canvas) {
    super(canvas); // handle actual rendering in seperate class

    // #region handle data
    this.loadFile(
      "https://threejsfundamentals.org/threejs/resources/data/gpw/gpw_v4_basic_demographic_characteristics_rev10_a000_014mt_2010_cntm_1_deg.asc"
    )
      .then(this.parseData())
      .then(this.addBoxes())
      .then(this.update());
    // #endregion

    // #region window
    // #endregion window

    // #region scene
    this.geometries = []; // used to store this scenes geometry used in method addbox's

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    this.controls.minDistance = 1.2;
    this.controls.maxDistance = 4;
    this.controls.update();

    this.loader = new TextureLoader().load();
    const texture = this.loader.load(
      "https://threejsfundamentals.org/threejs/resources/images/world.jpg",
      this.update
    );
    const geometry = new SphereBufferGeometry(1, 64, 32);
    let material = new MeshBasicMaterial({ texture });
    this.scene.add(new Mesh(geometry, material));

    this.mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(
      this.geometries,
      false
    );
    material = new MeshBasicMaterial({
      vertexColors: VertexColors
    });
    const mesh = new Mesh(this.mergedGeometry, material);
    this.scene.add(mesh);
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

  async loadFile(url) {
    const req = await fetch(url);
    return req.text();
  }

  parseData(text) {
    const data = [];
    const settings = { data };
    let max;
    let min;
    // split into lines
    text.split("\n").forEach(line => {
      // split the line by whitespace
      const parts = line.trim().split(/\s+/);
      if (parts.length === 2) {
        // only 2 parts, must be a key/value pair
        settings[parts[0]] = parseFloat(parts[1]);
      } else if (parts.length > 2) {
        // more than 2 parts, must be data
        const values = parts.map(v => {
          const value = parseFloat(v);
          if (value === settings.NODATA_value) {
            return undefined;
          }
          max = Math.max(max === undefined ? value : max, value);
          min = Math.min(min === undefined ? value : min, value);
          return value;
        });
        data.push(values);
      }
    });
    return Object.assign(settings, { min, max });
  }

  addBoxes(file) {
    const { min, max, data } = file;
    const range = max - min;

    // these helpers will make it easy to position the boxes
    // We can rotate the lon helper on its Y axis to the longitude
    const lonHelper = new Object3D();
    this.scene.add(lonHelper);

    const latHelper = new Object3D(); // We rotate the latHelper on its X axis to the latitude
    lonHelper.add(latHelper);

    const positionHelper = new Object3D(); // The position helper moves the object to the edge of the sphere
    positionHelper.position.z = 1;
    latHelper.add(positionHelper);

    const originHelper = new Object3D(); // Used to move the center of the cube so it scales from the position Z axis
    originHelper.position.z = 0.5;
    positionHelper.add(originHelper);

    const color = new Color();

    const lonFudge = Math.PI * 0.5;
    const latFudge = Math.PI * -0.135;

    data.forEach((row, latNdx) => {
      row.forEach((value, lonNdx) => {
        if (value === undefined) {
          return;
        }
        const amount = (value - min) / range;

        const boxWidth = 1;
        const boxHeight = 1;
        const boxDepth = 1;
        const geometry = new BoxBufferGeometry(boxWidth, boxHeight, boxDepth);

        // adjust the helpers to point to the latitude and longitude
        lonHelper.rotation.y =
          MathUtils.degToRad(lonNdx + file.xllcorner) + lonFudge;
        latHelper.rotation.x =
          MathUtils.degToRad(latNdx + file.yllcorner) + latFudge;

        // use the world matrix of the origin helper to
        // position this geometry
        positionHelper.scale.set(
          0.005,
          0.005,
          MathUtils.lerp(0.01, 0.5, amount)
        );
        originHelper.updateWorldMatrix(true, false);
        geometry.applyMatrix4(originHelper.matrixWorld);

        // compute a color
        const hue = MathUtils.lerp(0.7, 0.3, amount);
        const saturation = 1;
        const lightness = MathUtils.lerp(0.4, 1.0, amount);
        color.setHSL(hue, saturation, lightness);
        // get the colors as an array of values from 0 to 255
        const rgb = color.toArray().map(v => v * 255);

        // make an array to store colors for each vertex
        const numVerts = geometry.getAttribute("position").count;
        const itemSize = 3; // r, g, b
        const colors = new Uint8Array(itemSize * numVerts);

        // copy the color into the colors array for each vertex
        colors.forEach((v, ndx) => {
          colors[ndx] = rgb[ndx % 3];
        });

        const normalized = true;
        const colorAttrib = new BufferAttribute(colors, itemSize, normalized);
        geometry.setAttribute("color", colorAttrib);

        this.geometries.push(geometry);
      });
    });
  }

  update() {
    this.controls.update();
  }
}
