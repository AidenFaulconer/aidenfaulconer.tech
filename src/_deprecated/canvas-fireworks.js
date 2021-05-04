// import React, { useState, useEffect, useRef } from "react";
// import styled from "@emotion/styled";

// export class Fireworks {
//     constructor(canvasRef) {
//         // if (typeof window !== "undefined") {
//         self = this;
//             window.addEventListener("resize", this.resizeCanvas, false);
//             // window.addEventListener("load", this.onLoad, false);

//             window.requestAnimationFrame =
//                 window.requestAnimationFrame       ||
//                 window.webkitRequestAnimationFrame ||
//                 window.mozRequestAnimationFrame    ||
//                 window.oRequestAnimationFrame      ||
//                 window.msRequestAnimationFrame     ||
//                 function (callback) {
//                     window.setTimeout(callback, 1000/60);
//                 };
//             //initialize values
//             this.ctx;
//             this.w;
//             this.h;
//             this.particles = [];
//             this.probability = 0.04;
//             this.xPoint;
//             this.yPoint;
//             this.canvas = canvasRef;

//             // this.onLoad.bind(this);
//             // this.resizeCanvas.bind(this);
//             // this.updateWorld.bind(this);
//             // this.update.bind(this);
//             // this.paint.bind(this);
//             // this.createFirework.bind(this);
//             // this.dispose.bind(this);

//             self.onLoad();
//         // }
//         // else return null
//     }

//     self;
//     //public values

//     onLoad() {
//         self.ctx = self.canvas.getContext("2d");
//         self.resizeCanvas();
//         requestAnimationFrame(self.updateWorld);
//     };

//     resizeCanvas() {
//         if (!!self.canvas) {
//             self.w = self.canvas.width = window.innerWidth;
//             self.h = self.canvas.height = window.innerHeight;
//         }
//     };

//     updateWorld() {
//         alert("update world")
//         alert(self.update);
//         self.update();
//         self.paint();
//         requestAnimationFrame(self.updateWorld);
//     };

//     update() {
//         if (self.particles.length < 500 && Math.random() < self.probability) {
//             self.createFirework();
//         }
//         let alive = [];
//         for (let i=0; i<self.particles.length; i++) {
//             if (self.particles[i].move()) {
//                 alive.push(self.particles[i]);
//             }
//         }
//         self.particles = alive;
//     };

//     paint() {
//         self.ctx.globalCompositeOperation = 'source-over';
//         self.ctx.fillStyle = "rgba(12,255,255,0.0)";
//         self.ctx.fillRect(0, 0, w, h);
//         self.ctx.globalCompositeOperation = 'lighter';
//         for (var i=0; i<self.particles.length; i++) {
//             self.particles[i].draw(self.ctx);
//         }
//     };

//     createFirework() {
//         self.xPoint = Math.random()*(w-200)+100;
//         self.yPoint = Math.random()*(h-200)+100;
//         let nFire = Math.random()*50+100;
//         let c = "rgb("+(~~(Math.random()*200+55))+","
//                 +(~~(Math.random()*200+55))+","+(~~(Math.random()*200+55))+")";
//         for (var i=0; i<nFire; i++) {
//             let particle = new Particle();
//             particle.color = c;
//             let vy = Math.sqrt(25-particle.vx*particle.vx);
//             if (Math.abs(particle.vy) > vy) {
//                 particle.vy = particle.vy>0 ? vy: -vy;
//             }
//             self.particles.push(particle);
//         }
//     };

//     dispose() {
//         self.canvas.domElement.removeEventListener( 'resize', self.resizeCanvas, false );
//         self.canvas.domElement.removeEventListener( 'DOMContentLoaded', self.onLoad, false );

//         //continously remove 0 element until list empty (accounts for mulitple instances of fireworks)
//         let els = document.getElementsByClassName("fireworks");
//         while (els.length > 0) els[0].parentNode.removeChild(els[0])
//     };
// }

// export class Particle {
//     constructor(){
//         this.w = this.h = Math.random()*4+1;

//         this.x = xPoint-this.w/2;
//         this.y = yPoint-this.h/2;

//         this.vx = (Math.random()-0.5)*10;
//         this.vy = (Math.random()-0.5)*10;

//         this.alpha = Math.random()*.5+.5;

//         this.color;

//         this.move.bind(this);
//         this.draw.bind(this);
//     }

//     gravity = 0.05;

//     move() {
//         this.x += this.vx;
//         this.vy += this.gravity;
//         this.y += this.vy;
//         this.alpha -= 0.01;
//         if (this.x <= -this.w || this.x >= screen.width ||
//             this.y >= screen.height ||
//             this.alpha <= 0) {
//                 return false;
//         }
//         return true;
//     }
//     //take canvas context
//     draw(c) {
//         c.save();
//         c.beginPath();

//         c.translate(this.x+this.w/2, this.y+this.h/2);
//         c.arc(0, 0, this.w, 0, Math.PI*2);
//         c.fillStyle = this.color;
//         c.globalAlpha = this.alpha;

//         c.closePath();
//         c.fill();
//         c.restore();
//     }
// }

// export default ({toggle,timeout})=>{

// const canvasRef = useRef();

// // useEffect(()=>alert(JSON.stringify(canvasRef.current,null,2)),[canvasRef])
// useEffect(()=>{
//     // let firework = new Fireworks(canvasRef.current);
//     setTimeout((timeout)=>{
//     // firework.dispose();
//     },10000)
//     //if for any reason component unmounts, remove and dispose of the class
//     // return firework && firework.dispose()
// },[])

// //canvas element will be created under this element as a child
// return (
// <FireworkCanvas ref={canvasRef} id="firework"/>
// )
// }

// export const FireworkCanvas = styled.canvas`
// background: #000;
// width: 100%;
// height: 100%;
// position: fixed;
// z-index: 2;
// top: 0px;
// left: 0px;
// border: 2px solid red
// `
