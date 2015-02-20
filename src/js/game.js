'use strict';

var Game = function() {
    this.keyboardState = new Keyboard();

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

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

    this.camera.position.z += 0.15;

    if (this.keyboardState.pressed('W')) {
        this.camera.rotation.x -= 0.01;
    } else if(this.keyboardState.pressed('S')) {
        this.camera.rotation.x += 0.01;
    } else if(this.keyboardState.pressed('A')) {
        this.camera.rotation.y += 0.01;
    } else if(this.keyboardState.pressed('D')) {
        this.camera.rotation.y -= 0.01;
    }

    this.renderer.render(this.scene, this.camera);
};