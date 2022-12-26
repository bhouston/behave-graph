import { Registry } from '../Registry';
import { Socket } from '../Sockets/Socket';
import { NodeConfiguration } from './Node';
import { INodeDefinitionBase, SocketsDefinition } from './NodeDefinition';
import { INode, NodeType } from './NodeInstance';

function toSockets(socketConfig: SocketsDefinition): Socket[] {
  return Object.entries(socketConfig).map(([key, definition]) => {
    if (typeof definition === 'string') {
      return new Socket(definition, key);
    }
    const { valueType, defaultValue, choices } = definition;
    return new Socket(valueType, key, defaultValue, undefined, choices);
  });
}

export const makeCommonProps = (
  id: string,
  nodeType: NodeType,
  {
    typeName,
    in: inputs,
    out
  }: Pick<INodeDefinitionBase, 'typeName' | 'in' | 'out'>
): INode => ({
  id,
  typeName: typeName,
  nodeType: nodeType,
  inputs: toSockets(inputs),
  outputs: toSockets(out)
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

  return nodeDescription.factory(nodeId);
};
