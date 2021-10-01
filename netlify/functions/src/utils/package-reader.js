"use strict";

const fs = require("fs");
const path = require("path");

class PackageReader {
  static getVersion() {
    const packagePath = path.join(__dirname, "..", "..", "..", "package.json");
    const pack = JSON.parse(fs.readFileSync(packagePath, "utf-8"));

    return pack.version;
  }
}

module.exports = PackageReader;
