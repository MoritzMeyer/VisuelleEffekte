import Webgl from "./Engine/Webgl.js";
import Renderer from "./Engine/Renderer.js";
import Camera from "./Engine/Camera.js";
import OBJ from "./Engine/OBJ.js";
import Shader from "./Engine/Shader.js";

// Webgl context holen und laden.
const canvas = document.querySelector('#glcanvas');
Webgl.loadGL(canvas);
let canvasColor = [0.42, 0.6, 0.0, 1.0];

// initialize Application
let renderer = new Renderer();
let camera = new Camera();
Webgl.addNavigationListener(canvas, camera);
Webgl.addCameraExamine(canvas, camera);
camera.viewMatrix.translate([0, 0, -10.0]);

let obj = new OBJ("./textures/capsule/capsule.obj", 1, Shader.getDefaultTextureShader());
checkLoaded(obj);

requestAnimationFrame(render);
function render(now)
{
    renderer.clear(canvas, canvasColor);
    if (obj.isLoaded)
    {
        renderer.drawGameObject(obj.gameObject, camera);
    }
    requestAnimationFrame(render);
}

function checkLoaded()
{
    if (!obj.isLoaded)
    {
        window.setTimeout(checkLoaded, 100);
    }
    else
    {
        obj.gameObject.transform.rotateX(90);
    }
}


