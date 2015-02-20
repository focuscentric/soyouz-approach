'use strict';

var Game = function() {
    this.keyboardState = new Keyboard();

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.rotationVector = new THREE.Vector3(0, 0, 0);
    this.positionVector = new THREE.Vector3(0, 0, 0);

    document.body.appendChild(this.renderer.domElement);

    this.init();

    return this;
};

Game.prototype.init = function() {
    var light = new THREE.AmbientLight( 0xfefefe );
    this.scene.add( light );

    var sphere = new THREE.SphereGeometry(500, 60, 40);
    sphere.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));

    var bgMaterial = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('/textures/environement.png')
    });

    var bg = new THREE.Mesh(sphere, bgMaterial);
    this.scene.add(bg);

    this.camera.position.z = 5;

    this.render();
};

Game.prototype.update = function() {

};

Game.prototype.render = function() {
    requestAnimationFrame(this.render.bind(this));

    if(this.keyboardState.pressed('shift')) {
        if (this.keyboardState.pressed('W')) {
            this.positionVector.y += 0.03;
        } else if (this.keyboardState.pressed('S')) {
            this.positionVector.y -= 0.03;
        }

        if (this.keyboardState.pressed('A')) {
            this.positionVector.x += 0.03;
        } else if (this.keyboardState.pressed('D')) {
            this.positionVector.x -= 0.03;
        }
    } else {
        if (this.keyboardState.pressed('W')) {
            this.rotationVector.x = -0.006;
        } else if (this.keyboardState.pressed('S')) {
            this.rotationVector.x = 0.006;
        }

        if (this.keyboardState.pressed('A')) {
            this.rotationVector.y = 0.006;
        } else if (this.keyboardState.pressed('D')) {
            this.rotationVector.y = -0.006;
        }
    }

    if(this.keyboardState.pressed('left')) {
        this.rotationVector.z = 0.001;
    } else if(this.keyboardState.pressed('right')) {
        this.rotationVector.z = -0.001;
    }

    this.camera.translateX(this.positionVector.x);
    this.camera.translateY(this.positionVector.y);
    this.camera.translateZ(this.positionVector.z);

    this.camera.rotateX(this.rotationVector.x);
    this.camera.rotateY(this.rotationVector.y);
    this.camera.rotateZ(this.rotationVector.z);



    this.renderer.render(this.scene, this.camera);
};