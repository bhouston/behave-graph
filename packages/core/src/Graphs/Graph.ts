import { CustomEvent } from '../Events/CustomEvent';
import { generateUuid } from '../generateUuid';
import { Metadata } from '../Metadata';
import { NodeConfiguration } from '../Nodes/Node';
import { INode } from '../Nodes/NodeInstance';
import { NodeDefinition } from '../Nodes/Registry/NodeTypeRegistry';
import { IRegistry, Registry } from '../Registry';
import { Variable } from '../Variables/Variable';
// Purpose:
//  - stores the node graph

export interface IGraphApi {
  readonly variables: { [id: string]: Variable };
  readonly customEvents: { [id: string]: CustomEvent };
  readonly values: Registry['values'];
  readonly getDependency: <T>(id: string) => T;
}

export class Graph {
  public name = '';
  // TODO: think about whether I can replace this with an immutable strategy?  Rather than having this mutable?
  public readonly nodes: { [id: string]: INode } = {};
  // TODO: think about whether I can replace this with an immutable strategy?  Rather than having this mutable?
  public readonly variables: { [id: string]: Variable } = {};
  // TODO: think about whether I can replace this with an immutable strategy?  Rather than having this mutable?
  public readonly customEvents: { [id: string]: CustomEvent } = {};
  public metadata: Metadata = {};
  public version = 0;

  constructor(public readonly registry: IRegistry) {}

  makeApi(): IGraphApi {
    return {
      variables: this.variables,
      customEvents: this.customEvents,
      values: this.registry.values,
      getDependency: (id: string) => this.registry.dependencies.get(id)
    };
  }

  createNode(
    nodeTypeName: string,
    nodeId: string = generateUuid(),
    nodeConfiguration: NodeConfiguration = {}
  ): INode {
    if (nodeId in this.nodes) {
      throw new Error(
        `can not create new node of type ${nodeTypeName} with id ${nodeId} as one with that id already exists.`
      );
    }

    let nodeDefinition: NodeDefinition | undefined = undefined;
    if (this.registry.nodes.contains(nodeTypeName)) {
      nodeDefinition = this.registry.nodes.get(nodeTypeName);
    }
    if (nodeDefinition === undefined) {
      throw new Error(
        `no registered node descriptions with the typeName ${nodeTypeName}`
      );
    }

    const graph = this.makeApi();
    const node = nodeDefinition.nodeFactory(graph, nodeConfiguration);

    this.nodes[nodeId] = node;

    node.inputs.forEach((socket) => {
      if (socket.valueTypeName !== 'flow' && socket.value === undefined) {
        socket.value = this.registry.values.get(socket.valueTypeName).creator();
      }
    });

    return node;
  }
}
