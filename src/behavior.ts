

class NodeInput {

    constructor( 
        public definition: SocketSpec,
        public nodeIndex: number | undefined,
        public outputName: string | undefined,
        public value: any | undefined,
    ) {
    }

}

class NodeOutput {

    constructor(
        public definition: SocketSpec
    ) {
    }

}

class Node {

    public outputs: Map<string,NodeOutput>;

    constructor(
        public index: number,
        public definition: NodeSpec,
        public inputs: { [key:string]: NodeInput }) {

        this.outputs = {};
        this.definition.outputDefinitions.forEach((outputDefinition) => {
            this.outputs[outputDefinition.name] = new NodeOutput( outputDefinition );
        });
    }
}


// Purpose:
//  - Avoid nodes having to access globals to referene the scene or trigger loaders.
//  - Everything should be accessible via this context.
export class NodeEvalContext {

    constructor() {
    }

    log(text: string) {
        console.log(text);
    }

}

// Purpose:
//  - stores the node graph
export class Graph {
    public name: string = "";
    public nodes: Node[] = [];

}

// Purpose:
//  - loads a node graph
export class GraphLoader {

    public graph = new Graph();

    constructor() {
    }

    parse(json: any) {

        const nodesJson = json;

        // create new BehaviorNode instances for each node in the json.
        for (let i = 0; i < nodesJson.length; i++) {

            const nodeJson = nodesJson[i];
            const nodeType = nodeJson['type'];
            const definitions = NodeSpecifications.filter((item) => (item.type === nodeType));

            if (definitions.length <= 0) {

                throw new Error(`Can not find Behavior Node Definition for ${nodeType}`);

            }
            if (definitions.length > 1) {

                throw new Error(`Too many matching Behavior Node Definition for ${nodeType}`);

            }

            this.graph.nodes.push(new Node(i, definitions[0], nodeJson['inputs']);

        }

        // connect up the graph edges from BehaviorNode inputs to outputs.  This is required to follow execution
        this.graph.nodes.forEach((node) => {
            // initialize the inputs by resolving to the reference nodes.
            node.inputs.forEach((inputName, index) => {
                const input = node.inputs[inputName];

                if (input['type'] === 'link') {
                    const uplinkNode = this.behavior.nodes[input['node']];
                    const uplinkOutput = uplink.outputs[input['output']];
                    if (!uplinkOutput.downlinks) {
                        uplinkOutput.downlinks = [];
                    }
                    uplinkOutput.downlinks.push({ node: value['node'], input: input.name })
                }
            });

        })
    }

}

export class GraphEvaluator {

    public workQueue: Node[] = [];

    constructor( public graph: Graph ) {
    }

    trigger(triggerName: string): number {

        // look up any nodes with this trigger name and add them to the executionQueue
        const triggerNodes = this.graph.nodes.filter((item) => (item.definition.type === triggerName));

        if (triggerNodes.length > 0) {
            // add to the back of the queue
            this.workQueue.push(...triggerNodes);
        }

        // inform how many trigger nodes were triggered
        return triggerNodes.length;

    }

    prioritizeNode(node: Node) {

        // remove from the queue if it is exists
        this.workQueue = this.workQueue.filter((item) => (item !== node));

        // add to front of queue
        this.workQueue.unshift(node);

    }

    // resolve non-execution inputs so that each has a value stored in them.  Then and only then we can execute the node's function.
    resolveInputs(node: Node) {

        let unresolvedInputs = 0;

        node.inputs.forEach((inputName: string, index: number) => {

            const inputDefinition = node.definition.inputDefinitions.find((item) => { item.name === inputName });
            const input = node.inputs[inputName];

            // no need to resolve execution inputs.
            if (inputDefinition.type === SocketValueType.Eval) {
                continue;
            }

            // if the input has a value, it is resolved
            if (input.value !== undefined) {
                continue;
            }

            // otherwise follow uplinks...
            if (input.type === 'uplink') {:
                var sourceNode = this.graph.nodes[input.nodeIndex];
                this.prioritizeNode(sourceNode);
                unresolvedInputs++;
            }

        });

        return unresolvedInputs;

    }

    // returns the number of new execution steps created as a result of this one step
    executeStep() {

        // no work waiting!
        if (this.workQeueue.length === 0) {
            return 0;
        }

        // look at the next item in the queue
        const peekNextItem = this.workQueue[0];

        // resolve inputs if they are not.  If all are resolved, function returns 0, and we can execute it.
        if (this.resolveInputs(peekNextItem) > 0) {

            return this.executeStep();

        }

        // pop off item
        const node = this.workQueue.shift();
        if (peekNextItem !== node) {
            throw new Error('should not happen');
        }

        // collect all inputs, while clearing their values.
        // TODO: could this be replaced by a map?
        let inputValues = {};
        node.inputs.forEach((inputName, index) => {

            const input = node.inputs[inputName];

            if (input.value !== undefined) {

                inputValues[input.name] = input.value;
                delete input.value;

            }

        });

        console.log('inputs: ', inputValues);
        console.log(`type: ${nextItem.definition.type}`);

        // this is where the promise would be;
        const outputs = node.definition.func(inputValues);

        console.log('outputs: ', outputs);

        // push results to the inputs of downstream nodes.
        // TODO: ensure all non-eval outputs have values.  Otherwise throw an error.
        outputs.forEach((output, outputIndex) => {

            if (output.downlinks !== undefined) {

                output.downlinks.forEach((downLinks) => {

                    var downlinkNode = this.nodes[downlinks.nodeIndex];

                    if (output.value !== undefined) {

                        downlinkNode.inputs[downlinkNode.inputName].value = output.value;

                    }
                    else {

                        if (node.definition.outputs[output.name] !== SocketValueType.Eval) {

                            throw new Error("outputs without values must be execution");

                        }

                        this.workQueue.push(downlinkNode);
                    }

                });

            }

        });

        return 1;
    }

    executeSteps(maximumSteps: number): number {
        let stepsExecuted = 0;
        while ((maximumSteps - stepsExecuted) > 0) {
            if (this.executeStep() === 0) break;
            stepsExecuted++;
        }
        return stepsExecuted;
    }

}
