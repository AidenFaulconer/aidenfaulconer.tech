import { Mesh } from "three";
// import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils";
// static object manager, used to instance calsses already existing, this is a forms of caching
export default class {
  constructor() {
    this.pool = [];
    this.getPool.bind(this);
    this.addToPool.bind(this);
    // TODO: implement efficient searching and sorting algorithms for handling large amounts of objects
  }

  getPool() {
    return this.pool; // return a refrence
  }
  // optimization, that makes all objects part of one mesh if thats the desired thing to do for an optimization
  // allGeometryMerged() {
  //   const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(
  //     ...this.pool,
  //     false
  //   );

  //   return new Mesh(mergedGeometry);
  // }

  addToPool(object) {
    this.pool.push(object);
  }
}
