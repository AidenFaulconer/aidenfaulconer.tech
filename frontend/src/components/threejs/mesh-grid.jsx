// import './styles.css';
// import * as THREE from 'three';
// const OrbitControls = require('three-orbit-controls')(THREE);
// import gsap from 'gsap';

// let camera, scene, renderer, controls;
// let width = window.innerWidth;
// let height = window.innerHeight;
// let aspect = width / height;

// // these methods are taken from:
// // https://discourse.threejs.org/t/functions-to-calculate-the-visible-width-height-at-a-given-z-depth-from-a-perspective-camera/269
// const visibleHeightAtZDepth = (depth, camera) => {
// 	// compensate for cameras not positioned at z=0
// 	const cameraOffset = camera.position.z;
// 	if (depth < cameraOffset) depth -= cameraOffset;
// 	else depth += cameraOffset;

// 	// vertical fov in radians
// 	const vFOV = (camera.fov * Math.PI) / 180;

// 	// Math.abs to ensure the result is always positive
// 	return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
// };

// const visibleWidthAtZDepth = (depth, camera) => {
// 	const height = visibleHeightAtZDepth(depth, camera);
// 	return height * camera.aspect;
// };

// function init() {
// 	camera = new THREE.PerspectiveCamera(40, aspect, 1, 1000);
// 	camera.position.z = 20;
// 	camera.updateProjectionMatrix();

// 	scene = new THREE.Scene();
// 	scene.background = new THREE.Color(0x333334);

// 	const light = new THREE.PointLight(0xffffff);
// 	light.position.copy(camera.position);
// 	scene.add(light);
// 	scene.add(new THREE.AmbientLight(0x333333));

// 	renderer = new THREE.WebGLRenderer();
// 	renderer.setPixelRatio(window.devicePixelRatio);
// 	renderer.setSize(width, height);
// 	document.body.appendChild(renderer.domElement);

// 	controls = new OrbitControls(camera, renderer.domElement);

// 	window.addEventListener('resize', onWindowResize, false);
// }

// function onWindowResize() {
// 	width = window.innerWidth;
// 	height = window.innerHeight;
// 	aspect = width / height;

// 	camera.aspect = aspect;
// 	camera.updateProjectionMatrix();
// 	renderer.setSize(width, height);
// }

// function animate() {
// 	requestAnimationFrame(animate);
// 	controls.update();
// 	renderer.render(scene, camera);
// }

// function createGrid() {
// 	let meshArray = [];
// 	const rows = 20;
// 	const cols = 30;
// 	const cameraViewWidth = visibleWidthAtZDepth(0, camera);
// 	const cameraViewHeight = visibleHeightAtZDepth(0, camera);
// 	const geomWidth = cameraViewWidth / cols;
// 	const geomHeight = cameraViewHeight / rows;

// 	const geometry = new THREE.BoxGeometry(geomWidth, geomHeight, 0.1);

// 	const material = new THREE.MeshLambertMaterial({
// 		color: 0xffffff,
// 		wireframe: false
// 	});

// 	for (let c = 0; c < cols; c += 1) {
// 		for (let r = 0; r < rows; r += 1) {
// 			const mesh = new THREE.Mesh(geometry, material);
// 			mesh.position.x = c * geomWidth - (cameraViewWidth - geomWidth) / 2;
// 			mesh.position.y =
// 				r * geomHeight - (cameraViewHeight - geomHeight) / 2;
// 			meshArray.push(mesh);
// 			scene.add(mesh);

// 			gsap.to(mesh.rotation, {
// 				duration: 1.5,
// 				delay: c * 0.25 + Math.random() * 0.8,
// 				ease: 'power1.in',
// 				x: Math.PI / 2,
// 				y: Math.PI / 2,
// 				onComplete: () => {
// 					gsap.to(mesh.rotation, {
// 						duration: 2,
// 						ease: 'power1.out',
// 						x: Math.PI,
// 						y: Math.PI
// 						// z: 0
// 					});
// 				}
// 			});
// 		}
// 	}
// 	// const tl = gsap.timeline();
// 	// const rotations = meshArray.map(a => a.rotation);
// 	// tl.to(rotations, {
// 	// 	x: Math.PI / 2,
// 	// 	// y: Math.PI,
// 	// 	stagger: {
// 	// 		ease: 'power1.outIn',
// 	// 		amount: 5,
// 	// 		grid: [rows, cols],
// 	// 		from: 'start',
// 	// 		repeat: 1,
// 	// 		yoyo: true,
// 	// 		axis: 'x'
// 	// 	}
// 	// });
// }

// init();
// animate();
// createGrid();
