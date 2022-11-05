import { Graph } from '../Graphs/Graph.js';
import { Metadata } from '../Metadata.js';
import { Socket } from '../Sockets/Socket.js';
import { NodeDescription } from './NodeDescription.js';
import { NodeEvalContext } from './NodeEvalContext.js';
export declare class Node {
    readonly description: NodeDescription;
    readonly graph: Graph;
    readonly inputSockets: Socket[];
    readonly outputSockets: Socket[];
    readonly evalFunc: (context: NodeEvalContext) => void;
    id: string;
    label: string;
    metadata: Metadata;
    readonly flow: boolean;
    evaluateOnStartup: boolean;
    async: boolean;
    interruptibleAsync: boolean;
    constructor(description: NodeDescription, graph: Graph, inputSockets: Socket[], outputSockets: Socket[], evalFunc: (context: NodeEvalContext) => void);
    getInputSocket(socketName: string): Socket;
    getOutputSocket(socketName: string): Socket;
}
//# sourceMappingURL=Node.d.ts.map