import Webgl from "../Engine/Webgl.js";
import Renderer from "../Engine/Renderer.js";
import Shader from "../Engine/Shader.js";
import VertexBuffer from "../Engine/VertexBuffer.js";
import Color from "../Engine/Color.js";
import GameObject from "../Engine/GameObject.js";
import Camera from "../Engine/Camera.js";

// Webgl context holen und laden.
const canvas = document.querySelector('#glcanvas');
Webgl.loadGL(canvas);


const vsSource =
    `
    attribute vec3 aPosition;
    uniform mat4 uProjectionMatrix;
    uniform mat4 uViewMatrix;
    uniform mat4 uModelMatrix;
    void main() {
        gl_PointSize = 10.0;
        vec4 flipX = vec4(-1, 1, 1, 1);
        gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aPosition, 1.0) * flipX;
    }
`;

const fsSource =
    `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    uniform vec3 uObjectColor;
    uniform float uAlpha;
    void main() {
        gl_FragColor = vec4(uObjectColor, uAlpha);
}`;

let positions =
    [
        // cube
        0.5, -0.75,
        -0.5,  0.2,
        0.5,  0.2,
        -0.5, -0.75,

        // triangle
        -0.75, 0.2,
        0.75, 0.2,
        0, 0.9,
    ];

// color Arrays
let cubeColors = [0.73, 0.7, 0.36];
let triangleColors = [0.5, 0.0, 0.0];

// Index Arrays
let indicesCube = [0, 1, 2, 0, 1 , 3];
let indicesTriangle = [4, 5, 6];

let canvasColor = [0.42, 0.6, 0.0, 1.0];

// Engine erzeugen und canvas initialisieren
let renderer = new Renderer();
let camera = new Camera();

// initialize VertexBuffer
const vertexBuffer = new VertexBuffer(positions, 2);

// initialize Cube data
// shader
let shaderCube = new Shader(vsSource, fsSource);
let colorCube = new Color(shaderCube, cubeColors);
let gameObjectCube = new GameObject(vertexBuffer, indicesCube, colorCube);

// initialize Triangle Data
// shader
let shaderTriangle = new Shader(vsSource, fsSource);
let colorTriangle = new Color(shaderTriangle, triangleColors);
let gameObjectTriangle = new GameObject(vertexBuffer, indicesTriangle, colorTriangle);

Webgl.addNavigationListener(canvas, camera);

camera.gameObject.transform.translate([0.0, 0.0, -4.0]);
requestAnimationFrame(render);

function render(now)
{
    renderer.clear(canvas, canvasColor);
    renderer.drawGameObject(gameObjectCube, camera);
    renderer.drawGameObject(gameObjectTriangle, camera);

    requestAnimationFrame(render);
}
