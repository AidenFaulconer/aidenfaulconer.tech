import { TessellateModifier } from "three/examples/jsm/modifiers/TessellateModifier";
import { ShaderMaterial, BufferAttribute, Geometry } from "three";

// shader
let uniforms = {
  amplitude: { value: 0.0 }
};
const vertexShader = `
			uniform float amplitude;

			attribute vec3 customColor;
			attribute vec3 displacement;

			varying vec3 vNormal;
			varying vec3 vColor;

			void main() {

				vNormal = normal;
				vColor = customColor;

            //displace normals
				vec3 newPosition = position + normal * amplitude * displacement;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );

			}
		`;
const fragShader = `
         varying vec3 vNormal;
         varying vec3 vColor;

         void main() {

            const float ambient = 0.4;

            vec3 light = vec3( 1.0 );
            light = normalize( light );

            float directional = max( dot( vNormal, light ), 0.0 );

            gl_FragColor = vec4( ( directional + ambient ) * vColor, 1.0 );

         }
      `;

// based on example here https://threejs.org/examples/webgl_modifier_tessellation.html
export default class ShatterEffect {
  // pass by ref or else we get a performance hit
  constructor(mesh, scene, interaction, faces) {
    this._mesh = mesh;
    this._interaction = interaction;
    let numFaces = this.faces;

    // get displacement properties for shader and tessalation modifier
    this._displacement = new Float32Array(numFaces * 3 * 3);
    // get the number of faces on mesh currently
    console.log(this._mesh);
    // attatch the displacement values to the mesh // was setAttribute
    this._mesh.addAttribute(
      "displacement",
      new BufferAttribute(this._displacement, 3)
    );
    // compute the displacement values for mesh
    for (let f = 0; f < numFaces; f++) {
      let index = 9 * f;
      let d = 10 * (0.5 - Math.random());
      for (let i = 0; i < 3; i++) {
        this._displacement[index + 3 * i] = d;
        this._displacement[index + 3 * i + 1] = d;
        this._displacement[index + 3 * i + 2] = d;
      }
    }
    // shatter effect shader (modify uniform values to adjust the shatter distance)
    this._shaderMaterial = new ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragShader
    });

    /// tessalation
    let tessellateModifier = new TessellateModifier(8);
    // set tessalation on each face of mesh
    for (let i = 0; i < this._mesh.fases.length; i++) {
      tessellateModifier.modify(this._mesh);
    }
  }

  // handler for event e (currently used for click interaction)
  EventHandler(e) {}
  // methods to call in update method on main that update effect
  UpdateHandler() {
    uniforms.amplitude.value = 1.0 + Math.sin(this._view.deltatime * 0.5);
  }
}
