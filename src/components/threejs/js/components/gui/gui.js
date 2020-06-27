import threeConfig from "../../config/threeConfig";
import * as Dat from "../../vendor/dat.gui.min";

export class Gui {
  // container is the canvas element we are using threejs in, so we know where to search for input at
  // create -> configure -> persists and checks input
  // TODO: make configurable
  constructor() {
    // private base properties
    this._gui = new Dat();
  }
}
