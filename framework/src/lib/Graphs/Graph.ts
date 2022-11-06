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

export type CustomEvents = { [id: string]: CustomEvent };
export type Variables = { [id: string]: Variable };

export function registerVariablesAndCustomEvents(
  { variables, customEvents }: Pick<Graph, 'variables' | 'customEvents'>,
  registry: NodeTypeRegistry
) {
  Object.keys(variables).forEach((variableId) => {
    registry.register(
      VariableGet.GetDescription(variables, variableId),
      VariableSet.GetDescription(variables, variableId)
    );
  });
  // re-add custom event nodes
  Object.keys(customEvents).forEach((customEventId) => {
    registry.register(
      OnCustomEvent.GetDescription(customEvents, customEventId),
      TriggerCustomEvent.GetDescription(customEvents, customEventId)
    );
  });
}

export class Graph {
  public name = '';
  // TODO: think about whether I can replace this with an immutable strategy?  Rather than having this mutable?
  public readonly nodes: { [id: string]: Node } = {};
  // TODO: think about whether I can replace this with an immutable strategy?  Rather than having this mutable?
  // TODO: think about whether I can replace this with an immutable strategy?  Rather than having this mutable?
  public metadata: Metadata = {};
  public readonly dynamicNodeRegistry: NodeTypeRegistry;
  public version = 0;

  constructor(
    public readonly registry: Registry,
    public readonly variables: Variables = {},
    public readonly customEvents: CustomEvents = {}
  ) {
    this.dynamicNodeRegistry = new NodeTypeRegistry();

    registerVariablesAndCustomEvents(
      {
        customEvents: this.customEvents,
        variables: this.variables,
      },
      this.dynamicNodeRegistry
    );
  }

  updateDynamicNodeDescriptions() {
    // delete existing nodes
    this.dynamicNodeRegistry.clear();
    // re-add variable nodes

    registerVariablesAndCustomEvents(
      {
        customEvents: this.customEvents,
        variables: this.variables,
      },
      this.dynamicNodeRegistry
    );
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
      throw new Error(`no registered node descriptions with the typeName ${nodeTypeName}`);
    }
    const node = nodeDescription.factory(nodeDescription, this);
    node.id = nodeId;
    this.nodes[nodeId] = node;
    return node;
  }
}
