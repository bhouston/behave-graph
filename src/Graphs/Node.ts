import { NodeInput } from "./NodeInput";
import { NodeOutput } from "./NodeOutput";


export class Node {
    public outputs: Map<string, NodeOutput>;

    constructor(
        public index: number,
        public definition: NodeSpec,
        public inputs: { [key: string]: NodeInput; }
    ) {
        this.outputs = {};
        this.definition.outputDefinitions.forEach((outputDefinition) => {
            this.outputs[outputDefinition.name] = new NodeOutput(outputDefinition);
        });
    }
}
