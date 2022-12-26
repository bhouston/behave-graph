import { Registry } from '../Registry';
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
  nodeConfig: NodeConfiguration
): Socket[] {
  // if sockets definition is dynamic, then use the node config to generate it;
  // otherwise, use the static definition
  if (typeof socketConfigOrFactory === 'function') {
    const { sockets, keys } = socketConfigOrFactory(nodeConfig);

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
  nodeConfig: NodeConfiguration
): INode => ({
  id,
  typeName: typeName,
  nodeType: nodeType,
  inputs: makeOrGenerateSockets(inputs, nodeConfig),
  outputs: makeOrGenerateSockets(out, nodeConfig)
});

/***
  Looks up the node definition in the registry, and uses that definition to create a node.
 */
export const createNodeUsingRegistryDefinition = (
  nodeTypeName: string,
  nodeId: string,
  nodeConfiguration: NodeConfiguration,
  registry: Registry
): INode => {
  let nodeDescription = undefined;
  if (registry.nodes.contains(nodeTypeName)) {
    nodeDescription = registry.nodes.get(nodeTypeName);
  }
  if (nodeDescription === undefined) {
    throw new Error(
      `no registered node descriptions with the typeName ${nodeTypeName}`
    );
  }

  return nodeDescription.factory(nodeId, nodeConfiguration);
};
