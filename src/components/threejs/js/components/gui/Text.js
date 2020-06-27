import { FontLoader, Font } from "three";

export default class Text {
  constructor() {
    var loader = new THREE.FontLoader();
    loader.load("fonts/helvetiker_bold.typeface.json", function(font) {
      init(font);
      animate();
    });
  }
}
