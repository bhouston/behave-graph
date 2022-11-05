import { CustomEvent } from '../../../Events/CustomEvent.js';
import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
export declare class TriggerCustomEvent extends Node {
    readonly customEvent: CustomEvent;
    static GetDescription(graph: Graph, customEventId: string): NodeDescription;
    constructor(description: NodeDescription, graph: Graph, customEvent: CustomEvent);
}
//# sourceMappingURL=TriggerCustomEvent.d.ts.map