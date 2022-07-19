import { NodeSocketRef } from "../Nodes/NodeSocketRef";
import { SocketSpec } from "./SocketSpec";

export class OutputSocket {
    constructor(
        public downlinks = new Array<NodeSocketRef>(),
        public value: any | undefined
    ) { }
}
