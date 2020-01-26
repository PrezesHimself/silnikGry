	import './style.css'
  import * as THREE from 'three';
  import Stats from 'stats.js'

      var fps = 60;
			var container;
			var camera, scene, renderer;
			var uniforms;
      var stats = new Stats();

      var mouseX = 0;
      var mouseY = 0;

        document.querySelector('#container').appendChild( stats.domElement );
			init();
			animate();

			function init() {

				container = document.getElementById( 'container' );
				camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
				scene = new THREE.Scene();
				var geometry = new THREE.PlaneBufferGeometry( 2, 2 );

				uniforms = {
					time: { value: 1.0 },
          resolution: { type: "v2", value: new THREE.Vector2() },
          mouse: { type: "v2", value: new THREE.Vector2() },
				};


				var material = new THREE.ShaderMaterial( {
					uniforms: uniforms,
					vertexShader: document.getElementById( 'vertexShader' ).textContent,
					fragmentShader: document.getElementById( 'fragmentShader' ).textContent
				} );

				var mesh = new THREE.Mesh( geometry, material );
				scene.add( mesh );

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				container.appendChild( renderer.domElement );

				onWindowResize();

				window.addEventListener( 'resize', onWindowResize, false );
        document.body.addEventListener('mousemove', function(event){
            mouseX = event.clientX ;
            mouseY = event.clientY ;
        });
			}

			function onWindowResize() {
				renderer.setSize( window.innerWidth, window.innerHeight );
        
        uniforms.resolution.value.x = container.clientWidth;
	      uniforms.resolution.value.y = container.clientHeight;
			}

			function animate( timestamp ) {
        stats.begin();

				uniforms[ "time" ].value = timestamp / 1000;
        uniforms.mouse.value.x = mouseX;
	      uniforms.mouse.value.y = mouseY;
				renderer.render( scene, camera );

        stats.end();
        setTimeout(function() {
				  requestAnimationFrame( animate );
        }, 1000/fps)
			}
