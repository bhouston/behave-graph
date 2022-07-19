import { NodeSocketRef } from "../Nodes/NodeSocketRef";

export class InputSocket {
    constructor(
        public uplinks = new Array<NodeSocketRef>(),
        public value: any | undefined
    ) { }
}
