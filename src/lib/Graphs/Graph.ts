import { CustomEvent } from '../Events/CustomEvent.js';
import { generateUuid } from '../generateUuid.js';
import { Metadata } from '../Metadata.js';
import { Node } from '../Nodes/Node.js';
import { NodeTypeRegistry } from '../Nodes/NodeTypeRegistry.js';
import { OnCustomEvent } from '../Profiles/Core/CustomEvents/OnCustomEvent.js';
import { TriggerCustomEvent } from '../Profiles/Core/CustomEvents/TriggerCustomEvent.js';
import { VariableGet } from '../Profiles/Core/Variables/VariableGet.js';
import { VariableSet } from '../Profiles/Core/Variables/VariableSet.js';
import { Registry } from '../Registry.js';
import { Variable } from '../Variables/Variable.js';
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
    Object.keys(this.variables).forEach((variableId) => {
      this.dynamicNodeRegistry.register(
        VariableGet.GetDescription(this, variableId),
        VariableSet.GetDescription(this, variableId)
      );
    });
    // re-add custom event nodes
    Object.keys(this.customEvents).forEach((customEventId) => {
      this.dynamicNodeRegistry.register(
        OnCustomEvent.GetDescription(this, customEventId),
        TriggerCustomEvent.GetDescription(this, customEventId)
      );
    });
  }
  createNode(nodeTypeName: string, nodeId: string = generateUuid()): Node {
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
    const node = nodeDescription.factory(nodeDescription, this);
    node.id = nodeId;
    this.nodes[nodeId] = node;
    return node;
  }
}
