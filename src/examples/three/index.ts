/* eslint-disable no-param-reassign */
import * as THREE from 'three';
import { Mesh, MeshStandardMaterial } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

import {
  Assert,
  DefaultLogger,
  EventEmitter,
  GraphEvaluator,
  IScene,
  Logger,
  ManualLifecycleEventEmitter,
  readGraphFromJSON,
  registerCoreProfile,
  registerSceneProfile,
  Registry,
  validateDirectedAcyclicGraph,
  validateLinks,
  validateNodeRegistry,
  Vec3
} from '../../lib';
import { GLTFJson } from './GLTFJson';

let camera: THREE.PerspectiveCamera | null = null;
let scene: THREE.Scene | null = null;
let renderer: THREE.WebGLRenderer | null = null;

class ThreeScene implements IScene {
  private glTFNodeIndexToThreeNode: { [index: number]: THREE.Object3D } = {};
  private glTFMaterialIndexToThreeMaterial: {
    [index: number]: THREE.Material;
  } = {};

  public onSceneChanged = new EventEmitter<void>();

  constructor(public glTFRoot: THREE.Object3D, public glTFJson: GLTFJson) {
    const traverseChildren = (
      threeNode: THREE.Object3D,
      glTFNodeIndex: number
    ) => {
      const glTFNode = glTFJson.nodes[glTFNodeIndex];
      if (glTFNode.children === undefined) return;
      for (let i = 0; i < glTFNode.children.length; i++) {
        const childGLTFNodeIndex = glTFNode.children[i];
        const childThreeNode = threeNode.children[i];
        this.glTFNodeIndexToThreeNode[childGLTFNodeIndex] = childThreeNode;
        traverseChildren(childThreeNode, childGLTFNodeIndex);

        Assert.mustBeTrue(
          glTFJson.nodes[childGLTFNodeIndex].name === childThreeNode.name
        );
      }
    };
    for (let i = 0; i < glTFJson.scenes[0].nodes.length; i++) {
      const glTFNodeIndex = glTFJson.scenes[0].nodes[i];
      const threeNode = glTFRoot.children[i];
      this.glTFNodeIndexToThreeNode[glTFNodeIndex] = threeNode;
      traverseChildren(threeNode, glTFNodeIndex);
    }
    console.log(this);
  }

  getProperty(jsonPath: string): any {
    // look for node regex "/node/{nodeIndex}/{property}"
    //  switch on property name.

    // look for material regex "/materia/{materialIndex}/{property}"
    //  switch on property name.

    switch (jsonPath) {
      case '/nodes/0/material/baseColor': {
        const mesh = this.glTFRoot.children[0] as Mesh;
        const physicalMaterial = mesh.material as MeshStandardMaterial;
        const color = physicalMaterial.color;
        return new Vec3(color.r, color.g, color.b);
      }
      case '/nodes/0/visible': {
        const mesh = this.glTFRoot.children[0] as Mesh;
        return mesh.visible;
      }
      default:
        throw new Error(`unsupported json path ${jsonPath}`);
    }
  }
  setProperty(jsonPath: string, value: any): void {
    switch (jsonPath) {
      case '/nodes/0/material/baseColor': {
        const mesh = this.glTFRoot.children[0] as Mesh;
        const physicalMaterial = mesh.material as MeshStandardMaterial;
        const colorValue = value as Vec3;
        physicalMaterial.color.setRGB(colorValue.x, colorValue.y, colorValue.z);
        this.onSceneChanged.emit();
        break;
      }
      case '/nodes/0/visible': {
        const mesh = this.glTFRoot.children[0] as Mesh;
        mesh.visible = value as boolean;
        this.onSceneChanged.emit();
        break;
      }
      default:
        throw new Error(`unsupported json path ${jsonPath}`);
    }
  }
  addOnClickedListener(
    jsonPath: string,
    callback: (jsonPath: string) => void
  ): void {
    throw new Error('Method not implemented.');
  }
}

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

async function main() {
  Logger.onVerbose.clear();

  const registry = new Registry();
  registerCoreProfile(registry);
  registerSceneProfile(registry);
  const graphJsonPath = `/src/graphs/scene/actions/FlashSuzanne.json`;
  if (graphJsonPath === undefined) {
    throw new Error('no path specified');
  }

  Logger.verbose(`reading behavior graph: ${graphJsonPath}`);
  const graphFetchResponse = await fetch(graphJsonPath);
  const graphJson = await graphFetchResponse.json();
  const graph = readGraphFromJSON(graphJson, registry);
  graph.name = graphJsonPath;

  const glTFJsonPath = '/src/graphs/scene/actions/Hierarchy.gltf';
  const glTFFetchResponse = await fetch(glTFJsonPath);
  const glTFJson = await glTFFetchResponse.json();
  // await fs.writeFile('./examples/test.json', JSON.stringify(writeGraphToJSON(graph), null, ' '), { encoding: 'utf-8' });
  const errorList: string[] = [];
  errorList.push(
    ...validateNodeRegistry(registry),
    ...validateLinks(graph),
    ...validateDirectedAcyclicGraph(graph)
  );

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
    .setPath('/assets/envmaps/')
    .loadAsync('pedestrian_overpass_1k.hdr');
  const gltfPromise = new GLTFLoader()
    .setPath('/src/graphs/scene/actions/')
    .loadAsync('Hierarchy.gltf');

  const localRenderer = new THREE.WebGLRenderer({ antialias: true });
  localRenderer.setPixelRatio(window.devicePixelRatio);
  localRenderer.setSize(window.innerWidth, window.innerHeight);
  localRenderer.toneMapping = THREE.ACESFilmicToneMapping;
  localRenderer.toneMappingExposure = 1;
  localRenderer.outputEncoding = THREE.sRGBEncoding;
  container.appendChild(localRenderer.domElement);

  renderer = localRenderer;

  const texture = await texturePromise;
  const gltf = await gltfPromise;

  texture.mapping = THREE.EquirectangularReflectionMapping;

  localScene.background = texture;
  localScene.environment = texture;
  console.log(gltf.scene);

  localScene.add(gltf.scene);
  const threeScene = new ThreeScene(gltf.scene, glTFJson);
  threeScene.onSceneChanged.addListener(() => {
    render();
  });
  registry.implementations.register('IScene', threeScene);

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

  registry.implementations.register('ILogger', new DefaultLogger());
  const manualLifecycleEventEmitter = new ManualLifecycleEventEmitter();
  registry.implementations.register(
    'ILifecycleEventEmitter',
    manualLifecycleEventEmitter
  );

  Logger.verbose('initialize graph');
  await graphEvaluator.executeAll();

  Logger.verbose('triggering start event');
  manualLifecycleEventEmitter.startEvent.emit();

  Logger.verbose('executing all (async)');
  await graphEvaluator.executeAllAsync(5);

  for (let tick = 0; tick < 5; tick++) {
    Logger.verbose('triggering tick');
    manualLifecycleEventEmitter.tickEvent.emit();

    Logger.verbose('executing all (async)');
    // eslint-disable-next-line no-await-in-loop
    await graphEvaluator.executeAllAsync(5);
  }

  Logger.verbose('triggering end event');
  manualLifecycleEventEmitter.endEvent.emit();

  Logger.verbose('executing all (async)');
  await graphEvaluator.executeAllAsync(5);
}

main();
