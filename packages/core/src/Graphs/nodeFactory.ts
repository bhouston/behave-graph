import { EventNode2 } from '../Nodes/EventNode';
import { FlowNode2 } from '../Nodes/FlowNode';
import { NodeConfiguration } from '../Nodes/Node';
import { Node } from '../Nodes/Node';
import {
  EventNodeDefinition,
  IFlowNodeDefinition,
  INodeDefinitionBase,
  NodeCategory
} from '../Nodes/NodeDefinition';
import { NodeDescription2 } from '../Nodes/Registry/NodeDescription';
import { Registry } from '../Registry';
import { Socket } from '../Sockets/Socket';
import { Graph } from './Graph';

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
  nodeConfiguration: NodeConfiguration,
  graph: Graph
): Node {
  const commonProps = {
    description: new NodeDescription2({
      typeName: nodeDefinition.typeName,
      category: nodeDefinition.category,
      label: nodeDefinition.label
    }),
    inputs: toSockets(nodeDefinition.in, nodeDefinition.initialInputsVals),
    outputs: toSockets(nodeDefinition.out),
    graph
  };

  if (isFlowNode(nodeDefinition)) {
    return new FlowNode2({
      ...commonProps,
      initialState: nodeDefinition.initialState,
      triggered: nodeDefinition.triggered,
      configuration: nodeConfiguration
    });
  } else if (isEventNode(nodeDefinition)) {
    return new EventNode2({
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
  registry: Registry,
  graph: Graph
): Node => {
  let nodeDescription = undefined;
  if (registry.nodes.contains(nodeTypeName)) {
    nodeDescription = registry.nodes.get(nodeTypeName);
  }
  if (nodeDescription === undefined) {
    throw new Error(
      `no registered node descriptions with the typeName ${nodeTypeName}`
    );
  }

  const node = createNode(nodeDescription, nodeConfiguration, graph);

  node.id = nodeId;

  return node;
};
