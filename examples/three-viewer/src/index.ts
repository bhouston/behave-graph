/* eslint-disable no-param-reassign */
import {
  createRegistry,
  createSceneDependency,
  DefaultLogger,
  Dependencies,
  Engine,
  loadGltfAndBuildScene,
  Logger,
  makeCoreDependencies,
  ManualLifecycleEventEmitter,
  readGraphFromJSON,
  registerCoreProfile,
  registerSceneProfile,
  validateGraph,
  validateRegistry
} from '@behave-graph/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

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

const publicImageUrl = (path: string) => new URL(path, import.meta.url).href;

async function main() {
  const registry = createRegistry();
  const manualLifecycleEventEmitter = new ManualLifecycleEventEmitter();
  const logger = new DefaultLogger();

  debugger;
  const { scene: threeScene, gltf } = await loadGltfAndBuildScene(
    '/graphs/scene/actions/SpinningSuzanne.gltf'
  );

  registerCoreProfile(registry);
  registerSceneProfile(registry);
  const dependencies: Dependencies = {
    ...makeCoreDependencies({
      lifecyleEmitter: manualLifecycleEventEmitter,
      logger
    }),
    ...createSceneDependency(threeScene)
  };

  const graphJsonPath = publicImageUrl(
    `/graphs/scene/actions/SpinningSuzanne.json`
  );
  if (graphJsonPath === undefined) {
    throw new Error('no path specified');
  }

  Logger.verbose(`reading behavior graph: ${graphJsonPath}`);
  const graphFetchResponse = await fetch(graphJsonPath);
  const graphJson = await graphFetchResponse.json();
  const graph = readGraphFromJSON({ graphJson, registry, dependencies });
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

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.25,
    20
  );
  camera.position.set(-1.8, 0.6, 2.7);

  const localScene = new THREE.Scene();
  scene = localScene;

  const texturePromise = new RGBELoader()
    .setPath(publicImageUrl('/assets/envmaps/'))
    .loadAsync('pedestrian_overpass_1k.hdr');

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

  threeScene.addOnSceneChangedListener(() => {
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
  const engine = new Engine(graph.nodes);
  //engine.onNodeEvaluation.addListener(traceToLogger);

  Logger.verbose('initialize graph');
  await engine.executeAllSync();

  if (manualLifecycleEventEmitter.startEvent.listenerCount > 0) {
    Logger.verbose('triggering start event');
    manualLifecycleEventEmitter.startEvent.emit();

    Logger.verbose('executing all (async)');
    await engine.executeAllAsync(5);
  }

  const tickFPS = 100;
  const tickDuration = Math.round(1000 / tickFPS);

  const onTick = async () => {
    manualLifecycleEventEmitter.tickEvent.emit();
    engine.executeAllSync(0.1, 100);
    setTimeout(onTick, tickDuration);
  };

  Logger.verbose(
    `starting tick event loop at ${tickFPS} fps / ${tickDuration} ms`
  );
  setTimeout(onTick, tickDuration);

  /*if (manualLifecycleEventEmitter.endEvent.listenerCount > 0) {
    Logger.verbose('triggering end event');
    manualLifecycleEventEmitter.endEvent.emit();

    Logger.verbose('executing all (async)');
    await engine.executeAllAsync(5);
  }*/
}

main();
