// /* eslint-disable max-classes-per-file */
// import { ShaderMaterial, Color } from 'three';
// import { extend } from '@react-three/fiber';
// import * as THREE from 'three';

// class WarpMaterial extends ShaderMaterial {
//   constructor() {
//     super({
//       vertexShader: `uniform float scale;
//       uniform float shift;
//       varying vec2 vUv;
//       void main() {
//         vec3 pos = position;
//         pos.y = pos.y + ((sin(uv.x * 3.1415926535897932384626433832795) * shift * 2.0) * 0.125);
//         vUv = uv;
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
//       }`,
//       fragmentShader: `uniform sampler2D tex;
//       uniform float hasTexture;
//       uniform float shift;
//       uniform float scale;
//       uniform vec3 color;
//       uniform float opacity;
//       varying vec2 vUv;
//       void main() {
//         float angle = 1.55;
//         vec2 p = (vUv - vec2(0.5, 0.5)) * (1.0 - scale) + vec2(0.5, 0.5);
//         vec2 offset = shift / 4.0 * vec2(cos(angle), sin(angle));
//         vec4 cr = texture2D(tex, p + offset);
//         vec4 cga = texture2D(tex, p);
//         vec4 cb = texture2D(tex, p - offset);
//         if (hasTexture == 1.0) gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);
//         else gl_FragColor = vec4(color, opacity);
//       }`,
//       uniforms: {
//         tex: { value: null },
//         hasTexture: { value: 0 },
//         scale: { value: 0 },
//         shift: { value: 0 },
//         opacity: { value: 1 },
//         color: { value: new Color('white') },
//       },
//     });
//   }

//   set scale(value) {
//     this.uniforms.scale.value = value;
//   }

//   get scale() {
//     return this.uniforms.scale.value;
//   }

//   set shift(value) {
//     this.uniforms.shift.value = value;
//   }

//   get shift() {
//     return this.uniforms.shift.value;
//   }

//   set map(value) {
//     this.uniforms.hasTexture.value = !!value;
//     this.uniforms.tex.value = value;
//   }

//   get map() {
//     return this.uniforms.tex.value;
//   }

//   get color() {
//     return this.uniforms.color.value;
//   }

//   get opacity() {
//     return this.uniforms.opacity.value;
//   }

//   set opacity(value) {
//     if (this.uniforms) this.uniforms.opacity.value = value;
//   }
// }

// class RGBShiftMaterial extends ShaderMaterial {
//   constructor() {
//     super({
//       vertexShader: `
//         varying vec2 vUv;
//         void main() {
//           vUv = uv;
//           gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
//         }`,
//       fragmentShader: `
//         uniform sampler2D tDiffuse;
//         uniform float amount;
//         uniform float angle;
//         varying vec2 vUv;
    
//         void main() {
//           vec2 offset = amount * vec2( cos(angle), sin(angle));
//           vec4 cr = texture2D(tDiffuse, vUv + offset);
//           vec4 cga = texture2D(tDiffuse, vUv);
//           vec4 cb = texture2D(tDiffuse, vUv - offset);
//           l_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);
//         }`,
//       uniforms: {
//         tDiffuse: { type: 't', value: null },
//         amount: { type: 'f', value: 0.005 },
//         angle: { type: 'f', value: 0.0 },
//       },
//     });
//   }

//   set diffuse(value) {
//     this.uniforms.diffuse = value;
//   }

//   get diffuse() {
//     this.uniforms.diffuse;
//   }

//   set angle(value) {
//     this.uniforms.angle = value;
//   }

//   get angle() {
//     this.uniforms.angle;
//   }

//   set amount(value) {
//     this.uniforms.amount = value;
//   }

//   get amount() {
//     this.uniforms.amount;
//   }
// }

// // https://www.shadertoy.com/view/sl2yW3?

// class Water extends ShaderMaterial {
//   constructor() {
//     super({
//       vertexShader: '',
//       fragmentShader: `
//       ///Render water
//       #define MAX 100.
//       #define EPS 4e-4
      
//       //Classic pseudo-random hash
//       float hash(vec2 p)
//       {
//           return fract(sin(p.x*75.3 + p.y*94.2)*4952.);
//       }
//       //Bi-cubic value noise
//       float value(vec2 p)
//       {
//           vec2 f = floor(p);
//           vec2 s = p-f;
//           s *= s * (3.0 - 2.0 * s);
//           vec2 o = vec2(0, 1);
          
//           return mix(mix(hash(f+o.xx),hash(f+o.yx),s.x),
//                      mix(hash(f+o.xy),hash(f+o.yy),s.x),s.y);
//       }
//       //Approximate SDF from fractal value noise
//       float dist(vec3 p)
//       {
//           vec2 n = p.xz*0.6+1.0;
//           mat2 m = mat2(0.6754904, 0.7373688, -0.7373688, 0.6754904)*2.0;
//           float weight = 0.3;
//           float water = 0.0;
//           float speed = 0.2;
//           for(int i = 0; i<10; i++)
//           {
//               water += smoothstep(0.1, 0.9, value(n+speed*iTime)) * weight;
//               n *= m;
//               speed *= 1.3;
//               weight *= 0.45;
//           }
//           return (water+0.5-p.y);
//       }
//       //Compute normals from SDF derivative
//       vec3 normal(vec3 p)
//       {
//           vec2 e = vec2(4,-4)*EPS;
//           return normalize(dist(p+e.yxx)*e.yxx+dist(p+e.xyx)*e.xyx+
//                            dist(p+e.xxy)*e.xxy+dist(p+e.yyy)*e.yyy);
//       }
//       //Render water
//       void mainImage( out vec4 fragColor, in vec2 fragCoord )
//       {
//           vec3 ray = normalize(vec3(fragCoord*2.0 - iResolution.xy, iResolution.x));
//           ray.yz *= mat2(cos(0.5+vec4(0,11,33,0)));
//           vec3 pos = vec3(iTime*0.2,0,0);
//           vec4 mar = vec4(pos,0);
          
      
//           for(int i = 0; i<50; i++)
//           {
//               float stp = dist(mar.xyz);
//               mar += vec4(ray, 1) * stp;
              
//               if (stp<EPS || mar.w>MAX) break;
//           }
//           vec3 nor = normal(mar.xyz);
//           vec3 sun = normalize(vec3(0,-1,9));
//           vec3 ref = refract(ray, nor, 1.333);
//           float spec = exp(dot(ref, sun) * 9.0 - 9.0);
//           float fog = max(1.0 - mar.w/MAX, 0.0);
      
//           fragColor = vec4(vec3(sqrt(spec) * fog),1.-2./mar.w);    
//       }

//       #define T texture(iChannel0, I/r
// void mainImage(out vec4 O, vec2 I)
// {
//     vec2 r = iResolution.xy,
//     p = vec2(T).a*r.y/8e2,O-=O);
//     for(float i=1.; i<16.; i+=1./i)
//     {
//         p *= mat2(-.7374, -.6755, .6755,  -.7374);
//         O += exp(vec4(1, T+p*i/r))/.1);
//     }
//     O = log(O.gbar*.1);O /= O.a;
//     O += T,.5-ceil(log(.5/r.y)))-.1;
// }
      
//       `,
//       uniforms: {
//         iResolution: { value: new THREE.Vector2(1, 1) },
//         iTime: { value: 0 },
//         iChannel0: { value: null },
//         iChannel1: { value: null },
//         iMouse: { value: new THREE.Vector2(0, 0) },
//         iDate: { value: new Date() },
//       },
//     });
//   }
// }

// class BurnAway extends ShaderMaterial {
//   constructor() {
//     super({
//       vertexShader: '',
//       fragmentShader: `
//         void mainImage( out vec4 fragColor, in vec2 fragCoord )
//         {
//             vec2 uv = fragCoord/iResolution.xy;
        
//             vec3 col = vec3(0.);
            
//             vec3 fireshape = texture(iChannel0, uv).rrr;
//             vec3 background = vec3(0.);
//             vec3 material = texture(iChannel1, uv).rgb;
            
//             float time = fract(-iTime*.2);
//             vec3 erosion = smoothstep(time-.2, time, fireshape);
            
//             vec3 border = smoothstep(0., .7, erosion) - smoothstep(.5, 1., erosion);
            
//             col = (1.-erosion)*material + erosion*background;
        
//             vec3 lcol = vec3(1., .5, .1);
//             vec3 tcol = vec3(0.6, .8, 1.);
//             vec3 fire = mix(lcol, tcol, smoothstep(0.7, 1., border))*3.;
            
//             col += border*fire;
            
//             fragColor = vec4(col,1.0);
//         }`,
//       uniforms: {
//         iResolution: { value: new THREE.Vector2(1, 1) },
//         iTime: { value: 0 },
//         iChannel0: { value: null },
//         iChannel1: { value: null },
//         iMouse: { value: new THREE.Vector2(0, 0) },
//         iDate: { value: new Date() },
//       },
//     });
//   }
// }

// class Polaroid extends ShaderMaterial {
//   constructor() {
//     super({
//       vertexShader: '',
//       fragmentShader: `
//       #define grain
//       #define vignette
//       #define pseudoVintage
//       #define vignetteColor vec3(0.3)
//       #define vignetteBlur 0.1
//       #define vignetteRadius 0.03
      
      
//       float noise(vec2 co){
//           return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
//       }
      
//       void mainImage( out vec4 fragColor, in vec2 fragCoord )
//       {
//           // Normalized pixel coordinates (from 0 to 1)
//           vec2 uv = fragCoord/iResolution.xy;
      
//           // Time varying pixel color
//           float left = 0.2;
//           float right = 0.8;
//           float up = 0.95;
//           float down = 0.25;
//           vec2 blur = vec2(0.001,0.001);
          
//           vec3 col = vec3(smoothstep(left, left+blur.x,uv.x));
//           col *= vec3(1.0 - smoothstep(right-blur.x, right,uv.x));
//           col *= vec3( smoothstep(down, down + blur.y,uv.y));
//           col *= vec3(1.0 - smoothstep(up-blur.y, up,uv.y));
//           col = (1.0-col);
      
          
//           if (uv.x>left && uv.x < right && uv.y <up && uv.y > down) {
//               vec2 center = vec2((left + right)*0.5, (up+down)*0.5);
//               col = texture(iChannel0, vec2((uv.x- left)/(right-left), (uv.y - down)/(up - down))).xyz;
              
//               #ifdef vignette
//               float m = length(uv - vec2(center.x,center.y));
//               float d = distance(vec2(left, up), vec2(center.x,center.y)) - vignetteRadius;
//               col *= (1.0-smoothstep(d - vignetteBlur, d, m)*vignetteColor);
//               #endif
              
//               #ifdef grain 
//               col = mix(col,vec3(noise(uv)), 0.1);
//               #endif
//               #ifdef pseudoVintage
//               col = mix(col, texture(iChannel1, vec2((uv.x- left)/(right-left), (uv.y - down)/(up - down))).xyz,0.15);
//               #endif
              
             
//           }
//           else col = vec3(uv.x*uv.y+0.7);
//           // Output to screen
//           fragColor = vec4(col,1.0);
//       }`,
//       uniforms: {
//         iResolution: { value: new THREE.Vector2(1, 1) },
//         iTime: { value: 0 },
//         iChannel0: { value: null },
//         iChannel1: { value: null },
//         iMouse: { value: new THREE.Vector2(0, 0) },
//         iDate: { value: new Date() },
//       },
//     });
//   }
// }

// // ========================================================================== //
// // https://www.shadertoy.com/view/stByzd
// // ========================================================================== //
// class Antarctic extends ShaderMaterial {
//   constructor() {
//     super({
//       vertexShader: '',
//       fragmentShader: `
//       // CC0: Ice sheet height field experimentation
//       //  Was tinkering with using recursive voronoi patterns to
//       //  generate something that could pass for ice breaking up
//       //  into smaller blocks
//       #define RESOLUTION  iResolution
//       #define TIME        iTime
      
//       // License: Unknown, author: Unknown, found: don't remember
//       vec2 hash2(vec2 p) {
//         p = vec2(dot (p, vec2 (127.1, 311.7)), dot (p, vec2 (269.5, 183.3)));
//         return fract (sin (p)*43758.5453123);
//       }
      
//       // From: https://www.shadertoy.com/view/MsScWz
//       // Originally from: https://www.shadertoy.com/view/ldl3W8
//       vec3 voronoi(vec2 x) {
//         vec2 n = floor(x);
//         vec2 f = fract(x);
      
//         vec2 mr;
//         vec2 mp;
      
//         float md = 8.0;
//         for(int j=-1; j<=1; ++j)
//         for(int i=-1; i<=1; ++i) {
//           vec2 g = vec2(float(i),float(j));
//           vec2 o = hash2(n + g);
//           vec2 r = g + o - f;
//           float d = dot(r,r);
      
//           if(d<md) {
//             md = d;
//             mr = r;
//             mp = x+r;
//           }
//         }
      
//         md = 8.0;
//         for(int j=-1; j<=1; ++j)
//         for(int i=-1; i<=1; ++i) {
//           vec2 g = vec2(float(i),float(j));
//           vec2 o = hash2(n + g);
//           vec2 r = g + o - f;
      
//           if(dot(mr-r,mr-r)>0.0001) // skip the same cell
//             md = min(md, dot(0.5*(mr+r), normalize(r-mr)));
//         }
      
//         return vec3(md, mp);
//       }
      
//       float height(vec2 p) {
//         vec2 vp = p;
//         float vz = 1.0;
        
//         const float aa = 0.025;
      
//         float gh = 0.0;
//         float hh = 0.0;
      
//         const float hf = 0.025;
      
//         // Recursive voronois
//         {
//           vec3 c = voronoi(vp);
//           gh = tanh(max(abs(0.35*(c.y-2.0*sin(0.25*c.z)*cos(sqrt(0.1)*c.z)))-0.4, 0.));
//           hh = smoothstep(-aa, aa, c.x-2.0*aa*smoothstep(1.0, 0.75, gh));
//           if (gh > 0.75) {    
//             return hf*tanh(hh+1.0*(gh-0.75));
//           }
      
//           vz *= 0.5;
//           vp = vp * 2.0;
//         }
      
//         {
//           vec3 c = voronoi(vp);
//           hh = hh*smoothstep(-aa, aa, vz*c.x-3.0*aa*smoothstep(1.0, 0.5, gh));
//           if (gh > 0.5) {
//             return 0.75*hf*hh;
//           }
      
//           vz *= 0.5;
//           vp = vp * 2.0;
//         }
      
//         {
//           vec3 c = voronoi(vp);
//           hh = hh*smoothstep(-aa, aa, vz*c.x-2.0*aa*smoothstep(0.9, 0.25, gh));
//           if (gh > 0.25) {
//             return 0.5*hf*hh;
//           }
      
//           vz *= 0.5;
//           vp = vp * 2.0;
//         }
        
//         return 0.0;
//       }
      
//       vec3 normal(vec2 p) {
//         vec2 v;
//         vec2 w;
//         vec2 e = vec2(4.0/RESOLUTION.y, 0);
        
//         vec3 n;
//         n.x = height(p + e.xy) - height(p - e.xy);
//         n.y = 2.0*e.x;
//         n.z = height(p + e.yx) - height(p - e.yx);
        
//         return normalize(n);
//       }
      
//       void mainImage(out vec4 fragColor, in vec2 fragCoord) {
//         vec2 q = fragCoord/RESOLUTION.xy;
//         vec2 p = -1. + 2. * q;
//         p.x *= RESOLUTION.x/RESOLUTION.y;
//         float aa = 2.0/RESOLUTION.y;
        
//         float z = mix(0.2, 0.5, smoothstep(-0.5, 0.5, sin(0.5*TIME)));
      
//         vec2 ip = p;
//         ip /= z;
//         ip.y += 0.5*TIME;
//         float h = height(ip);
//         vec3 n  = normal(ip);
       
//         vec3 ro = vec3(0.0, -1.0, 0.0);
//         vec3 lp = vec3(1.0, -0.95, 1.5);
//         vec3 pp = vec3(p.x, h, p.y);;
//         vec3 rd = normalize(ro-pp);
//         vec3 ld = normalize(pp-lp);
//         vec3 ref= reflect(rd, n);
        
//         float dif = max(dot(n, ld), 0.0)*tanh(200.0*h);
//         float spe = pow(max(dot(ref, ld), 0.0), 10.0);
       
//         vec3 col = vec3(0.);
//         col += dif;
//         col += spe;
        
        
//         fragColor = vec4(col, 1.0);
//       }
      
      
//         `,
//       uniforms: {
//         iResolution: { value: new THREE.Vector2(1, 1) },
//         iTime: { value: 0 },
//         iChannel0: { value: null },
//         iChannel1: { value: null },
//         iMouse: { value: new THREE.Vector2(0, 0) },
//         iDate: { value: new Date() },
//       },
//     });
//   }
// }

// // ========================================================================== //
// // https://www.shadertoy.com/view/7lByRt
// // ========================================================================== //
// class JoeRogan extends ShaderMaterial {
//   constructor() {
//     super({
//       vertexShader: '',
//       fragmentShader: `
//       float TAU = 2.0*3.14159256;

//         void mainImage( out vec4 fragColor, in vec2 fragCoord )
//         {
//             vec2 uv = fragCoord/iResolution.y;
//             vec2 center = vec2(.5*iResolution.x/iResolution.y, .5);
//             vec3 col = vec3(0);

//             float a = asin((uv.y-center.y)/distance(uv,center));
//             float circleSDF = length(uv-center) - .8+.7*sin(TAU*iTime+2048.*a);
//             col = mix(vec3(0), vec3(1), smoothstep(-.5,.5,circleSDF));
        
            
//             fragColor = vec4(col,1.0);
//         }`,
//       uniforms: {
//         iResolution: { value: new THREE.Vector2(1, 1) },
//         iTime: { value: 0 },
//         iChannel0: { value: null },
//         iChannel1: { value: null },
//         iMouse: { value: new THREE.Vector2(0, 0) },
//         iDate: { value: new Date() },
//       },
//     });
//   }
// }

// // ========================================================================== //
// // https://www.shaderoy.com/view/7tjyzV
// // ========================================================================== //
// class AbberantRefraction extends ShaderMaterial {
//   constructor() {
//     super({
//       vertexShader: '',
//       fragmentShader: `
//       float iter = 50.; // Change this to increase/decrease quality
//       float bias = 0.5; // 0 to 1; Shift position by point in spectrum
//       //float scale = 0.03;
//       //float angle = 0.25;
      
//       const float pi = 3.14159265;
      
//       vec3 bezcol(in float p){
//           float o = pow(p,2.)*(3.-2.*p);;
//           return vec3((1.-o)*(1.-o),(1.-o)*o*3.,o*o);
//       }
      
//       void mainImage( out vec4 fragColor, in vec2 fragCoord )
//       {
//           vec2 res = iResolution.xy;//------For my own use later. Not important.
          
//           // For ease-of-control. Comment out and uncomment identical variables
//           // above to set a fixed value.
//           float angle = iMouse.x/res.x;
//           float scale = iMouse.y/res.y/5.+0.03;
          
//           vec2 uv = fragCoord/res.xy;
//           vec2 offs;
//           vec3 col;
//           float count;
//           for (float i = 0.; i <= 1.; i += 1./iter) {
//               offs = vec2(uv.x+sin(angle*pi*2.)*scale*(res.y/res.x)*(i*2.-bias*2.),
//                           uv.y+cos(angle*pi*2.)*scale*(i*2.-bias*2.));        
//               col += texture(iChannel0,offs).rgb * bezcol(i);
//               count+=1.;
//           }
//           col /= count/2.8;
          
//           fragColor = vec4(col,1.0);
//       }`,
//       uniforms: {
//         iResolution: { value: new THREE.Vector2(1, 1) },
//         iTime: { value: 0 },
//         iChannel0: { value: null },
//         iChannel1: { value: null },
//         iMouse: { value: new THREE.Vector2(0, 0) },
//         iDate: { value: new Date() },
//       },
//     });
//   }
// }
// // ========================================================================== //
// // https://www.shadertoy.com/view/ftBcRK
// // ========================================================================== //
// class OldTV extends ShaderMaterial {
//   constructor() {
//     super({
//       vertexShader: '',
//       fragmentShader: `
//         float N24(vec2 uv){
//             return fract(cos(fract(iTime) * 0.6 * dot(uv, vec2(23.788952, 87.4554))) * 23654.78996625); 
//         }
//         void mainImage(out vec4 fragColor, in vec2 fragCoord)
//         {
//         vec2 uv = fragCoord/iResolution.xy;;
//         vec4 screen = texture(iChannel0, uv);
        
//         fragColor = N24(uv) + 0.25 * screen;
//         }
//       `,
//       uniforms: {
//         iResolution: { value: new THREE.Vector2(1, 1) },
//         iTime: { value: 0 },
//         iChannel0: { value: null },
//         iChannel1: { value: null },
//         iMouse: { value: new THREE.Vector2(0, 0) },
//         iDate: { value: new Date() },
//       },
//     });
//   }
// }

// // ========================================================================== //
// // https://www.shadertoy.com/view/st2yzG
// // ========================================================================== //
// class OceanNoise extends ShaderMaterial {
//   constructor() {
//     super({
//       vertexShader: '',
//       fragmentShader: `
//         /*

//     MIT License

//     Copyright (c) 2022 (shadertoy.com user codeisrad)

//     Permission is hereby granted, free of charge, to any person obtaining a copy
//     of this software and associated documentation files (the "Software"), to deal
//     in the Software without restriction, including without limitation the rights
//     to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to whom the Software is
//     furnished to do so, subject to the following conditions:

//     The above copyright notice and this permission notice shall be included in all
//     copies or substantial portions of the Software.

//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//     IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//     AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//     SOFTWARE.

// */


// // ----------------------------------------------------------------
// // functions relevant to this experiment
// // ----------------------------------------------------------------


// // wavy(uv, uvwarp, pz) - base gyroid-ish function
// // - uv: uv, scaled as desired
// // - uvwarp: influence of uv warping on the x & y axis
// // - pz: the base z component of the gyroid, since we're taking in a vec2 instead of a vec3

// float wavy(in vec2 uv, in vec2 uvwarp, in float pz) {
    
//     // create a vec3 to use with a usual 3d gyroid approach
//     vec3 p = vec3(uv, pz);

//     // "warp" the z coordinate around based on the uv x & y coordinates
//     // having different offsets (the first numbers: 17, 13) & multipliers helps keep things organic
//     // any other approach that warps p.z should be viable as well
//     p.z += sin(17.0 + uv.x * uvwarp.x);
//     p.z += sin(13.0 + uv.y * uvwarp.y);

    
//     // usual gyroid function, taking the abs() of it to create ridges
//     // other approaches could produce intersting results such as fract() or sin()/cos()
//     return abs(dot(sin(p), cos(p.yzx)));   
// }

// // wavyOctaves(uv, uvwarp, pz, octaves)
// // - uv, uvwarp, pz: see wavy()
// // - octaves: number of octaves, each octave scales the uvs by 2
// float wavyOctaves(in vec2 uv, in vec2 uvwarp, in float pz, in float octaves) {
//     float result = 0.0;
    
//     // base "frequency", what the uvs are scaled by 
//     float fq = 1.0;
    
//     // TODO: might be interesting to skip the first octave, as it is a bit over-bearing 
//     //       or it could be that the way of calculating infl below is incorrect
    
//     for(float o = 1.0; o <= octaves; o += 1.0) {
//         // the "influence" this octave has on the overall result
//         // TODO: really unsure if this is the best way to handle this
//         //       need to look at other fractal noise examples
//         //       was trying for an approach that bound the results between 0-1
//         float infl = 1.0 / (fq * 2.0);
        
//         // use wavy() with uvs scaled by fq, the output then scaled by infl
//         result += wavy(uv * fq, uvwarp, pz) * infl;
        
//         // shift the uvs around by an arbitrary amount (borrwing uvwarp here) to keep things organic
//         uv += uvwarp;
        
//         // by default, fq is doubled each iteration
//         fq *= 2.0;
//     }
    
//     return result;
// }


// // ----------------------------------------------------------------
// // preset values, including a few to play around with
// // ----------------------------------------------------------------


// // default scale of uvs
// #define UV_SCALE 2.0

// // time preset, change to slow/speed-up animation
// #define TIME (iTime * 0.5)

// // how many octaves to use for noise
// // note that due to the way later octaves fall off in influence, higher octaves might not be noticable
// #define OCTAVES 8.0

// // color schemes, inteded to be used as the first two parameters to mix(a, b, x)
// #define COLOR_CLOUDS vec3(0.2, 0.25, 0.35), vec3(0.9, 0.85, 0.8)
// #define COLOR_WB vec3(0.0), vec3(1.0)
// #define COLOR_BW vec3(1.0), vec3(0.0)
// #define COLOR_FIRE vec3(0.7, 0.1, 0.1), vec3(0.9, 0.8, 0.3)

// // various uvwarp presets, although more could be achieved by altering how wavy() distorts pz 
// #define UVWARP_EVEN vec2(1.1, 1.9)
// #define UVWARP_ODDITY vec2(7.2, 8.3)
// #define UVWARP_NONE vec2(0.0)

// // choose presets here, or define new ones or whatever. 
// #define COLOR COLOR_BW
// #define UVWARP UVWARP_EVEN


// // ----------------------------------------------------------------
// // main shader, example usage of wavyOctaves()
// // ----------------------------------------------------------------


// void mainImage( out vec4 fragColor, in vec2 fragCoord )
// {
//     // dividing by .y rather than .xy to preserve aspect ratio
//     vec2 uv = fragCoord/iResolution.y;
    
//     // result of wavyOctaves *should* be in range of [0,1]
//     float h = wavyOctaves(uv * UV_SCALE, UVWARP, TIME, OCTAVES);

//     // use h to blend between colors defined above
//     vec3 col = mix(COLOR, h);
    
//     fragColor = vec4(col, 1.0);
// }
//       `,
//       uniforms: {
//         iResolution: { value: new THREE.Vector2(1, 1) },
//         iTime: { value: 0 },
//         iChannel0: { value: null },
//         iChannel1: { value: null },
//         iMouse: { value: new THREE.Vector2(0, 0) },
//         iDate: { value: new Date() },
//       },
//     });
//   }
// }
// // ========================================================================== //
// // https://www.shadertoy.com/view/sljcDw
// // ========================================================================== //

// // ========================================================================== //
// // https://www.shadertoy.com/view/sljcDw
// // ========================================================================== //
// class GreyScale extends ShaderMaterial {
//   constructor() {
//     super({
//       vertexShader: '',
//       fragmentShader: `
//           // This code is run for each pixel
//           void mainImage( out vec4 fragColor, in vec2 fragCoord )
//           {
//               // Normalized pixel coordinates (from 0 to 1)
//               vec2 xy = fragCoord.xy / iResolution.xy;
//               // Return the color of the texture in iChannel0
//               vec4 texColor = texture(iChannel0, xy);
              
//                // Initialize the variables
//               vec4 black = vec4(0, 0, 0, 1);
              
//               vec4 black_grey = vec4(0.1, 0.1, 0.1, 1);
//               vec4 dark_grey = vec4(0.2, 0.2, 0.2, 1);
//               vec4 mid_dark_grey = vec4(0.3, 0.3, 0.3, 1);
//               vec4 dark_light_grey = vec4(0.4, 0.4, 0.4, 1);
//               vec4 grey = vec4(0.5, 0.5, 0.5, 1);
//               vec4 light_dark_grey = vec4(0.6, 0.6, 0.6, 1);
//               vec4 mid_light_grey = vec4(0.7, 0.7, 0.7, 1);
//               vec4 light_grey = vec4(0.8, 0.8, 0.8, 1);
//               vec4 white_grey = vec4(0.9, 0.9, 0.9, 1);
              
//               vec4 white = vec4(1, 1, 1, 1);
              
//               float average = (texColor.r + texColor.g + texColor.b)/3.0;
              
//               // Find which shade of grey the color is most similar to
//               if (average <= 0.1)
//               {
//                   texColor = black;
//               }
//               else if (average > 0.1 && average <= 0.2) 
//               {
//                   texColor = black_grey;
//               }
//               else if (average > 0.2 && average <= 0.3)
//               {
//                   texColor = dark_grey;
//               }
//               else if (average > 0.3 && average <= 0.4)
//               {
//                   texColor = mid_dark_grey;
//               }
//               else if (average > 0.4 && average <= 0.5)
//               {
//                   texColor = dark_light_grey;
//               }
//               else if (average > 0.5 && average <= 0.6)
//               {
//                   texColor = grey;
//               }
//               else if (average > 0.6 && average <= 0.7)
//               {
//                   texColor = light_dark_grey;
//               }
//               else if (average > 0.7 && average <= 0.8)
//               {
//                   texColor = mid_light_grey;
//               }
//               else if (average > 0.8 && average <= 0.9)
//               {
//                   texColor = light_grey;
//               }
//               else if (average > 0.9 && average <= 1.0) 
//               {
//                   texColor = white_grey;
//               }
//               else
//               {
//                   texColor = white;
//               }
          
//                 // set the pixel's color
//               fragColor = texColor;
//           }`,
//       uniforms: {
//         iResolution: { value: new THREE.Vector2(1, 1) },
//         iTime: { value: 0 },
//         iChannel0: { value: null },
//         iChannel1: { value: null },
//         iMouse: { value: new THREE.Vector2(0, 0) },
//         iDate: { value: new Date() },
//       },
//     });
//   }
// }

// // ========================================================================== //
// // https://www.shadertoy.com/view/ftjcDw
// // ========================================================================== //
// class CosineEffect extends ShaderMaterial {
//   constructor() {
//     super({
//       vertexShader: '',
//       fragmentShader: `
//         //for images
//         vec2 N22(vec2 uv){
//             vec3 a = fract(uv.xyx * vec3(123.34,234.34,345.65));
//             a += dot(a, a+34.45);
//             return fract(vec2(a.x*a.y, a.y*a.z));
//         }
        
//         void mainImage( out vec4 fragColor, in vec2 fragCoord )
//         {
//             // Normalized pixel coordinates (from 0 to 1)
//             vec2 uv = fragCoord/iResolution.xy;
        
//             // Time varying pixel color
//             vec2 rand = N22(uv);
//             vec3 col= vec3(rand.x);
//             col =vec3(texture(iChannel0, uv));
//             col = vec3(col.r * cos(iTime*col.r), col.g * cos(iTime*col.g), col.b * cos(iTime*col.b));
//             // Output to screen
//             fragColor = vec4(col,1.0);
//         }`,
//       uniforms: {
//         iResolution: { value: new THREE.Vector2(1, 1) },
//         iTime: { value: 0 },
//         iChannel0: { value: null },
//         iChannel1: { value: null },
//         iMouse: { value: new THREE.Vector2(0, 0) },
//         iDate: { value: new Date() },
//       },
//     });
//   }
// }
// // ========================================================================== //
// // https://www.shadertoy.com/view/7tSyW1
// // ========================================================================== //
// class SmokeNoise extends ShaderMaterial {
//   constructor() {
//     super({
//       vertexShader: '',
//       fragmentShader: `
         
// float random (vec2 st) {
//     return fract(sin(dot(st.xy, vec2(12.9898,78.233)))*43758.5453123);
// }

// mat2 rotate(float a)
// {
// 	float c = cos(a);
// 	float s = sin(a);
// 	return mat2(c, s, -s, c);
// }


// // Based on Morgan McGuire @morgan3d
// // https://www.shadertoy.com/view/4dS3Wd
// float noise (in vec2 _st) {
//     vec2 i = floor(_st);
//     vec2 f = fract(_st);

//     // Four corners in 2D of a tile
//     float a = random(i);
//     float b = random(i + vec2(1.0, 0.0));
//     float c = random(i + vec2(0.0, 1.0));
//     float d = random(i + vec2(1.0, 1.0));

//     vec2 u = f * f * (3.0 - 2.0 * f);

//     return mix(a, b, u.x) +
//             (c - a)* u.y * (1.0 - u.x) +
//             (d - b) * u.x * u.y;
// }

// float fbm ( in vec2 n) {
//     float total = 0.0;
//     float amplitude = 0.7;
//     mat2 rot = rotate(0.5);
//     for (int i = 0; i < 6; ++i) {
//         total += amplitude * noise(n);
//         n = rot *n * 2.0+300.;
//         amplitude *= 0.45;
//     }
//     return total;
// }
// void mainImage( out vec4 fragColor, in vec2 fragCoord ){
//     vec2 st =fragCoord.xy / iResolution.xy*3.;

//     vec3 color = vec3(0.0);

//     vec2 q = vec2(0.);
//     q.x = fbm( st + 0.01*iTime);
//     q.y = fbm( st + vec2(1.0));

//     vec2 r = vec2(0.);
//     r.x = fbm( st + 1.0*q + 0.15*iTime );
//     r.y = fbm( st + 1.0*q + 0.1*iTime);

//     float f = fbm(st +r);

//     color = mix(vec3(0.3,0.5,0.6),
//                 vec3(0.3,0.3,0.4),
//                 clamp((f*f)*2.0,.0,.5));


//     color = mix(color,
//                 vec3(0.3589,0.369,0.3875),
//                 clamp(length(r.x)*10.,0.0,.80));

//     fragColor = vec4((f*f*f+.9*f*f+0.5*f)*color,.5);
// }
// `,
//       uniforms: {
//         iResolution: { value: new THREE.Vector2(1, 1) },
//         iTime: { value: 0 },
//         iChannel0: { value: null },
//         iChannel1: { value: null },
//         iMouse: { value: new THREE.Vector2(0, 0) },
//         iDate: { value: new Date() },
//       },
//     });
//   }
// }
// // ========================================================================== //
// // https://www.shadertoy.com/view/sldXRn
// // ========================================================================== //
// class BubbleGlow extends ShaderMaterial {
//   constructor() {
//     super({
//       vertexShader: '',
//       fragmentShader: `
//           // ---------- SHADERTOY_PARAMS ---------------

//           // Device parameters, don't change
          
//           #define vTime iTime
//           #define vScreenSize iResolution.xy
//           #define gl_FragCoord fragCoord
//           #define gl_FragColor fragColor
          
//           // External input
          
//           #define vLow 1.0
//           #define vHigh 0.0
//           #define vMid 0.0
//           #define vReaction 0.0
//           #define vReactionScale 1.2
//           #define vReactionPoint vec2(0.0, 0.0)
//           #define vReactionColor vec3(1.0, 1.0, 1.0)
          
//           #define maxTempo 174.
//           #define bpm(tempo) tempo / maxTempo
//           // vBpm = tempo / maxTempo (max of the song list)
          
//           // Smells like teen spirit
//           //#define vBpm bpm(118.)
//           //#define vEnergy 0.9311161
//           //#define vHue 1.4554095
          
//           // Concerto No. 4 in F minor (L'inverno/ Winter) RV297 (Op. 8 No. 4): I. Allegro non molto
//           //#define vBpm bpm(150.)
//           //#define vEnergy 0.18128955
//           //#define vHue 0.40760547
          
//           // El Problema
//           #define vBpm bpm(107.)
//           #define vEnergy 0.68646336
//           #define vHue 1.4554095
          
//           vec3 hsl2rgb(vec3 c) {
//               return c.z + c.y * (c.z + c.y * ((c.z + c.y * (clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 )-0.5)*(1.0-abs(2.0*c.z-1.0)))-0.5)*(1.0-abs(2.0*c.z-1.0))-0.5)*(1.0-abs(2.0*c.z-1.0));
//           }
//           #define vColorBottom hsl2rgb(vec3(vHue, 1.0, 0.5))
//           #define vColorTop hsl2rgb(vec3(vHue + 0.1, 1.0, 0.5))
          
//           #define vBackgroundColor vec3(00. / 255.)
          
//           // ---------------- ANIMATION -----------------
          
//           // Animation parameters
          
//           #define YZ_ROTATION_MULTIPLIER 1.0
//           #define XZ_ROTATION_MULTIPLIER 0.7
//           #define XY_ROTATION_MULTIPLIER 0.5
          
//           #define WAVE_MOVEMENT_MULTIPLIER 1.5
          
//           #define SCENE_SCALE 0.6
//           #define SCENE_ROTATION 3.1451 * 1.75
          
//           #define HEAD_INTENSITY 0.15 * vHigh
//           #define TAIL_INTENSITY 3.0 + 1.0 * vLow
          
//           #define COLOR_MULTIPLIER 7.0
          
//           #define PASS_COUNT 4 // Performance impact
//           #define DISTANCE 3.5
          
//           #define Y_FREQUENCY 1.2
//           #define X_FREQUENCY 1.2
//           #define Z_FREQUENCY 1.2
          
//           #define MIN_FREQUENCY 0.5
//           #define FREQUENCY_MID_MULTIPLIER 0.5
//           #define FREQUENCY_REACTION_MULTIPLIER 1.5
          
//           #define SCALE_REACTION_MULTIPLIER 1.5
          
//           #define REACTION_POINT_SIZE 0.2
          
//           // Helpers
          
//           mat2 mRotate(float angle) {
//               float c = cos(angle);
//               float s = sin(angle);
//               return mat2(c, -s,
//                           s, c);
//           }
          
//           // Shader code
          
//           float waves(vec3 point, float freq) {
//               // Rotate point
//               point.yz *= mRotate(vTime * YZ_ROTATION_MULTIPLIER);
//               point.xz *= mRotate(vTime * XZ_ROTATION_MULTIPLIER);
//               point.xy *= mRotate(vTime * XY_ROTATION_MULTIPLIER);
          
//               // Calculate waves
//               vec3 q = point * (1.0 + vBpm) + vTime * WAVE_MOVEMENT_MULTIPLIER;
//               float centeredCircle = length(point);
//               float centerCut = log(length(point) - 1.0);
//               float waves = freq * sin(X_FREQUENCY * q.x - sin(Y_FREQUENCY * q.y + sin(q.z * Z_FREQUENCY))) - 1.0;
//               return centeredCircle * centerCut + waves;
//           }
          
//           void mainImage( out vec4 fragColor, in vec2 fragCoord ){
//               // Normalize to [0; 1]
//               vec2 uvTrue = gl_FragCoord.xy / vScreenSize;
          
//               // Normalize to [-1; 1]
//               vec2 uv = -1.0 + 2.0 * uvTrue;
          
//               // Make symmetric
//               float minSide = min(vScreenSize.x, vScreenSize.y);
//               vec2 minSquare = vec2(minSide, minSide);
//               vec2 aspectSides = vScreenSize / minSide;
//               uv *= aspectSides;
          
//               // Define reaction point
//               vec2 reactPoint = vReactionPoint * aspectSides;
//               float reactIntensity = clamp(length(uv - reactPoint) / 2.0 / REACTION_POINT_SIZE,
//                                            0.,
//                                            1.);
          
//               // Define frequency
//               float freq = MIN_FREQUENCY + vMid * FREQUENCY_MID_MULTIPLIER;
//               freq = mix(freq + vReaction * FREQUENCY_REACTION_MULTIPLIER,
//                          freq,
//                          reactIntensity);
          
//               // Rotate around origin
//               uv *= mRotate(SCENE_ROTATION);
          
//               // Scale around origin
//               uv *= 1.0 / SCENE_SCALE;
          
//               // Apply reaction scale
//               uv /= vReactionScale;
          
//               // Calculate color intensity
//               float opacity = 0.0;
//               float d = DISTANCE;
//               for(int i = 0; i < PASS_COUNT; i++) {
//                   vec3 p = vec3(0, 0, 5.) + vec3(uv, -1.0) * d;
//                   float result = waves(p, freq);
//                   float f = result - waves(p + 0.03, freq);
//                   float l = f * (COLOR_MULTIPLIER + vReaction * 2.0);
//                   opacity = opacity * l + smoothstep(TAIL_INTENSITY, 1.0, result) * l;
//                   d += min(result, 1.0);
//               }
          
//               // Mix top and bottom colors
//               vec3 gradColor = mix(vColorBottom, vColorTop, uvTrue.y);
          
//               // Mix with reaction color if needed
//               vec3 reactedColor = mix(gradColor, vReactionColor, vReaction * (1. - reactIntensity));
          
//               // Mix with background color
//               vec3 color = mix(vBackgroundColor, reactedColor, clamp(opacity, 0.0, 1.0));
          
//               // Set the result
//               gl_FragColor = vec4(color, 1.0);
//           }`,
//       uniforms: {
//         iResolution: { value: new THREE.Vector2(1, 1) },
//         iTime: { value: 0 },
//         iChannel0: { value: null },
//         iChannel1: { value: null },
//         iMouse: { value: new THREE.Vector2(0, 0) },
//         iDate: { value: new Date() },
//       },
//     });
//   }
// }
// // ========================================================================== //
// // https://www.shadertoy.com/view/NtjcWw
// // ========================================================================== //
// class FireNoise extends ShaderMaterial {
//   constructor() {
//     super({
//       vertexShader: '',
//       fragmentShader: `
//           #define PI 3.14159265359
//           #define Amplitude 0.21
//           #define Wavelength 4.0
//           #define Speed 0.31
//           #define Warm_c vec3(1.0,0.21,0.07)
//           #define Hot_c vec3(0.9,1.0,0.1)
          
//           float random (vec2 uv) 
//           {
//               return fract(sin(dot(uv.xy,vec2(12.9898,78.233)))*43758.5453123);
//           }
          
//           void mainImage( out vec4 fragColor, in vec2 fragCoord )
//           {
//               vec2 uv = fragCoord.xy / iResolution.xy,
//                     ps = 1. / iResolution.xy;
                        
//               uv.xy += vec2(-0.5, 0.3);
//               uv.x *= 5.;
              
                  
//               float K = 14. * PI / Wavelength;
//               uv.x += cos(uv.y + iTime + abs(random(uv) * 0.09)) * 0.6;
              
//               uv.x -=  Amplitude                         * sin(K * (uv.y  - Speed * (iTime * 4.1)));
//               uv.y += (Amplitude   *(random(uv) * 0.6))  * cos(K * (uv.x  + Speed * (iTime * 8.1)));
//               uv.x -= (Amplitude*2.*(random(uv) * 0.7))  * sin(K * (uv.y  - Speed * (iTime * 2.1)));
//               uv.x *= uv.y;   
              
//               float d = 0.0;                
//               d = length(abs(uv)-.5);
//               float corner = 1. - floor(d * 7.) * d;
//               d = fract(d * 7.);
              
//               vec3 color = mix(Warm_c,Hot_c,corner);
              
//               fragColor =  vec4(color + corner , 1);
//           }`,
//       uniforms: {
//         iResolution: { value: new THREE.Vector2(1, 1) },
//         iTime: { value: 0 },
//         iChannel0: { value: null },
//         iChannel1: { value: null },
//         iMouse: { value: new THREE.Vector2(0, 0) },
//         iDate: { value: new Date() },
//       },
//     });
//   }
// }
// // ========================================================================== //
// // https://www.shadertoy.com/view/stjcDw
// // ========================================================================== //
// class FogExplosionNoise extends ShaderMaterial {
//   constructor() {
//     super({
//       vertexShader: '',
//       fragmentShader: `

//           float hash(float n)
//           {
//               return fract(sin(n)*33587.6369);
//           }
          
//           float noise(in vec3 x)
//           {
//               vec3 p = floor(x);
//               vec3 f = fract(x);
          
//               f = f * f * (3.0 - 2.0 * f);
           
//               float n = p.x + p.y * 57.0 + 113.0 * p.z;
          
//               float res = mix(mix(mix( hash(n+  0.0), hash(n+  1.0),f.x),
//                                   mix( hash(n+ 57.0), hash(n+ 58.0),f.x),f.y),
//                               mix(mix( hash(n+113.0), hash(n+114.0),f.x),
//                                   mix( hash(n+170.0), hash(n+171.0),f.x),f.y),f.z);
//               return res;
//           }
          
//           float fbm( vec3 p )
//           {
//               float f;
//               f  = 0.5000*noise( p ); p = p*2.02;
//               f += 0.2500*noise( p ); p = p*2.03;
//               f += 0.1250*noise( p );
//               return f;
//           }
          
//           float  fog(vec3 p)
//           {
//               float d = (2.65 - length(p)) / 2.65;
//               float noise_scaled = fbm(1.2 * (p + vec3(0.0, 0.0, iTime*.8)));
//               return clamp(noise_scaled * 2. * d, 0.0, 1.0);
//           }
          
//           vec3 fog_colors(vec3 p)
//           {
//               float depth = 0.0;
//               vec3 light_pos = vec3(20.0, 10., 10.0);
//               vec3 light_dir = normalize(light_pos - p);
//               vec3 lightColor =vec3(0.96, 0.6, .24);
//               vec3 absColor = vec3(0.00696, 0.002856, 0.003024)*cos(iTime);
//               vec3 volumeColor = 0.045 * vec3(.9, 0.75, 0.3);
//               float k = 0.0;
//               float rd = 0.25;
              
//               for(int i = 0; i< 10; i++)
//               {
//                   vec3 sp = p + k * light_dir;
//                   float d = fog(sp);
//                   depth+= d;
//                   k+= rd;
//               }
              
//              vec3 color = lightColor * volumeColor - depth * absColor;
//               return clamp(color, 0., 1.);
//           }
          
          
//           void mainImage( out vec4 fragColor, in vec2 fragCoord )
//           {
              
//               vec2 uv = ( fragCoord.xy / iResolution.xy ) * 2.0 - 1.0;
//               uv.x *= iResolution.x / iResolution.y;
          
//               vec3 pos = vec3( 0.,0.,-3.);
//               vec3 dir = normalize( vec3( uv, 1. ) );
//               vec3 p;
//               float t = 0.0;
//               float depth = 0.0;
//               vec3 col =  vec3(0.165, 0.275, 0.385);
//               float rd =0.125;
//               for(int i = 0; i < 21; i++)
//               {
//                   p = pos + dir * t;
//                   float d = fog(p);
//                   depth += d;
//                   vec3 c = fog_colors(p);
//                   col += depth * c;
//                   t += rd;
//               }
              
//               fragColor = vec4(col, 1.0);
          
//           }`,
//       uniforms: {
//         iResolution: { value: new THREE.Vector2(1, 1) },
//         iTime: { value: 0 },
//         iChannel0: { value: null },
//         iChannel1: { value: null },
//         iMouse: { value: new THREE.Vector2(0, 0) },
//         iDate: { value: new Date() },
//       },
//     });
//   }
// }

// // ========================================================================== //
// // https://www.shadertoy.com/view/wsdfDn
// // ========================================================================== //
// class Wack extends ShaderMaterial {
//   constructor() {
//     super({
//       vertexShader: '',
//       fragmentShader: `
          
// void mainImage( out vec4 fragColor, in vec2 fragCoord )
// {
//     vec2 p = vec2(fragCoord.xy / iResolution.xy);
//     vec2 uv = fragCoord-vec2(iResolution.xy/2.0);
//     uv = 2.0*uv/iResolution.y;
//    	float magnitude = length(uv);


//     uv = uv/(1.0+length(uv));
//     float pixel;
//     if (mod(fragCoord.x,2.0)<1.0){
//         uv.x = uv.x+(0.1*sin(uv.y*10.0))*sin(iTime);
//     	pixel = sign((mod(uv.y+iTime*0.04,0.2)-0.1))*sign((mod(uv.x+(iTime*0.12),0.2)-0.1));
//     }else{
//         uv.x = uv.x+(-0.1*sin(uv.y*10.0))*sin(iTime);
// 		pixel = sign((mod(uv.y+iTime*-0.05,0.2)-0.1))*sign((mod(uv.x+(iTime*-0.2),0.2)-0.1));

//     }
//     fragColor = vec4(0.4,0.2,0.5,1.0);
//     if (pixel == 1.0){
//     	fragColor=vec4(0.0,0.5,0.5,1.0);
//         //fragColor = vec4(texture(iChannel1,p).xyz,1.0);
//     }
//     //vec3 color = texture(iChannel1,p).xyz;
//     //fragColor = vec4(texture(iChannel1,p).xyz,1.0);
// }
// `,
//       uniforms: {
//         iResolution: { value: new THREE.Vector2(1, 1) },
//         iTime: { value: 0 },
//         iChannel0: { value: null },
//         iChannel1: { value: null },
//         iMouse: { value: new THREE.Vector2(0, 0) },
//         iDate: { value: new Date() },
//       },
//     });
//   }
// }

// // ========================================================================== //
// // https://www.shadertoy.com/view/stByzG
// // ========================================================================== //
// class PlasmaNoise extends ShaderMaterial {
//   constructor() {
//     super({
//       vertexShader: '',
//       fragmentShader: `
//           uniform float   iScrollY;
//           vec4 color_bg = vec4(0.95);
//           vec4 color_foreground = vec4(0.85,0.95, 0.95, 0.95);
      
//           vec3 palette(float pos, float time)
//           {
//             return vec3(cos(6.2*pos),cos(6.2*pos),cos(6.2*pos));
//           }
          
//           void mainImage( out vec4 fragColor, in vec2 fragCoord )
//           {
      
//             //ignore aspect ratio
//             vec2 uv = fragCoord.xy / iResolution.xy;
      
//             float time = iTime/2.0;  
//             vec2 p = (fragCoord.xy +  vec2(0.0, iScrollY)) / iResolution.xy ;
            
//             // zoom to a good looking spot
            
//             //if uv aspet ratio is horizontal 
//             if(iResolution.x > iResolution.y)
//             {
//               p.x *= 0.25;
//               p.y *= 0.2;
      
//             }else{
//               p.x *= 0.05;
//               p.y *= 0.25;
//             }
      
//             // start the plasma magic!
//             float part1 = sin(p.x*(90.0+21.0*cos(p.y*0.0))+time);
//             float part2 = cos(p.y*(32.0+11.0*sin(p.x*57.0))+time);
//             float part3 = sin(p.x*(55.0 + 21.0*sin(p.y*32.0))+ time);
      
//             float plas = 0.5 + 0.65*part1*part2 + 1.35*part3*part2;
      
            
            
//             fragColor = vec4(palette(plas, time),1.0);        
//             fragColor = vec4(fragColor.x +1.9,fragColor.y +3.0,fragColor.z +3.0,1.0);
//             //if fragColor is white use bgcolor
//             if(fragColor.x > 0.99 && fragColor.y > 0.99 && fragColor.z > 0.99)
//             {
//               fragColor = color_bg;
//             }
//             else{
//               fragColor = color_foreground;
//             }
//            }`,
//       uniforms: {
//         iResolution: { value: new THREE.Vector2(1, 1) },
//         iTime: { value: 0 },
//         iChannel0: { value: null },
//         iChannel1: { value: null },
//         iMouse: { value: new THREE.Vector2(0, 0) },
//         iDate: { value: new Date() },
//       },
//     });
//   }
// }

// class Glitch extends ShaderMaterial {
//   constructor() {
//     super({
//       vertexShader: `
//         varying vec2 vUv;
//         void main() {
//             vUv = uv;
//             gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
//         }
//         `,
//       fragmentShader: `
//         uniform int byp;
//         uniform sampler2D tDiffuse;
//         uniform sampler2D tDisp;
//         uniform float amount;
//         uniform float angle;
//         uniform float seed;
//         uniform float seed_x;
//         uniform float seed_y;
//         uniform float distortion_x;
//         uniform float distortion_y;
//         uniform float col_s;
//         varying vec2 vUv;
        
//         float rand(vec2 co){
//             return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
//         }

//         void main() {
//             if(byp<1) {
//             vec2 p = vUv;
//             float xs = floor(gl_FragCoord.x / 0.5);
//             float ys = floor(gl_FragCoord.y / 0.5);
//             vec4 normal = texture2D (tDisp, p*seed*seed);
//             if(p.y<distortion_x+col_s && p.y>distortion_x-col_s*seed) {
//                 if(seed_x>0.){
//                 p.y = 1. - (p.y + distortion_y);
//             }
//             else {
//                 p.y = distortion_y;
//             }
//             }
//             if(p.x<distortion_y+col_s && p.x>distortion_y-col_s*seed) {
//                 if(seed_y>0.){
//                 p.x=distortion_x;
//             }
//             else {
//                 p.x = 1. - (p.x + distortion_x);
//             }
//         }
//             p.x+=normal.x*seed_x*(seed/5.);
//             p.y+=normal.y*seed_y*(seed/5.);
//             vec2 offset = amount * vec2( cos(angle), sin(angle));
//             vec4 cr = texture2D(tDiffuse, p + offset);
//             vec4 cga = texture2D(tDiffuse, p);
//             vec4 cb = texture2D(tDiffuse, p - offset);
//             gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);
//             vec4 snow = 200.*amount*vec4(rand(vec2(xs * seed,ys * seed*50.))*0.2);
//             gl_FragColor = gl_FragColor+ snow;
//         }
//         else {
//             gl_FragColor=texture2D (tDiffuse, vUv);
//         }
//         }
//         `,
//       uniforms: {
//         tDiffuse: { type: 't', value: null },
//         tDisp: { type: 't', value: null },
//         byp: { type: 'i', value: 0 },
//         amount: { type: 'f', value: 0.08 },
//         angle: { type: 'f', value: 0.02 },
//         seed: { type: 'f', value: 0.02 },
//         seed_x: { type: 'f', value: 0.02 },
//         seed_y: { type: 'f', value: 0.02 },
//         distortion_x: { type: 'f', value: 0.5 },
//         distortion_y: { type: 'f', value: 0.6 },
//         col_s: { type: 'f', value: 0.05 },
//       },
//     });
//   }

//   set diffuse(value) {
//     this.uniforms.diffuse = value;
//   }

//   get diffuse() {
//     return this.uniforms.diffuse;
//   }

//   set amount(value) {
//     this.uniforms.amount = value;
//   }

//   get amount() {
//     return this.uniforms.amount;
//   }

//   set angle(value) {
//     this.uniforms.angle = value;
//   }

//   get angle() {
//     return this.uniforms.angle;
//   }

//   set seed(value) {
//     this.uniforms.seed = value;
//   }

//   get seed() {
//     return this.uniforms.seed;
//   }

//   set seed_x(value) {
//     this.uniforms.seed_x = value;
//   }

//   get seed_x() {
//     return this.uniforms.seed_x;
//   }

//   set seed_y(value) {
//     this.uniforms.seed_y = value;
//   }

//   get seed_y() {
//     return this.uniforms.seed_y;
//   }

//   set distortion_x(value) {
//     this.uniforms.distortion_x = value;
//   }

//   get distortion_x() {
//     return this.uniforms.distortion_x;
//   }

//   set distortion_y(value) {
//     this.uniforms.distortion_y = value;
//   }

//   get distortion_y() {
//     return this.uniforms.distortion_y;
//   }

//   set col_s(value) {
//     this.uniforms.col_s = value;
//   }

//   get col_s() {
//     return this.uniforms.col_s;
//   }
// }
// // https://www.shadertoy.com/view/stjcRt
// class PixelSort extends ShaderMaterial {
//   constructor() {
//     super({
//       vertexShader: '',
//       fragmentShader: `
//         #define sepsize 2.0
//         #define seplight 0.6
//         #define sepanim 0.01
        
//         // taken from Simple Water Caustic Pattern : https://www.shadertoy.com/view/3d3yRj
//         // 3D simplex noise adapted from https://www.shadertoy.com/view/Ws23RD 
//         vec4 mod289(vec4 x)
//         {
//             return x - floor(x / 289.0) * 289.0;
//         }
        
//         vec4 permute(vec4 x)
//         {
//             return mod289((x * 34.0 + 1.0) * x);
//         }
        
//         vec4 snoise(vec3 v)
//         {
//             const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
        
//             // First corner
//             vec3 i  = floor(v + dot(v, vec3(C.y)));
//             vec3 x0 = v   - i + dot(i, vec3(C.x));
        
//             // Other corners
//             vec3 g = step(x0.yzx, x0.xyz);
//             vec3 l = 1.0 - g;
//             vec3 i1 = min(g.xyz, l.zxy);
//             vec3 i2 = max(g.xyz, l.zxy);
        
//             vec3 x1 = x0 - i1 + C.x;
//             vec3 x2 = x0 - i2 + C.y;
//             vec3 x3 = x0 - 0.5;
        
//             // Permutations
//             vec4 p =
//               permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0))
//                                     + i.y + vec4(0.0, i1.y, i2.y, 1.0))
//                                     + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        
//             // Gradients: 7x7 points over a square, mapped onto an octahedron.
//             // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
//             vec4 j = p - 49.0 * floor(p / 49.0);  // mod(p,7*7)
        
//             vec4 x_ = floor(j / 7.0);
//             vec4 y_ = floor(j - 7.0 * x_);
        
//             vec4 x = (x_ * 2.0 + 0.5) / 7.0 - 1.0;
//             vec4 y = (y_ * 2.0 + 0.5) / 7.0 - 1.0;
        
//             vec4 h = 1.0 - abs(x) - abs(y);
        
//             vec4 b0 = vec4(x.xy, y.xy);
//             vec4 b1 = vec4(x.zw, y.zw);
        
//             vec4 s0 = floor(b0) * 2.0 + 1.0;
//             vec4 s1 = floor(b1) * 2.0 + 1.0;
//             vec4 sh = -step(h, vec4(0.0));
        
//             vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
//             vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
        
//             vec3 g0 = vec3(a0.xy, h.x);
//             vec3 g1 = vec3(a0.zw, h.y);
//             vec3 g2 = vec3(a1.xy, h.z);
//             vec3 g3 = vec3(a1.zw, h.w);
        
//             // Compute noise and gradient at P
//             vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
//             vec4 m2 = m * m;
//             vec4 m3 = m2 * m;
//             vec4 m4 = m2 * m2;
//             vec3 grad =
//               -6.0 * m3.x * x0 * dot(x0, g0) + m4.x * g0 +
//               -6.0 * m3.y * x1 * dot(x1, g1) + m4.y * g1 +
//               -6.0 * m3.z * x2 * dot(x2, g2) + m4.z * g2 +
//               -6.0 * m3.w * x3 * dot(x3, g3) + m4.w * g3;
//             vec4 px = vec4(dot(x0, g0), dot(x1, g1), dot(x2, g2), dot(x3, g3));
//             return 42.0 * vec4(grad, dot(m4, px));
//         } 
  
//         vec4 cloud(vec3 v, int oct)
//         {
//             vec4 outp = vec4(0.0);
//             for (int i = 1; i < 64; i++)
//             {
//                 if(i >= oct+1) {break;}
//                 outp += snoise(vec3(-143*i,842*i,0)+v*vec3(1.,1.,pow(float(i),sepanim))*pow(float(i),sepsize))*(1.0/pow(float(i),seplight));
//             }
//             return outp;
//         }
//         float micro(vec3 v, int oct)
//         {
//             return smoothstep(.0,0.8,dot(normalize(cloud(v,oct).xyz),vec3(normalize(cloud(v,2).xy),0.)));
//         }
        
//         void mainImage( out vec4 fragColor, in vec2 fragCoord )
//         {
//             vec2 uv = (1. * fragCoord.xy - iResolution.xy) / iResolution.y;
        
//             // Output to screen
//             fragColor = vec4(1.-micro(vec3(uv,iTime*.1),24));
//         }`,
//       uniforms: {
//         iResolution: { value: new THREE.Vector2(1, 1) },
//         iTime: { value: 0 },
//         iChannel0: { value: null },
//         iChannel1: { value: null },
//         iMouse: { value: new THREE.Vector2(0, 0) },
//         iDate: { value: new Date() },
//       },
//     });
//   }
// }

// // eslint-disable-next-line import/prefer-default-export
// extend({
//   WarpMaterial,
//   RGBShiftMaterial,
//   Glitch,
//   AbberantRefraction,
//   Antarctic,
//   BubbleGlow,
//   BurnAway,
//   CosineEffect,
//   FireNoise,
//   JoeRogan,
//   OldTV,
//   OceanNoise,
//   PixelSort,
//   SmokeNoise,
//   FogExplosionNoise,
//   PlasmaNoise,
//   Polaroid,
//   Water,
//   Wack,
// });
// export {
//   WarpMaterial,
//   RGBShiftMaterial,
//   Glitch,
//   AbberantRefraction,
//   Antarctic,
//   BubbleGlow,
//   BurnAway,
//   CosineEffect,
//   FireNoise,
//   JoeRogan,
//   OldTV,
//   OceanNoise,
//   PixelSort,
//   SmokeNoise,
//   FogExplosionNoise,
//   PlasmaNoise,
//   Polaroid,
//   Water,
//   Wack,
// };
