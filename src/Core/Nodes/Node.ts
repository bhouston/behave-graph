import { NodeSpec } from "./NodeSpec";
import { InputSocket } from "../Sockets/InputSocket";
import { OutputSocket } from "../Sockets/OutputSocket";


export class Node {
    public outputSockets = new Map<string, OutputSocket>();

    constructor(
        public id: string,
        public nodeSpec: NodeSpec,
        public inputSockets: Map<string, InputSocket>
    ) {
        // initialize node outputs based on the specification
        this.nodeSpec.outputSocketSpecs.forEach((outputDefinition) => {
            this.outputSockets.set( outputDefinition.name, new OutputSocket(outputDefinition) );
        });
    }
}
