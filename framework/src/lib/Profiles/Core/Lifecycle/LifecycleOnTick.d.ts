import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { ILifecycleEventEmitter } from '../Abstractions/ILifecycleEventEmitter.js';
export declare class LifecycleOnTick extends Node {
    private readonly iLifecycleEmitter;
    static Description: (emitter: ILifecycleEventEmitter) => NodeDescription;
    constructor(description: NodeDescription, graph: Graph, iLifecycleEmitter: ILifecycleEventEmitter);
}
//# sourceMappingURL=LifecycleOnTick.d.ts.map