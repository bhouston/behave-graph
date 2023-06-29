import { IGraphApi } from '../Graphs/Graph.js';
import { Socket } from '../Sockets/Socket.js';
import { NodeConfiguration } from './Node.js';
import {
  INodeDefinition,
  NodeCategory,
  SocketsDefinition,
  SocketsList,
  SocketsMap
} from './NodeDefinitions';
import { INode, NodeType } from './NodeInstance.js';

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

export function makeOrGenerateSockets(
  socketConfigOrFactory: SocketsDefinition,
  nodeConfig: NodeConfiguration,
  graph: IGraphApi
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
  nodeType: NodeType,
  {
    typeName,
    in: inputs,
    out,
    otherTypeNames = [],
    category = NodeCategory.None,
    configuration: nodeDefinitionConfiguration,
    helpDescription = '',
    label = ''
  }: Pick<
    INodeDefinition,
    | 'typeName'
    | 'in'
    | 'out'
    | 'otherTypeNames'
    | 'category'
    | 'configuration'
    | 'helpDescription'
    | 'label'
  >,
  configuration: NodeConfiguration,
  graph: IGraphApi
): INode => ({
  description: {
    typeName: typeName,
    configuration: nodeDefinitionConfiguration || {},
    category,
    otherTypeNames,
    helpDescription,
    label
  },
  nodeType: nodeType,
  inputs: makeOrGenerateSockets(inputs, configuration, graph),
  outputs: makeOrGenerateSockets(out, configuration, graph),
  configuration,
  graph
});
