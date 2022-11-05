import {
  BufferBit,
  ClearState,
  CullingState,
  DepthTestFunc,
  DepthTestState,
  Euler,
  EulerOrder,
  fetchImage,
  icosahedronGeometry,
  makeBufferGeometryFromGeometry,
  makeMatrix4PerspectiveFov,
  makeMatrix4RotationFromEuler,
  makeMatrix4Translation,
  makeProgramFromShaderMaterial,
  makeTexImage2DFromTexture,
  Matrix4,
  renderBufferGeometry,
  RenderingContext,
  ShaderMaterial,
  Texture,
  Vector3,
} from 'threeify';

import fragmentSource from './fragment.glsl';
import vertexSource from './vertex.glsl';

async function init(): Promise<null> {
  const geometry = icosahedronGeometry(0.75, 5);
  const material = new ShaderMaterial(vertexSource, fragmentSource);
  const texture = new Texture(await fetchImage('/assets/textures/planets/jupiter_2k.jpg'));
  const scratchesTexture = new Texture(await fetchImage('/assets/textures/golfball/scratches.png'));

  const context = new RenderingContext(document.getElementById('framebuffer') as HTMLCanvasElement);
  const { canvasFramebuffer } = context;
  window.addEventListener('resize', () => canvasFramebuffer.resize());

  const albedoMap = makeTexImage2DFromTexture(context, texture);
  const bumpMap = makeTexImage2DFromTexture(context, scratchesTexture);
  const program = makeProgramFromShaderMaterial(context, material);
  const uniforms = {
    // vertices
    localToWorld: new Matrix4(),
    worldToView: makeMatrix4Translation(new Vector3(0, 0, -3)),
    viewToScreen: makeMatrix4PerspectiveFov(25, 0.1, 4, 1, canvasFramebuffer.aspectRatio),

    // lights
    pointLightViewPosition: new Vector3(0, 0, 0),
    pointLightIntensity: new Vector3(1, 1, 1).multiplyByScalar(30),
    pointLightRange: 6,

    // materials
    albedoMap,

    clearCoatBumpModulator: 1,
    clearCoatBumpMap: bumpMap,
  };
  const bufferGeometry = makeBufferGeometryFromGeometry(context, geometry);
  canvasFramebuffer.depthTestState = new DepthTestState(true, DepthTestFunc.Less);
  canvasFramebuffer.clearState = new ClearState(new Vector3(0, 0, 0), 1);
  canvasFramebuffer.cullingState = new CullingState(true);

  function animate(): void {
    const now = Date.now();

    uniforms.localToWorld = makeMatrix4RotationFromEuler(
      new Euler(0.15 * Math.PI, now * 0.0002, 0, EulerOrder.XZY),
      uniforms.localToWorld,
    );
    uniforms.pointLightViewPosition = new Vector3(Math.cos(now * 0.001) * 3, 2, 0.5);

    canvasFramebuffer.clear(BufferBit.All);
    renderBufferGeometry(canvasFramebuffer, program, uniforms, bufferGeometry);

    requestAnimationFrame(animate);
  }

  animate();

  return null;
}

init();
