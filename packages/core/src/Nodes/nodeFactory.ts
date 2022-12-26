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
import {
  EventNodeInstance,
  FlowNodeInstance,
  FunctionNodeInstance,
  INode
} from './NodeInstance';

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

/***
 take the node definition and config, and creates an instance of a node.
 */
function createNode(
  id: string,
  nodeDefinition: INodeDefinitionBase,
  nodeConfiguration: NodeConfiguration
): INode {
  const commonProps: INode = {
    id,
    typeName: nodeDefinition.typeName,
    category: nodeDefinition.category,
    inputs: toSockets(nodeDefinition.in),
    outputs: toSockets(nodeDefinition.out)
  };

  if (isFlowNodeDefinition(nodeDefinition)) {
    return new FlowNodeInstance({
      ...commonProps,
      initialState: nodeDefinition.initialState,
      triggered: nodeDefinition.triggered
    });
  }
  if (isEventNodeDefinition(nodeDefinition)) {
    return new EventNodeInstance({
      ...commonProps,
      init: nodeDefinition.init,
      dispose: nodeDefinition.dispose,
      initialState: nodeDefinition.initialState
    });
  }
  if (isFunctionNodeDefinition(nodeDefinition)) {
    return new FunctionNodeInstance({
      ...commonProps,
      exec: nodeDefinition.exec
    });
  }

  throw new Error(`unknown node category of ${nodeDefinition.category}`);
}

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

  return createNode(nodeId, nodeDescription, nodeConfiguration);
};
