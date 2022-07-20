import { Graph } from "./Graph";
import { Node } from "../Nodes/Node";
import { SocketValueType } from "../Sockets/SocketValueType";
import { NodeEvalContext } from "../Nodes/NodeEvalContext";


export class GraphEvaluator {

    public nodeWorkQueue: Node[] = [];

    constructor(public graph: Graph) {
    }

    trigger(triggerName: string): number {

        // look up any nodes with this trigger name and add them to the executionQueue
        const triggerNodes = this.graph.nodes.filter((item) => (item.nodeSpec.type === triggerName));

        if (triggerNodes.length > 0) {
            // add to the back of the queue
            this.nodeWorkQueue.push(...triggerNodes);
        }

        // inform how many trigger nodes were triggered
        return triggerNodes.length;

    }

    prioritizeNode(node: Node) {

        // remove from the queue if it is exists
        this.nodeWorkQueue = this.nodeWorkQueue.filter((item) => (item !== node));

        // add to front of queue
        this.nodeWorkQueue.unshift(node);

    }

    // resolve non-execution inputs so that each has a value stored in them.  Then and only then we can execute the node's function.
    // TODO: This needs to resolve immediately and not queue ndoes or prioritize them.
    // BUG: This needs to evaluate the subgraph to resolve the values of this node immediately, rather than any delayed or work-queue mediated execution.
    resolveInputs(node: Node): number {

        let unresolvedInputs = 0;

        node.inputSockets.forEach((inputSocket, name) => {

            const inputSocketSpec = node.nodeSpec.inputSocketSpecs.get( name );
            if( inputSocketSpec === undefined ) throw new Error( `can not find spec by name`);

            // no need to resolve execution inputs.
            if (inputSocketSpec.valueType === SocketValueType.Eval) {
                return;
            }

            // if the input has a value, it is resolved
            if (inputSocket.value !== undefined) {
                return;
            }

            // otherwise follow uplinks...
            if (inputSocket.uplinks.length > 0 ) {
                if( inputSocket.uplinks.length > 1 ) throw new Error( `non-eval uplinks must number 1` );
                const uplink = inputSocket.uplinks[0];
                const uplinkNode = this.graph.nodes[uplink.nodeIndex];
                this.prioritizeNode(uplinkNode);
                unresolvedInputs++;
            }

        });

        return unresolvedInputs;

    }

    // returns the number of new execution steps created as a result of this one step
    executeStep(): number {

        // no work waiting!
        if (this.nodeWorkQueue.length === 0) {
            return 0;
        }

        // peak at the next node in the queue
        const nextNode = this.nodeWorkQueue[0];
        // resolve inputs if they are not.  If all are resolved, function returns 0, and we can execute it.
        if (this.resolveInputs(nextNode) > 0) {

            // WARNING: this is an infinite loop - this doesn't work.
            return this.executeStep();

        }

        // pop off item
        if ( this.nodeWorkQueue.shift() !== nextNode) throw new Error('should not happen');

        // collect all inputs, while clearing their values.
        // TODO: could this be replaced by a map?
        let inputValues = new Map<string,any>();

        nextNode.inputSockets.forEach((inputSocket, name) => {
            if (inputSocket.value !== undefined) {
                inputValues.set(name, inputSocket.value );
                delete inputSocket.value;
            }
        });

        console.log('inputs: ', inputValues);
        console.log(`type: ${nextNode.nodeSpec.type}`);

        // this is where the promise would be;
        const context = new NodeEvalContext();
        const outputValues = nextNode.nodeSpec.func(context, inputValues);

        console.log('outputs: ', outputValues);

        // push results to the inputs of downstream nodes.
        // TODO: ensure all non-eval outputs have values.  Otherwise throw an error.
        outputValues.forEach((outputValue, outputName) => {
            const outputSocket = nextNode.outputSockets.get( outputName );
            if( outputSocket === undefined ) throw new Error( `can not be undefined`);
            const outputSocketSpec = nextNode.nodeSpec.outputSocketSpecs.get( outputName );
            if( outputSocketSpec === undefined ) throw new Error( `can not be undefined`);

            if( outputSocketSpec.valueType === SocketValueType.Eval ) {

                if( outputSocket.downlinks.length > 1 ) throw new Error( `eval downlinks must = 1` );

                outputSocket?.downlinks.forEach( nodeSocketRef => {
                    const downlinkNode = this.graph.nodes[ nodeSocketRef.nodeIndex ];

                    // no values explicitly passed down links, all values are pulled when needed.

                    // if type is eval, ensure node is queued up.
                    this.nodeWorkQueue.push(downlinkNode);
                });

            }
            else {
                // store the output value for immediate evaluation purposes - this is only done on eval output sockets.
                outputSocket.value = outputValue;
            }
    

        });

        return 1;
    }

    executeSteps(maximumSteps: number): number {
        let stepsExecuted = 0;
        while ((maximumSteps - stepsExecuted) > 0) {
            if (this.executeStep() === 0)
                break;
            stepsExecuted++;
        }
        return stepsExecuted;
    }

}