import { CustomEvent } from '../Events/CustomEvent.js';
import { generateUuid } from '../generateUuid.js';
import { Metadata } from '../Metadata.js';
import { Node } from '../Nodes/Node.js';
import { TriggerCustomEvent } from '../Profiles/Core/Actions/TriggerCustomEvent.js';
import { OnCustomEvent } from '../Profiles/Core/Events/OnCustomEvent.js';
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

  constructor(public readonly registry: Registry) {}

  registerLocalNodeTypes() {
    // clear existing entries.
    Object.keys(this.localNodeRegistry).forEach((nodeType) => {
      delete this.localNodeRegistry[nodeType];
    });

    // register new local nodes
    Object.keys(this.customEvents).forEach((customEventId) => {
      this.localNodeRegistry[`event/customEvent/${customEventId}`] = () =>
        new OnCustomEvent(this, customEventId);
      this.localNodeRegistry[`action/triggerCustomEvent/${customEventId}`] =
        () => new TriggerCustomEvent(this, customEventId);
    });
  }

  createNode(nodeType: string, nodeId = generateUuid()): Node {
    if (nodeType in this.localNodeRegistry) {
      const node = this.localNodeRegistry[nodeType]();
      node.id = nodeId;
      return node;
    }
    return this.registry.nodes.create(nodeType, nodeId);
  }
}
