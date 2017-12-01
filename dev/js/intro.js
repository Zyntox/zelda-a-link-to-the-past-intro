// Returns a boolean
var areAssetsLoaded = function(){
  console.log(document.images);
}

var runIntro = function(){
  // Setting up the canvas.
  var scene = new THREE.Scene();

  // Setting up the camera.
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

  //Setting upp the renderer.
  var renderer = new THREE.WebGLRenderer( { alpha: true } );
  renderer.setClearColor( 0x000000, 0 );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // Add an event listener that keeps scene aspect ratio correct.
  window.addEventListener( 'resize', onWindowResize, false );


  function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    console.log("Resize was done!");
  }



  // Setting up "2d" planes" a.k.a the shapes.
  var shape = new THREE.Shape();
  shape.moveTo( 0,0 );
  shape.lineTo( 100, 0 );
  shape.lineTo( 50, 60 );
  shape.lineTo( 0, 0 );


  // The extrude settings are used on the "2d planes".
  var extrudeSettings = {
    steps: 2,
    amount: 10,
    bevelEnabled: true,
    bevelThickness: 0.9,
    bevelSize: 5,
    bevelSegments: 1
  };


  // creating the 3d objects.
  var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
  var material = new THREE.MeshBasicMaterial( { color: '#ffe316' } );
  var material2 = new THREE.MeshStandardMaterial( { color: '#ffe316' } );

  // adding the objects
  var triangle1 = new THREE.Mesh( geometry, material2),
      triangle2 = new THREE.Mesh( geometry, material2),
      triangle3 = new THREE.Mesh( geometry, material2);



  // Offset triangles for pivot point.
  triangle1.position.x = -50;
  triangle1.position.y = -50;
  triangle2.position.x = -50;
  triangle2.position.y = -50;
  triangle3.position.x = -50;
  triangle3.position.y = -50;


  // Set ups pivot points
  var pivot1 = new THREE.Object3D(),
      pivot2 = new THREE.Object3D(),
      pivot3 = new THREE.Object3D();


  pivot1.add( triangle1 );
  pivot2.add( triangle2 );
  pivot3.add( triangle3 );
  scene.add( pivot1 );
  scene.add( pivot2 );
  scene.add( pivot3 );

  pivot1.position.x = -455;
  pivot2.position.x = 455;
  pivot3.position.y = 470;

  pivot1.position.z = 400;
  pivot2.position.z = 400;
  pivot3.position.z = 400;

  // Add lights to the scene.
  var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 3.5 );
  scene.add( light );


  // Set up the intro sound.
  var audio = new Audio('./audio/intro.mp3'),
      audio2 = new Audio('./audio/the_goddess_appears.mp3');


  var playAudio = function(){
    // Used to delay the audio by 0.5 seconds.
    setTimeout(function(){
      audio.play();
    }, 500);
  };


  audio.onended = function(){
    audio2.play();
  }

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 400;

  // 0.0157 seems to end the rotation at a good point!
  var speedRotation = 0.0236 * 4,
      speedDrop = 1.5,
      speedSlide =  1.5;


  var runOnce = false;

  var flashBackground = function(){
    // The timeout is used to delay the flashing.
    setTimeout(function(){
      document.body.className += " flash";
      var logo = document.getElementById('main-title');
      logo.style.opacity = "1";
      runOnce = true;
    }, 1500);

    setTimeout(function(){
      var bg = document.getElementById('bg');
      bg.style.display = "block";
      // document.body.style.background = "url('https://anonimag.es/i/editedzeldabge4c28.png') no-repeat center center fixed";
      // document.body.style.backgroundSize = "cover";
    },2200);

  }


  // Render out the scene.
  var render = function () {
    requestAnimationFrame( render );

    if(pivot1.position.x < -105){
      pivot1.position.x += speedSlide;
      pivot1.rotation.y -= speedRotation;
    }
    else if (pivot1.position.x < -55){
      pivot1.position.x += 0.75;
      pivot1.rotation.y -= 0.0236 * 2;
    }

    if(pivot1.position.z > 50){
      pivot1.position.z -= speedDrop;
    }
    else if (pivot1.position.z > 0){
      pivot1.position.z -= 0.75;
    }

    if(pivot2.position.x > 105){
      pivot2.position.x -= speedSlide;
      pivot2.rotation.y += speedRotation;
    }
    else if (pivot2.position.x > 55){
      pivot2.position.x -= 0.75;
      pivot2.rotation.y += 0.0236 * 2;
    }

    if (pivot2.position.z > 50){
      pivot2.position.z -= speedDrop;
    }
    else if (pivot2.position.z > 0){
      pivot2.position.z -= 0.75;
    }

    if(pivot3.position.y > 120){
      pivot3.position.y -= speedSlide;
      pivot3.rotation.x += speedRotation;
    } else if (pivot3.position.y > 70){
      pivot3.position.y -= 0.75;
      pivot3.rotation.x += 0.0236 * 2;
    }

    if(pivot3.position.z > 50){
      pivot3.position.z -= speedDrop;
    }	else if (pivot3.position.z > 0){
      pivot3.position.z -= 0.75;
    } else{
      if(!runOnce){
        flashBackground();
      }
    }


    renderer.render(scene, camera);
  };
  playAudio();
  render();
}


window.onload = function(){
      areAssetsLoaded();
      runIntro();
}
