import { Node } from "../Nodes/Node";
import { NodeSocketRef } from "../Nodes/NodeSocketRef";
import { InputSocket } from "../Sockets/InputSocket";
import { OutputSocket } from "../Sockets/OutputSocket";

// Purpose:
//  - stores the node graph

export class Graph {
    public name: string = "";
    public nodes: Node[] = [];

    getInputSocket( nodeSocketRef: NodeSocketRef ): InputSocket {
        const node = this.nodes[ nodeSocketRef.nodeIndex ];
        const inputSocket = node.inputSockets.get( nodeSocketRef.socketName );
        if( inputSocket === undefined ) throw new Error( `all node socket refs must resolve` );
        return inputSocket;
    }

    getOutputSocket( nodeSocketRef: NodeSocketRef ): OutputSocket {
        const node = this.nodes[ nodeSocketRef.nodeIndex ];
        const outputSocket = node.outputSockets.get( nodeSocketRef.socketName );
        if( outputSocket === undefined ) throw new Error( `all node socket refs must resolve` );
        return outputSocket;
    }
}
