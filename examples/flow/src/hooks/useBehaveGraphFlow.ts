import { GraphJSON, NodeSpecJSON } from '@behave-graph/core';
import { useCallback, useEffect, useState } from 'react';
import { useEdgesState, useNodesState } from 'reactflow';

import { examplePairs } from '../flowEditor/components/LoadModal';
import { behaveToFlow } from '../flowEditor/transformers/behaveToFlow';
import { flowToBehave } from '../flowEditor/transformers/flowToBehave';
import { autoLayout } from '../flowEditor/util/autoLayout';
import { hasPositionMetaData } from '../flowEditor/util/hasPositionMetaData';

function readFileContents(file: File) {
  // eslint-disable-next-line promise/avoid-new
  return new Promise<string | ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result;

      if (!binaryStr) reject('no binary string');
      else resolve(binaryStr);
    };
    reader.readAsArrayBuffer(file);
  });
}

export const dataUrlFromFile = async (file: File) => {
  const fileContents = await readFileContents(file);
  if (fileContents) {
    if (typeof fileContents === 'string') {
      return fileContents;
    } else {
      const blobUrl = URL.createObjectURL(new Blob([fileContents]));

      return blobUrl;
    }
  }
};

export const publicUrl = (path: string) => new URL(path, import.meta.url).href;

export const emptyGraphJson = (): GraphJSON => ({});

export type ModelFile =
  | {
      fileUrl: string;
      fileType: 'url';
      fileContents: undefined;
    }
  | {
      fileUrl: undefined;
      fileType: 'uploaded';
      fileContents: string;
    };

export const fetchModelFile = async (url: string, fileName: string) => {
  // eslint-disable-next-line unicorn/no-await-expression-member
  const blob = await (await fetch(url)).blob();

  const file = new File([blob], fileName);

  return file;
};

const useBehaveGraphFlow = (specJson: NodeSpecJSON[] | undefined) => {
  const [graphJson, setStoredGraphJson] = useState<GraphJSON>();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const setGraphJson = useCallback((graphJson: GraphJSON) => {
    if (!graphJson) return;

    const [nodes, edges] = behaveToFlow(graphJson);

    if (hasPositionMetaData(graphJson) === false) {
      autoLayout(nodes, edges);
    }

    setNodes(nodes);
    setEdges(edges);
    setStoredGraphJson(graphJson);
  }, []);

  useEffect(() => {
    const [, defaultGraphFile] = examplePairs[0];
    const jsonFileUrl = publicUrl(`/examples/graphs/${defaultGraphFile}`);

    (async () => {
      // eslint-disable-next-line unicorn/no-await-expression-member
      const fetched = await (await fetch(jsonFileUrl)).json();

      setGraphJson(fetched as GraphJSON);
    })();
  }, [setGraphJson]);

  useEffect(() => {
    if (!specJson) return;
    // when nodes and edges are updated, update the graph json with the flow to behave behavior
    const graphJson = flowToBehave({ nodes, edges, nodeSpecJSON: specJson });
    setStoredGraphJson(graphJson);
  }, [nodes, edges, specJson]);

  return {
    nodes,
    edges,
    onEdgesChange,
    onNodesChange,
    setGraphJson,
    graphJson
  };
};

export default useBehaveGraphFlow;
