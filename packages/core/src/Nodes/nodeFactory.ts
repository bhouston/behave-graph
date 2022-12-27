import { IGraph } from '../Graphs/Graph';
import { Socket } from '../Sockets/Socket';
import { NodeConfiguration } from './Node';
import {
  INodeDefinitionBase,
  SocketsDefinition,
  SocketsList,
  SocketsMap
} from './NodeDefinition';
import { INode, NodeType } from './NodeInstance';

const makeSocketsFromMap = <TSockets extends SocketsMap>(
  socketConfig: TSockets,
  keys: (keyof TSockets)[]
): Socket[] => {
  return keys.map((key) => {
    const definition = socketConfig[key];
    if (typeof definition === 'string') {
      return new Socket(definition, key as string);
    }
    const { valueType, defaultValue, choices } = definition;
    return new Socket(
      valueType,
      key as string,
      defaultValue,
      undefined,
      choices
    );
  });
};

const makeSocketsFromArray = (sockets: SocketsList) =>
  sockets.map((socket) => {
    return new Socket(
      socket.valueType,
      socket.key,
      socket.defaultValue,
      undefined,
      socket.choices
    );
  });

function makeOrGenerateSockets(
  socketConfigOrFactory: SocketsDefinition,
  nodeConfig: NodeConfiguration,
  graph: IGraph
): Socket[] {
  // if sockets definition is dynamic, then use the node config to generate it;
  // otherwise, use the static definition
  if (typeof socketConfigOrFactory === 'function') {
    const socketsConfig = socketConfigOrFactory(nodeConfig, graph);

    return makeSocketsFromArray(socketsConfig);
  }

  return makeSocketsFromMap(
    socketConfigOrFactory,
    Object.keys(socketConfigOrFactory)
  );
}

export const makeCommonProps = (
  id: string,
  nodeType: NodeType,
  {
    typeName,
    in: inputs,
    out
  }: Pick<INodeDefinitionBase, 'typeName' | 'in' | 'out'>,
  nodeConfig: NodeConfiguration,
  graph: IGraph
): INode => ({
  id,
  typeName: typeName,
  nodeType: nodeType,
  inputs: makeOrGenerateSockets(inputs, nodeConfig, graph),
  outputs: makeOrGenerateSockets(out, nodeConfig, graph),
  configuration: nodeConfig,
  graph
});
