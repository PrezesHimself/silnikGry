	import './style.css'
  import * as THREE from 'three';
  import Stats from 'stats.js'

      var fps = 60;
			var container;
			var camera, scene, renderer;
			var uniforms;
      var stats = new Stats();
      var images = []

      var mouseX = 0;
      var mouseY = 0;

        document.querySelector('#container').appendChild( stats.domElement );

          loadImages([
    'https://cdnb.artstation.com/p/assets/images/images/001/146/575/large/ulrick-wery-tileableset2-soil.jpg?1441028621'
  ], function(_images) {
      images = _images;
			init();
			animate();

  })

			function init() {

				container = document.getElementById( 'container' );
				camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
				scene = new THREE.Scene();
				var geometry = new THREE.PlaneBufferGeometry( 2, 2 );


      var canvas = document.getElementById('background');
      canvas.width  = window.innerWidth;
      canvas.height  = window.innerHeight;
      var context = canvas.getContext('2d');
      var centerX = canvas.width / 2;
      var centerY = canvas.height / 2;
      var radius = 70;

      // console.log(images)      
      context.fillStyle = context.createPattern(images[0], 'repeat');;
      context.fillRect(0, 0, canvas.width, canvas.height);

				uniforms = {
					time: { value: 1.0 },
          resolution: { type: "v2", value: new THREE.Vector2() },
          mouse: { type: "v2", value: new THREE.Vector2() },
          colorTexture: { value: new THREE.TextureLoader().load( 'https://cdnb.artstation.com/p/assets/images/images/001/146/575/large/ulrick-wery-tileableset2-soil.jpg?1441028621' ) },
          normalMap: {
            value: new THREE.TextureLoader().load('https://i.ibb.co/cYkGf9V/Normal-Map.png')
          }
				};
  
uniforms[ "colorTexture" ].value.wrapS = uniforms[ "colorTexture" ].value.wrapT = THREE.RepeatWrapping;

uniforms[ "normalMap" ].value.wrapS = uniforms[ "normalMap" ].value.wrapT = THREE.RepeatWrapping;

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


function loadImage(url, callback) {
  var image = new Image();
    requestCORSIfNotSameOrigin(image, url)
  image.src = url;
  image.onload = callback;
  return image;
}

function loadImages(urls, callback) {
  var images = [];
  var imagesToLoad = urls.length;

  // Called each time an image finished
  // loading.
  var onImageLoad = function() {
    --imagesToLoad;
    // If all the images are loaded call the callback.
    if (imagesToLoad === 0) {
      callback(images);
    }
  };

  for (var ii = 0; ii < imagesToLoad; ++ii) {
    var image = loadImage(urls[ii], onImageLoad);
    images.push(image);
  }
}

function requestCORSIfNotSameOrigin(img, url) {
  if ((new URL(url)).origin !== window.location.origin) {
    img.crossOrigin = "";
  }
}