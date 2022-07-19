import { Node } from "../Nodes/Node";
import { NodeSocketRef } from "../Nodes/NodeSocketRef";
import { InputSocket } from "../Sockets/InputSocket";
import { OutputSocket } from "../Sockets/OutputSocket";

// Purpose:
//  - stores the node graph

export class Graph {
    public name: string = "";
    public nodes: Node[] = [];

    resolveInputSocketRef( nodeSocketRef: NodeSocketRef ): InputSocket | undefined {
        const node = this.nodes[ nodeSocketRef.nodeIndex ];
        return node.inputSockets.get( nodeSocketRef.socketName );
    }

    resolveOutputSocketRef( nodeSocketRef: NodeSocketRef ): OutputSocket | undefined {
        const node = this.nodes[ nodeSocketRef.nodeIndex ];
        return node.outputSockets.get( nodeSocketRef.socketName );
    }
}
