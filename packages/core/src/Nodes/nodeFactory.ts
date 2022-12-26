import { Registry } from '../Registry';
import { Socket } from '../Sockets/Socket';
import { NodeConfiguration } from './Node';
import {
  EventNodeDefinition,
  FunctionNodeDefinition,
  IFlowNodeDefinition,
  INodeDefinitionBase,
  NodeCategory,
  SocketsDefinition
} from './NodeDefinition';
import { INode } from './NodeInstance';

const isFlowNodeDefinition = (
  nodeDefinition: INodeDefinitionBase
): nodeDefinition is IFlowNodeDefinition =>
  nodeDefinition.category === NodeCategory.Flow;

const isEventNodeDefinition = (
  nodeDefinition: INodeDefinitionBase
): nodeDefinition is EventNodeDefinition =>
  nodeDefinition.category === NodeCategory.Event;

const isFunctionNodeDefinition = (
  nodeDefinition: INodeDefinitionBase
): nodeDefinition is FunctionNodeDefinition =>
  nodeDefinition.category === NodeCategory.Function;

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
  nodeDefinition: Pick<
    INodeDefinitionBase,
    'typeName' | 'category' | 'in' | 'out'
  >
): INode => ({
  id,
  typeName: nodeDefinition.typeName,
  category: nodeDefinition.category,
  inputs: toSockets(nodeDefinition.in),
  outputs: toSockets(nodeDefinition.out)
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
