import { useGLTF } from '@react-three/drei';
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import FlowEditor from './flowEditor/FlowEditorApp';
import { buildGraphEvaluator, useRegistry } from './hooks/behaviorFlow';
import Scene from './scene/Scene';
import useSceneModifier from './scene/useSceneModifier';
import rawGraphJSON from './exampleGraphs/SpinningSuzanne.json';
// import rawGraphJSON from './exampleGraphs/FlashSuzanne.json';
// import rawGraphJSON from './exampleGraphs/defaultGraph.json';
import { GraphEvaluator, GraphJSON } from '@behavior-graph/framework';
import { behaveToFlow } from './flowEditor/transformers/behaveToFlow';
import { useEdgesState, useNodesState } from 'reactflow';
import { useWhyDidYouUpdate } from 'use-why-did-you-update';

function EditorAndScene({ modelUrl, rawGraphJSON }: { modelUrl: string; rawGraphJSON: GraphJSON }) {
  const sceneJson = useGLTF(modelUrl);

  const scene = useSceneModifier(sceneJson);

  const { registry, specJson, lifecyleEmitter } = useRegistry({ scene });

  const [initialNodes, initialEdges] = useMemo(() => behaveToFlow(rawGraphJSON), [rawGraphJSON]);
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const [run, setRun] = useState(false);

  const [graphEvaluator, setGraphEvaluator] = useState<GraphEvaluator>();

  useEffect(() => {
    if (!run || !nodes || !edges || !registry || !specJson) return;

    const graphEvaluator = buildGraphEvaluator({ nodes, edges, nodeSpecJSON: specJson, registry });

    setGraphEvaluator(graphEvaluator);
  }, [nodes, edges, run, registry, specJson]);

  const handleRun = useCallback(() => {
    setRun(true);
  }, []);

  useWhyDidYouUpdate('app', {
    modelUrl,
    rawGraphJSON,
    scene,
    sceneJson,
    graphEvaluator,
  });

  return (
    <div className="h-full grid grid-cols-2 gap-0">
      <div className="bg-lime-500 h-full">
        {specJson && (
          <FlowEditor
            handleRun={handleRun}
            registry={registry}
            nodes={nodes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
            specJson={specJson}
          />
        )}
      </div>
      <div className="bg-red-400 h-full">
        <Scene scene={sceneJson} graphEvaluator={graphEvaluator} lifecycleEmitter={lifecyleEmitter} run={run} />
      </div>
    </div>
  );
}

function App() {
  const [modelUrl] = useState('/FlashSuzanne.gltf');

  return (
    <Suspense fallback={null}>
      <EditorAndScene modelUrl={modelUrl} rawGraphJSON={rawGraphJSON as GraphJSON} />
    </Suspense>
  );
}

export default App;
