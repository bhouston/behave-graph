import { Registry } from '../Registry';
import { Socket } from '../Sockets/Socket';
import { NodeConfiguration } from './Node';
import {
  EventNodeDefinition,
  IFlowNodeDefinition,
  INodeDefinitionBase,
  NodeCategory
} from './NodeDefinition';
import { EventNodeInstance, FlowNodeInstance, INode } from './NodeInstance';

type AnyInOut = Record<string, string>;

function isFlowNode(
  nodeDefinition: INodeDefinitionBase
): nodeDefinition is IFlowNodeDefinition<AnyInOut, AnyInOut, AnyInOut> {
  if (nodeDefinition.category === NodeCategory.Flow) {
    return true;
  }
  return false;
}

function isEventNode(
  nodeDefinition: INodeDefinitionBase
): nodeDefinition is EventNodeDefinition<AnyInOut, AnyInOut, AnyInOut> {
  if (nodeDefinition.category === NodeCategory.Event) {
    return true;
  }
  return false;
}

function toSockets(
  socketConfig: AnyInOut,
  initialInputsVals?: Record<string, any>
): Socket[] {
  return Object.entries(socketConfig).map(
    ([key, socketValueType]) =>
      new Socket(socketValueType, key, initialInputsVals?.[key])
  );
}

/***
 take the node definition and config, and creates an instance of a node.
 */
function createNode(
  nodeDefinition: INodeDefinitionBase,
  nodeConfiguration: NodeConfiguration
): INode {
  const commonProps: INode = {
    id: '',
    typeName: nodeDefinition.typeName,
    category: nodeDefinition.category,
    inputs: toSockets(nodeDefinition.in, nodeDefinition.initialInputsVals),
    outputs: toSockets(nodeDefinition.out)
  };

  if (isFlowNode(nodeDefinition)) {
    return new FlowNodeInstance({
      ...commonProps,
      initialState: nodeDefinition.initialState,
      triggered: nodeDefinition.triggered
    });
  } else if (isEventNode(nodeDefinition)) {
    return new EventNodeInstance({
      ...commonProps,
      init: nodeDefinition.init,
      dispose: nodeDefinition.dispose,
      initialState: nodeDefinition.initialState
    });
  }

  throw new Error('Function not implemented.');
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

  const node = createNode(nodeDescription, nodeConfiguration);

  node.id = nodeId;

  return node;
};
