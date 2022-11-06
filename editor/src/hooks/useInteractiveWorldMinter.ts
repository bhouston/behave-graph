import { GraphJSON, NodeParameterValueJSON } from '@behavior-graph/framework';
import { useCallback, useEffect, useState } from 'react';
import { usePrepareContractWrite, useContractWrite } from 'wagmi';
import { saveInteractiveWorldToIpfs } from './ipfs/ipfsInteractiveWorldSaver';
import { abi } from '../contracts/abi';
import { PrepareWriteContractConfig } from '@wagmi/core';

type TokenizedAction = {
  nodeType: number;
  id: string;
  tokenGateRule: {
    active: boolean;
    tokenContract: `0x${string}`;
  };
};

export const tokenizableActionTypes: string[] = ['scene/nodeClick'];

const actionsToSmartContractActions = (behaviorGraph: GraphJSON, contractAddress: string): TokenizedAction[] => {
  const validNodes = behaviorGraph.nodes?.filter((x) => tokenizableActionTypes.includes(x.type));

  const result: TokenizedAction[] =
    validNodes?.map((x): TokenizedAction => {
      const activeParam = x.parameters?.tokenGated as NodeParameterValueJSON | undefined;
      const active = !!activeParam?.value;
      const addressParam = x.parameters?.tokenGatedAddress as NodeParameterValueJSON | undefined;
      const address = addressParam?.value;
      return {
        id: x.id,
        nodeType: 0,
        tokenGateRule: {
          active,
          tokenContract: address as `0x${string}`,
        },
      };
    }) || [];

  console.log(result);

  return result;
};

const toMintArgs = (cid: string, behaviorGraph: GraphJSON, contractAddress: string): [string, TokenizedAction[]] => [
  cid,
  actionsToSmartContractActions(behaviorGraph, contractAddress),
];

export const useSaveSceneToIpfs = ({ modelUrl, behaviorGraph }: { modelUrl: string; behaviorGraph: GraphJSON }) => {
  const [cid, setCid] = useState<string>();
  const saveSceneToIpfs = useCallback(async () => {
    const { cid } = await saveInteractiveWorldToIpfs({ modelUrl, behaviorGraph });

    setCid(cid);
  }, [modelUrl, behaviorGraph]);

  return { cid, saveSceneToIpfs };
};

const useInteractiveWorldMinter = ({
  worldCid,
  contractAddress,
  behaviorGraph,
}: {
  contractAddress: string;
  worldCid: string;
  behaviorGraph: GraphJSON;
}) => {
  const [args, setArgs] = useState(() => toMintArgs(worldCid, behaviorGraph, contractAddress));

  const { config, error, isError } = usePrepareContractWrite({
    address: contractAddress,
    abi,
    functionName: 'safeMint',
    args,
  });

  useEffect(() => {
    setArgs(toMintArgs(worldCid, behaviorGraph, contractAddress));
  }, [worldCid, behaviorGraph, contractAddress]);

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
  });

  return { write, isSuccess, isLoading, isError, error };
};

export default useInteractiveWorldMinter;
