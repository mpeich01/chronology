(function() {
	var LENGTH = 10000,
		RADIUS = 300,
		VELOCITY = 1;
	var camera,
		scene,
		renderer,
		timer,
		count = 0,
		deg = 0,
		spiralParticles = [],
		curveSpiralParticles = [];
	var random = Math.random,
		abs = Math.abs,
		sin = Math.sin,
		cos = Math.cos;
	var mouseX = 0,
		mouseY = 0,
		windowHalfX = window.innerWidth / 2,
		windowHalfY = window.innerHeight / 2;

	function init() {
		camera = new THREE.Camera(450, window.innerWidth / window.innerHeight, 1, 10000);
		camera.position.z = 1000;

		scene = new THREE.Scene();

		for (var i = 0; i < LENGTH; i++) {
			// var n = 20,
			// 	frequency = 0.5,
			(r = 255), (g = 0), (b = 0), (color = rgb2Hex(r, g, b));

			let curvePoints = [];
			var particle = (spiralParticles[i] = new THREE.Particle(
				new THREE.ParticleCircleMaterial({
					color: color,
					opacity: 0.8
				})
			));
			particle.position.x = particle.position.y = 50;
			particle.position.z = -18000 + i * 10; // length
			particle.scale.x = particle.scale.y = 30;
			scene.addObject(particle);

			// 	var curveParticle = (curveSpiralParticles[i] = new THREE.Particle(
			// 		new THREE.ParticleCircleMaterial({
			// 			color: color,
			// 			opacity: 0.8
			// 		})
			// 	));
			// 	curveParticle.position.x = curveParticle.position.y = 0;
			// 	curveParticle.position.z = 0;
			// 	curveParticle.scale.x = curveParticle.scale.y = 10;
			// 	// scene.addObject(curveParticle);
		}

		// var curve = new THREE.SplineCurve([
		// 	new THREE.Vector2(-10, 0),
		// 	new THREE.Vector2(-5, 5),
		// 	new THREE.Vector2(0, 0),
		// 	new THREE.Vector2(5, -5),
		// 	new THREE.Vector2(10, 0)
		// ]);

		// var points = curve.getPoints(50);
		// var geometry = new THREE.BufferGeometry().setFromPoints(points);

		// var material = new THREE.LineBasicMaterial({ color: 0xff0000 });

		// // Create the final object to add to the scene
		// var splineObject = new THREE.Line(geometry, material);

		// scene.add(splineObject);

		renderer = new THREE.CanvasRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);

		document.addEventListener(
			'mousemove',
			function(event) {
				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;
			},
			false
		);

		document.addEventListener(
			'touchstart',
			function(event) {
				if (event.touches.length === 1) {
					event.preventDefault();
					mouseX = event.touches[0].pageX - windowHalfX;
					mouseY = event.touches[0].pageY - windowHalfY;
				}
			},
			false
		);

		document.addEventListener(
			'touchmove',
			function(event) {
				if (event.touches.length === 1) {
					event.preventDefault();
					mouseX = event.touches[0].pageX - windowHalfX;
					mouseY = event.touches[0].pageY - windowHalfY;
				}
			},
			false
		);

		document.addEventListener(
			'dblclick',
			function() {
				startStop();
			},
			false
		);
	}

	function rgb2Hex(r, g, b) {
		return '0x' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
	}

	function byte2Hex(n) {
		var nybHexString = '0123456789ABCDEF';
		return String(nybHexString.substr((n >> 4) & 0x0f, 1)) + nybHexString.substr(n & 0x0f, 1);
	}

	function deg2Rad(deg) {
		return deg * (Math.PI / 180);
	}

	function startStop() {
		if (timer) {
			timer = clearInterval(timer);
		} else {
			timer = setInterval(loop, 1000 / 60);
		}
	}

	function loop() {
		camera.position.x += (mouseX - camera.position.x) * 0.1;
		camera.position.y += (-mouseY - camera.position.y) * 0.1;

		for (var i = 0; i < spiralParticles.length; i++) {
			var particle = spiralParticles[i];
			var rad = deg2Rad(deg * VELOCITY);

			particle.position.x = sin(rad - i * 0.2) * RADIUS;
			particle.position.y = cos(rad - i * 0.2) * RADIUS;
			//particle.scale.x = particle.scale.y = 1 + abs(12 * sin(rad));

			// var curveParticle = curveSpiralParticles[i];
			// curveParticle.position.x -= cos(rad + i * 0.2) * 10;
			// curveParticle.position.y -= sin(rad + i * 0.2) * 10;
		}

		count += 1;
		deg = (count + 10) % 360;

		renderer.render(scene, camera);
	}

	init();
	startStop();
})();
