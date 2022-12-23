import { CustomEvent } from '../Events/CustomEvent';
import { generateUuid } from '../generateUuid';
import { Metadata } from '../Metadata';
import { Node, NodeConfiguration } from '../Nodes/Node';
import { NodeTypeRegistry } from '../Nodes/Registry/NodeTypeRegistry';
import { OnCustomEvent } from '../Profiles/Core/CustomEvents/OnCustomEvent';
import { TriggerCustomEvent } from '../Profiles/Core/CustomEvents/TriggerCustomEvent';
import { VariableGet } from '../Profiles/Core/Variables/VariableGet';
import { VariableSet } from '../Profiles/Core/Variables/VariableSet';
import { Registry } from '../Registry';
import { Variable } from '../Variables/Variable';
// Purpose:
//  - stores the node graph

export class Graph {
  public name = '';
  // TODO: think about whether I can replace this with an immutable strategy?  Rather than having this mutable?
  public readonly nodes: { [id: string]: Node } = {};
  // TODO: think about whether I can replace this with an immutable strategy?  Rather than having this mutable?
  public readonly variables: { [id: string]: Variable } = {};
  // TODO: think about whether I can replace this with an immutable strategy?  Rather than having this mutable?
  public readonly customEvents: { [id: string]: CustomEvent } = {};
  public metadata: Metadata = {};
  public readonly dynamicNodeRegistry = new NodeTypeRegistry();
  public version = 0;

  constructor(public readonly registry: Registry) {}

  updateDynamicNodeDescriptions() {
    // delete existing nodes
    this.dynamicNodeRegistry.clear();
    // re-add variable nodes
    for (const variableId in this.variables) {
      this.dynamicNodeRegistry.register(
        VariableGet.GetDescription(this, variableId),
        VariableSet.GetDescription(this, variableId)
      );
    }
    // re-add custom event nodes
    for (const customEventId in this.customEvents) {
      this.dynamicNodeRegistry.register(
        OnCustomEvent.GetDescription(this, customEventId),
        TriggerCustomEvent.GetDescription(this, customEventId)
      );
    }
  }
  createNode(
    nodeTypeName: string,
    nodeId: string = generateUuid(),
    nodeConfiguration: NodeConfiguration = {}
  ): Node {
    if (nodeId in this.nodes) {
      throw new Error(
        `can not create new node of type ${nodeTypeName} with id ${nodeId} as one with that id already exists.`
      );
    }
    let nodeDescription = undefined;
    if (this.registry.nodes.contains(nodeTypeName)) {
      nodeDescription = this.registry.nodes.get(nodeTypeName);
    }
    if (this.dynamicNodeRegistry.contains(nodeTypeName)) {
      nodeDescription = this.dynamicNodeRegistry.get(nodeTypeName);
    }
    if (nodeDescription === undefined) {
      throw new Error(
        `no registered node descriptions with the typeName ${nodeTypeName}`
      );
    }
    const node = nodeDescription.factory(
      nodeDescription,
      this,
      nodeConfiguration
    );
    node.id = nodeId;
    this.nodes[nodeId] = node;
    node.inputs.forEach((socket) => {
      if (socket.valueTypeName !== 'flow' && socket.value === undefined) {
        socket.value = this.registry.values.get(socket.valueTypeName).creator();
      }
    });

    return node;
  }
}
