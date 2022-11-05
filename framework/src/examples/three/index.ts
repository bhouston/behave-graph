/* eslint-disable no-param-reassign */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

import { Logger } from '../../lib/Diagnostics/Logger.js';
import { GraphEvaluator } from '../../lib/Graphs/Evaluation/GraphEvaluator.js';
import { readGraphFromJSON } from '../../lib/Graphs/IO/readGraphFromJSON.js';
import { validateGraph } from '../../lib/Graphs/Validation/validateGraph.js';
import { DefaultLogger } from '../../lib/Profiles/Core/Abstractions/Drivers/DefaultLogger.js';
import { ManualLifecycleEventEmitter } from '../../lib/Profiles/Core/Abstractions/Drivers/ManualLifecycleEventEmitter.js';
import { registerCoreProfile } from '../../lib/Profiles/Core/registerCoreProfile.js';
import { registerSceneProfile } from '../../lib/Profiles/Scene/registerSceneProfile.js';
import { Registry } from '../../lib/Registry.js';
import { validateRegistry } from '../../lib/validateRegistry.js';
import { ThreeScene } from './ThreeScene.js';

let camera: THREE.PerspectiveCamera | null = null;
let scene: THREE.Scene | null = null;
let renderer: THREE.WebGLRenderer | null = null;

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
  const gltfPromise = new GLTFLoader().setPath('/src/graphs/scene/actions/').loadAsync('SpinningSuzanne.gltf');

  const gltf = await gltfPromise;

  const glTFJsonPath = '/src/graphs/scene/actions/SpinningSuzanne.gltf';
  const glTFFetchResponse = await fetch(glTFJsonPath);

  const glTFJson = await glTFFetchResponse.json();

  const threeScene = new ThreeScene(gltf.scene, glTFJson);

  return { threeScene, gltf };
}

async function main() {
  const registry = new Registry();
  const manualLifecycleEventEmitter = new ManualLifecycleEventEmitter();
  const logger = new DefaultLogger();

  const { threeScene, gltf } = await loadThreeScene();

  registerCoreProfile(registry, logger, manualLifecycleEventEmitter);
  registerSceneProfile(registry, threeScene);

  const graphJsonPath = `/src/graphs/scene/actions/SpinningSuzanne.json`;
  if (graphJsonPath === undefined) {
    throw new Error('no path specified');
  }

  Logger.verbose(`reading behavior graph: ${graphJsonPath}`);
  const graphFetchResponse = await fetch(graphJsonPath);
  const graphJson = await graphFetchResponse.json();
  const graph = readGraphFromJSON(graphJson, registry);
  graph.name = graphJsonPath;

  // await fs.writeFile('./examples/test.json', JSON.stringify(writeGraphToJSON(graph), null, ' '), { encoding: 'utf-8' });
  const errorList: string[] = [];
  errorList.push(...validateRegistry(registry), ...validateGraph(graph));

  if (errorList.length > 0) {
    Logger.error(`${errorList.length} errors found:`);
    errorList.forEach((errorText, errorIndex) => {
      Logger.error(`${errorIndex}: ${errorText}`);
    });
    return;
  }

  const container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
  camera.position.set(-1.8, 0.6, 2.7);

  const localScene = new THREE.Scene();
  scene = localScene;

  const texturePromise = new RGBELoader().setPath('/assets/envmaps/').loadAsync('pedestrian_overpass_1k.hdr');

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

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', render); // use if there is no animation loop
  controls.minDistance = 2;
  controls.maxDistance = 10;
  controls.target.set(0, 0, -0.2);
  controls.update();

  window.addEventListener('resize', onWindowResize);

  Logger.verbose('creating behavior graph');
  const graphEvaluator = new GraphEvaluator(graph);
  //graphEvaluator.onNodeEvaluation.addListener(traceToLogger);

  Logger.verbose('initialize graph');
  await graphEvaluator.executeAllSync();

  if (manualLifecycleEventEmitter.startEvent.listenerCount > 0) {
    Logger.verbose('triggering start event');
    manualLifecycleEventEmitter.startEvent.emit();

    Logger.verbose('executing all (async)');
    await graphEvaluator.executeAllAsync(5);
  }

  const onTick = async () => {
    Logger.verbose('triggering tick');
    manualLifecycleEventEmitter.tickEvent.emit();

    Logger.verbose('executing all (async)');
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
