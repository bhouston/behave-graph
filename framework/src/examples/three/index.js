"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-param-reassign */
const THREE = __importStar(require("three"));
const OrbitControls_js_1 = require("three/examples/jsm/controls/OrbitControls.js");
const GLTFLoader_js_1 = require("three/examples/jsm/loaders/GLTFLoader.js");
const RGBELoader_js_1 = require("three/examples/jsm/loaders/RGBELoader.js");
const Logger_js_1 = require("../../lib/Diagnostics/Logger.js");
const GraphEvaluator_js_1 = require("../../lib/Graphs/Evaluation/GraphEvaluator.js");
const readGraphFromJSON_js_1 = require("../../lib/Graphs/IO/readGraphFromJSON.js");
const validateGraph_js_1 = require("../../lib/Graphs/Validation/validateGraph.js");
const DefaultLogger_js_1 = require("../../lib/Profiles/Core/Abstractions/Drivers/DefaultLogger.js");
const ManualLifecycleEventEmitter_js_1 = require("../../lib/Profiles/Core/Abstractions/Drivers/ManualLifecycleEventEmitter.js");
const registerCoreProfile_js_1 = require("../../lib/Profiles/Core/registerCoreProfile.js");
const registerSceneProfile_js_1 = require("../../lib/Profiles/Scene/registerSceneProfile.js");
const Registry_js_1 = require("../../lib/Registry.js");
const validateRegistry_js_1 = require("../../lib/validateRegistry.js");
const ThreeScene_js_1 = require("./ThreeScene.js");
let camera = null;
let scene = null;
let renderer = null;
function render() {
    if (camera !== null && renderer !== null && scene !== null) {
        renderer.render(scene, camera);
    }
}
function onWindowResize() {
    if (camera !== null && renderer !== null) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        render();
    }
}
//
async function loadThreeScene() {
    const gltfPromise = new GLTFLoader_js_1.GLTFLoader().setPath('/src/graphs/scene/actions/').loadAsync('SpinningSuzanne.gltf');
    const gltf = await gltfPromise;
    const glTFJsonPath = '/src/graphs/scene/actions/SpinningSuzanne.gltf';
    const glTFFetchResponse = await fetch(glTFJsonPath);
    const glTFJson = await glTFFetchResponse.json();
    const threeScene = new ThreeScene_js_1.ThreeScene(gltf.scene, glTFJson);
    return { threeScene, gltf };
}
async function main() {
    const registry = new Registry_js_1.Registry();
    const manualLifecycleEventEmitter = new ManualLifecycleEventEmitter_js_1.ManualLifecycleEventEmitter();
    const logger = new DefaultLogger_js_1.DefaultLogger();
    const { threeScene, gltf } = await loadThreeScene();
    (0, registerCoreProfile_js_1.registerCoreProfile)(registry, logger, manualLifecycleEventEmitter);
    (0, registerSceneProfile_js_1.registerSceneProfile)(registry, manualLifecycleEventEmitter, threeScene);
    const graphJsonPath = `/src/graphs/scene/actions/SpinningSuzanne.json`;
    if (graphJsonPath === undefined) {
        throw new Error('no path specified');
    }
    Logger_js_1.Logger.verbose(`reading behavior graph: ${graphJsonPath}`);
    const graphFetchResponse = await fetch(graphJsonPath);
    const graphJson = await graphFetchResponse.json();
    const graph = (0, readGraphFromJSON_js_1.readGraphFromJSON)(graphJson, registry);
    graph.name = graphJsonPath;
    // await fs.writeFile('./examples/test.json', JSON.stringify(writeGraphToJSON(graph), null, ' '), { encoding: 'utf-8' });
    const errorList = [];
    errorList.push(...(0, validateRegistry_js_1.validateRegistry)(registry), ...(0, validateGraph_js_1.validateGraph)(graph));
    if (errorList.length > 0) {
        Logger_js_1.Logger.error(`${errorList.length} errors found:`);
        errorList.forEach((errorText, errorIndex) => {
            Logger_js_1.Logger.error(`${errorIndex}: ${errorText}`);
        });
        return;
    }
    const container = document.createElement('div');
    document.body.appendChild(container);
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
    camera.position.set(-1.8, 0.6, 2.7);
    const localScene = new THREE.Scene();
    scene = localScene;
    const texturePromise = new RGBELoader_js_1.RGBELoader().setPath('/assets/envmaps/').loadAsync('pedestrian_overpass_1k.hdr');
    const localRenderer = new THREE.WebGLRenderer({ antialias: true });
    localRenderer.setPixelRatio(window.devicePixelRatio);
    localRenderer.setSize(window.innerWidth, window.innerHeight);
    localRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    localRenderer.toneMappingExposure = 1;
    localRenderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(localRenderer.domElement);
    renderer = localRenderer;
    const texture = await texturePromise;
    texture.mapping = THREE.EquirectangularReflectionMapping;
    localScene.background = texture;
    localScene.environment = texture;
    localScene.add(gltf.scene);
    threeScene.onSceneChanged.addListener(() => {
        render();
    });
    render();
    const controls = new OrbitControls_js_1.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render); // use if there is no animation loop
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.target.set(0, 0, -0.2);
    controls.update();
    window.addEventListener('resize', onWindowResize);
    Logger_js_1.Logger.verbose('creating behavior graph');
    const graphEvaluator = new GraphEvaluator_js_1.GraphEvaluator(graph);
    //graphEvaluator.onNodeEvaluation.addListener(traceToLogger);
    Logger_js_1.Logger.verbose('initialize graph');
    await graphEvaluator.executeAllSync();
    if (manualLifecycleEventEmitter.startEvent.listenerCount > 0) {
        Logger_js_1.Logger.verbose('triggering start event');
        manualLifecycleEventEmitter.startEvent.emit();
        Logger_js_1.Logger.verbose('executing all (async)');
        await graphEvaluator.executeAllAsync(5);
    }
    const onTick = async () => {
        Logger_js_1.Logger.verbose('triggering tick');
        manualLifecycleEventEmitter.tickEvent.emit();
        Logger_js_1.Logger.verbose('executing all (async)');
        // eslint-disable-next-line no-await-in-loop
        await graphEvaluator.executeAllAsync(500);
        setTimeout(onTick, 50);
    };
    setTimeout(onTick, 50);
    /*if (manualLifecycleEventEmitter.endEvent.listenerCount > 0) {
      Logger.verbose('triggering end event');
      manualLifecycleEventEmitter.endEvent.emit();
  
      Logger.verbose('executing all (async)');
      await graphEvaluator.executeAllAsync(5);
    }*/
}
main();
