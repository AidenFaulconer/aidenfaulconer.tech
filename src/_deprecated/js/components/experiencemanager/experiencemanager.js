import threeConfig from "../../config/threeConfig";

export default class ExperienceManger {
  constructor(main, mainvr) {
    experiences = { vr: mainvr, novr: main }; // the two differnet entry points we use
    vrmode = threeConfig.isVR ? "vr" : "novr";
    mode = threeConfig.isMobile ? "mobile" : "nonMobile";
  }

  toggleMobile() {}
  toggleVR() {}
}
