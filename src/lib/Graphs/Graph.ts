import { CustomEvent } from '../Events/CustomEvent.js';
import { Metadata } from '../Metadata.js';
import { Node } from '../Nodes/Node.js';
import { Registry } from '../Registry.js';
import { Variable } from '../Variables/Variable.js';
// Purpose:
//  - stores the node graph

export class Graph {
  public name = '';
  public readonly nodes: { [id: string]: Node } = {};
  public readonly variables: { [id: string]: Variable } = {};
  public readonly customEvents: { [id: string]: CustomEvent } = {};
  public metadata: Metadata = {};
  public readonly localNodeRegistry: { [nodeType: string]: () => Node } = {};
  public version = 0;

  constructor(public readonly registry: Registry) {}

  getNodeTypeNames(): string[] {
    const nodeTypeNames = this.registry.nodes.getAllNames();
    Object.keys(this.variables).forEach((variableId) => {
      nodeTypeNames.push(
        `event/onVariableChanged/${variableId}`,
        `action/setVariable/${variableId}`,
        `query/getVariable/${variableId}`
      );
    });
    Object.keys(this.customEvents).forEach((customEventId) => {
      nodeTypeNames.push(
        `event/onCustomEvent/${customEventId}`,
        `action/triggerCustomEvent/${customEventId}`
      );
    });
    return nodeTypeNames;
  }
}
