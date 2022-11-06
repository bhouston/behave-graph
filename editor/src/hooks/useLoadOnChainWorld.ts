import { useEffect, useMemo, useState } from 'react';
import { useContractRead } from 'wagmi';
import { abi } from '../contracts/abi';
import { BigNumber } from 'ethers';
import { loadStoredSceneAndBehaviorGraphFromIpfs } from './ipfs/ipfsSceneLoader';
import { ipfsUrlToCid } from './ipfs/ipfsUrlUtils';
import { GraphJSON } from '@behavior-graph/framework';
import { useGLTF } from '@react-three/drei';

const useLoadOnChainWorld = (tokenId: number, contractAddress: string) => {
  const tokenIdArgs = useMemo((): [BigNumber] => [BigNumber.from(tokenId)], [tokenId]);

  const { data: tokenURI } = useContractRead({
    abi,
    address: contractAddress,
    functionName: 'tokenURI',
    args: tokenIdArgs,
  });

  const { data: nodes } = useContractRead({
    abi,
    address: contractAddress,
    functionName: 'getNodes',
    args: tokenIdArgs,
  });

  const [sceneFileUrl, setSceneFileUrl] = useState<string>();
  const [graphJson, setGraphJson] = useState<GraphJSON>();

  useEffect(() => {
    if (!tokenURI) return;

    const cid = ipfsUrlToCid(tokenURI);

    (async () => {
      const { sceneFile, graphJSON } = await loadStoredSceneAndBehaviorGraphFromIpfs(cid);

      const sceneFileUrl = window.URL.createObjectURL(sceneFile);

      setSceneFileUrl(sceneFileUrl);
      setGraphJson(graphJSON);
    })();
  }, [tokenURI]);

  return {
    nodes,
    sceneFileUrl,
    graphJson,
  };
};

export default useLoadOnChainWorld;
