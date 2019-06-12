import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import styled from 'styled-components'

const Container = styled.div`
  height: 100vh;
  width: 100vw;
`

class App extends Component {
    componentDidMount() {
        this.sceneSetup();
        this.addCustomSceneObjects();
        this.startAnimationLoop();
        // // === THREE.JS CODE START ===
        // var scene = new THREE.Scene();
        // var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        // var renderer = new THREE.WebGLRenderer();
        // renderer.setSize( window.innerWidth, window.innerHeight );
        // this.refs.three.appendChild( renderer.domElement );
        // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        // var cube = new THREE.Mesh( geometry, material );
        // scene.add( cube );
        // camera.position.z = 5;
        // var animate = function () {
        //     requestAnimationFrame( animate );
        //     cube.rotation.x += 0.01;
        //     cube.rotation.y += 0.01;
        //     renderer.render( scene, camera );
        // };
        // animate();
        // // === THREE.JS EXAMPLE CODE END ===
    }

    sceneSetup = () => {
        // get container dimensions and use them for scene sizing
        const width = this.el.clientWidth;
        const height = this.el.clientHeight;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75, // fov = field of view
            width / height, // aspect ratio
            0.1, // near plane
            1000 // far plane
        );

        // set some distance from a cube that is located at z = 0
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( width, height );
        this.el.appendChild( this.renderer.domElement ); // mount using React ref
    };

    addCustomSceneObjects = () => {
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial( {
            color: 0x156289,
            emissive: 0x072534,
            side: THREE.DoubleSide,
            flatShading: true
        } );
        this.cube = new THREE.Mesh( geometry, material );
        this.scene.add( this.cube );

        const lights = [];
        lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

        lights[ 0 ].position.set( 0, 200, 0 );
        lights[ 1 ].position.set( 100, 200, 100 );
        lights[ 2 ].position.set( - 100, - 200, - 100 );

        this.scene.add( lights[ 0 ] );
        this.scene.add( lights[ 1 ] );
        this.scene.add( lights[ 2 ] );
    };

    startAnimationLoop = () => {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;

        this.renderer.render( this.scene, this.camera );
        this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
    };

    render() {
        return  <Container ref={domElement => (this.el = domElement)} />
    }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
