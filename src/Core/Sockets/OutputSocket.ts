import { NodeSocketRef } from "../Nodes/NodeSocketRef";

export class OutputSocket {
    constructor(
        public downlinks = new Array<NodeSocketRef>(),
        public value: any | undefined = undefined
    ) { }
}
