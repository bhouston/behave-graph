import { GraphJSON } from '@behavior-graph/framework';
import { behaviorGraphFileName, modelFileName } from './ipfsInteractiveWorldSaver';
import { makeWeb3StorageClient } from './web3Storage';

export const loadStoredSceneAndBehaviorGraphFromIpfs = async (cid: string) => {
  const client = makeWeb3StorageClient();

  const res = await client.get(cid);

  if (!res?.ok) {
    throw new Error(`failed to get ${cid} - [${res?.status}] ${res?.statusText}`);
  }

  const storedFiles = await res?.files();

  const sceneFile = storedFiles.find((x) => x.name === modelFileName);

  if (!sceneFile) throw new Error('missing gltf file from archive');

  const behaviorGraphJson = storedFiles.find((x) => x.name === behaviorGraphFileName);

  if (!behaviorGraphJson) throw new Error('missing behavior grpah file from archive');

  const behaviorGraphText = await behaviorGraphJson.text();

  const graphJSON = JSON.parse(behaviorGraphText) as GraphJSON;

  return {
    sceneFile,
    graphJSON,
  };
};
