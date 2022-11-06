import { GraphEvaluator, GraphJSON } from '@behavior-graph/framework';
import { useGLTF } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { buildGraphEvaluator } from '../hooks/behaviorFlow';
import useLoadOnChainWorld from '../hooks/useLoadOnChainWorld';
import useLoadSceneAndRegistry from '../hooks/useLoadSceneAndRegistry';
import Scene from '../scene/Scene';
import useTokenContractAddress from '../web3/useTokenContractAddressAndAbi';

const OnChainWorld = ({ graphJson, sceneFileUrl }: { graphJson: GraphJSON; sceneFileUrl: string }) => {
  const { sceneJson, scene, sceneOnClickListeners, registry, specJson, lifecyleEmitter } = useLoadSceneAndRegistry({
    modelUrl: sceneFileUrl,
  });

  const [graphEvaluator, setGraphEvaluator] = useState<GraphEvaluator>();

  useEffect(() => {
    if (!graphJson || !registry) return;

    const graphEvaluator = buildGraphEvaluator({ graphJson, registry });

    setGraphEvaluator(graphEvaluator);
  }, [graphJson, registry]);

  useEffect(() => {}, [graphJson]);

  return (
    <div className="w-full h-full">
      <Scene
        scene={sceneJson}
        graphEvaluator={graphEvaluator}
        lifecycleEmitter={lifecyleEmitter}
        run
        onClickListeners={sceneOnClickListeners}
      />
    </div>
  );
};

const OnChainWorldLoader = ({ tokenId, contractAddress }: { tokenId: number; contractAddress: string }) => {
  const { graphJson, nodes, sceneFileUrl } = useLoadOnChainWorld(tokenId, contractAddress);

  if (!sceneFileUrl || !graphJson) return null;

  return <OnChainWorld graphJson={graphJson} sceneFileUrl={sceneFileUrl} />;
};
const OnChainWorldWrapper = () => {
  const { tokenId } = useParams<{ tokenId: string }>();

  const contractAddress = useTokenContractAddress();

  if (!contractAddress || !tokenId) return null;
  return <OnChainWorldLoader tokenId={+tokenId} contractAddress={contractAddress} />;
};

export default OnChainWorldWrapper;
