import { CustomEvent } from '../Events/CustomEvent.js';
import { Metadata } from '../Metadata.js';
import { NodeConfiguration } from '../Nodes/Node.js';
import { Dependencies } from '../Nodes/NodeDefinitions.js';
import { INode } from '../Nodes/NodeInstance.js';
import { NodeDefinitionsMap } from '../Nodes/Registry/NodeDefinitionsMap.js';
import { Socket } from '../Sockets/Socket.js';
import { ValueTypeMap } from '../Values/ValueTypeMap.js';
import { Variable } from '../Values/Variables/Variable.js';

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
  values,
  dependencies = {}
}: {
  customEvents?: GraphCustomEvents;
  variables?: GraphVariables;
  values: ValueTypeMap;
  dependencies: Dependencies;
}): IGraphApi => ({
  variables,
  customEvents,
  values,
  getDependency: (id: string) => {
    const result = dependencies[id];
    if (!result)
      console.error(
        `Dependency not found ${id}.  Did you register it? Existing dependencies: ${Object.keys(
          dependencies
        )}`
      );
    return result;
  }
});
