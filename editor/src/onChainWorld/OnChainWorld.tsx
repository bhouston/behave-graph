import { GraphEvaluator, GraphJSON, ISmartContractActions } from '@behavior-graph/framework';
import { useGLTF } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { buildGraphEvaluator } from '../hooks/behaviorFlow';
import useLoadOnChainWorld from '../hooks/useLoadOnChainWorld';
import useLoadSceneAndRegistry from '../hooks/useLoadSceneAndRegistry';
import Scene from '../scene/Scene';
import useTokenContractAddress from '../web3/useTokenContractAddressAndAbi';
import useSmartContractActions from './useSmartContractActions';

const OnChainWorld = ({
  graphJson,
  sceneFileUrl,
  smartContractActions,
}: {
  graphJson: GraphJSON;
  sceneFileUrl: string;
  smartContractActions: ISmartContractActions;
}) => {
  const { sceneJson, scene, sceneOnClickListeners, registry, specJson, lifecyleEmitter } = useLoadSceneAndRegistry({
    modelUrl: sceneFileUrl,
    smartContractActions,
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
  const { graphJson, sceneFileUrl } = useLoadOnChainWorld(tokenId, contractAddress);

  const smartContractActions = useSmartContractActions(contractAddress, tokenId);

  if (!sceneFileUrl || !graphJson || !smartContractActions) return null;

  return <OnChainWorld graphJson={graphJson} sceneFileUrl={sceneFileUrl} smartContractActions={smartContractActions} />;
};
const OnChainWorldWrapper = () => {
  const { tokenId } = useParams<{ tokenId: string }>();

  const contractAddress = useTokenContractAddress();

  if (!contractAddress || !tokenId) return null;
  return <OnChainWorldLoader tokenId={+tokenId} contractAddress={contractAddress} />;
};

export default OnChainWorldWrapper;
