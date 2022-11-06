import { GraphJSON } from '@behavior-graph/framework';
import { useCallback, useEffect, useState } from 'react';
import { usePrepareContractWrite, useContractWrite } from 'wagmi';
import { saveInteractiveWorldToIpfs } from './ipfs/ipfsInteractiveWorldSaver';
import { abi } from '../contracts/abi';
import { PrepareWriteContractConfig } from '@wagmi/core';

type TokenizedAction = {
  nodeType: number;
  tokenGateRule: {
    active: boolean;
    tokenContract: `0x${string}`;
  };
};

const tokenizableActionTypes: string[] = ['scene/nodeClick'];

const actionsToSmartContractActions = (behaviorGraph: GraphJSON, contractAddress: string): TokenizedAction[] => {
  const validNodes = behaviorGraph.nodes?.filter((x) => tokenizableActionTypes.includes(x.type));

  const result: TokenizedAction[] =
    validNodes?.map(
      (x): TokenizedAction => ({
        nodeType: 0,
        tokenGateRule: {
          active: false,
          tokenContract: contractAddress as `0x${string}`,
        },
      })
    ) || [];

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
