import { CustomEvent } from '../Events/CustomEvent';
import { Metadata } from '../Metadata';
import { NodeConfiguration } from '../Nodes/Node';
import { INode } from '../Nodes/NodeInstance';
import { Dependencies } from '../Nodes/Registry/DependenciesRegistry';
import { NodeDefinitionsMap } from '../Nodes/Registry/NodeTypeRegistry';
import { Socket } from '../Sockets/Socket';
import { ValueTypeMap } from '../Values/ValueTypeRegistry';
import { Variable } from '../Variables/Variable';
// Purpose:
//  - stores the node graph

export interface IGraphApi {
  readonly variables: { [id: string]: Variable };
  readonly customEvents: { [id: string]: CustomEvent };
  readonly values: ValueTypeMap;
  readonly getDependency: <T>(id: string) => T | undefined;
}

export type GraphNodes = { [id: string]: INode };
export type GraphVariables = { [id: string]: Variable };
export type GraphCustomEvents = { [id: string]: CustomEvent };

export type GraphInstance = {
  name: string;
  metadata: Metadata;
  nodes: GraphNodes;
  customEvents: GraphCustomEvents;
  variables: GraphVariables;
};

export const createNode = ({
  graph,
  nodes,
  values,
  nodeTypeName,
  nodeConfiguration = {}
}: {
  graph: IGraphApi;
  nodes: NodeDefinitionsMap;
  values: ValueTypeMap;
  nodeTypeName: string;
  nodeConfiguration?: NodeConfiguration;
}) => {
  let nodeDefinition = undefined;
  if (nodes[nodeTypeName]) {
    nodeDefinition = nodes[nodeTypeName];
  }
  if (nodeDefinition === undefined) {
    throw new Error(
      `no registered node descriptions with the typeName ${nodeTypeName}`
    );
  }

  const node = nodeDefinition.nodeFactory(graph, nodeConfiguration);

  node.inputs.forEach((socket: Socket) => {
    if (socket.valueTypeName !== 'flow' && socket.value === undefined) {
      socket.value = values[socket.valueTypeName]?.creator();
    }
  });

  return node;
};

export const makeGraphApi = ({
  variables = {},
  customEvents = {},
  valuesTypeRegistry,
  dependencies = {}
}: {
  customEvents?: GraphCustomEvents;
  variables?: GraphVariables;
  valuesTypeRegistry: ValueTypeMap;
  dependencies: Dependencies;
}): IGraphApi => ({
  variables,
  customEvents,
  values: valuesTypeRegistry,
  getDependency: (id: string) => {
    const result = dependencies[id];
    if (!result)
      console.error(`Dependency not found ${id}.  Did you register it?`);
    return result;
  }
});
