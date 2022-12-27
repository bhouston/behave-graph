import { IGraph } from '../Graphs/Graph';
import { Socket } from '../Sockets/Socket';
import { NodeConfiguration } from './Node';
import {
  INodeDefinitionBase,
  SocketsDefinition,
  SocketsMap
} from './NodeDefinition';
import { INode, NodeType } from './NodeInstance';

const makeSockets = <TSockets extends SocketsMap>(
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

function makeOrGenerateSockets(
  socketConfigOrFactory: SocketsDefinition,
  nodeConfig: NodeConfiguration,
  graph: IGraph
): Socket[] {
  // if sockets definition is dynamic, then use the node config to generate it;
  // otherwise, use the static definition
  if (typeof socketConfigOrFactory === 'function') {
    const { sockets, keys } = socketConfigOrFactory(nodeConfig, graph);

    return makeSockets(sockets, keys);
  }

  return makeSockets(socketConfigOrFactory, Object.keys(socketConfigOrFactory));
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
