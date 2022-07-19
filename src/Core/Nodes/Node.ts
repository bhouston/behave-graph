import { NodeSpec } from "./NodeSpec";
import { InputSocket } from "../Sockets/InputSocket";
import { OutputSocket } from "../OutputSocket";


export class Node {
    public outputs = new Map<string, OutputSocket>();

    constructor(
        public id: string,
        public definition: NodeSpec,
        public inputs: Map<string, InputSocket>
    ) {
        // initialize node outputs based on the specification
        this.definition.outputDefinitions.forEach((outputDefinition) => {
            this.outputs.set( outputDefinition.name, new OutputSocket(outputDefinition) );
        });
    }
}
