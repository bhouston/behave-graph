enum SocketValueType {
    Eval,
    Number,
    Vector3,
    Boolean,
    String
};

class SocketDefinition {

    constructor(
        public type: SocketValueType,
        public name: string
    ) {
    }

}

// structure for defining BehaviorNodes
class NodeDefinition {

    constructor(
        public type: string,
        public name: string,
        public inputDefinitions: Array<SocketDefinition>,
        public outputDefinitions: Array<SocketDefinition>,
        public func: function(any, Map<string,any>): Map<string,any>
    ) {
    }

}

const NodeDefinitions = [

    // TRIGGERS
    //
    // TODO: Figure out how to force the evaluation of these from the outside.
    // TODO: Figure out how to set values for the outputs in a consistent way.  Add to context?  Have a set of output values pre-specified when you trigger it?
    // QQ: Should one just trigger its outputs directly rather than even evaluating it?

    new NodeDefinition(
        'trigger',
        'sceneStart',
        [],
        [new SocketDefinition(SocketValueType.Eval, 'eval')],
        (context, inputs) => {
            return new Map<string,any>().set( 'eval', true );
        }
    ),

    new NodeDefinition(
        'trigger',
        'tick',
        [],
        [new SocketDefinition(SocketValueType.Eval, 'eval')],
        (context, inputValues) => {
            const outputValues = new Map<string,any>();
            outputValues.set( 'eval', true );
            return outputValues;
        }
    ),

    new NodeDefinition(
        'trigger',
        'nodeClick',
        [],
        [new SocketDefinition(SocketValueType.Eval, 'eval'), new SocketDefinition(SocketValueType.Number, 'nodeIndex')],
        (context, inputValues) => {
            const outputValues = new Map<string,any>();
            outputValues.set( 'eval', true );
            outputValues.set( 'nodeIndex', -1 ); // TODO: Replace with real value.
            return outputValues;
        }
    ),

    // LOGIC - multiple eval outputs


    // also called "branch"
    new NodeDefinition(
        'logic',
        'if',
        [new SocketDefinition(SocketValueType.Eval, 'eval'), new SocketDefinition(SocketValueType.Boolean, 'condition')],
        [new SocketDefinition(SocketValueType.Eval, 'true'), new SocketDefinition(SocketValueType.Eval, 'false')],
        (context, inputValues) => {
            // form 1:
            const outputValues = new Map<string,any>();
            if( inputValues.get('condition') ) {
                outputValues.set( 'true', true );
            }
            else {
                outputValues.set( 'false', true );
            }
            return outputValues;

        }
    ),

    // ASYNC - asynchronous evaluation

    // also called "delay"
    new NodeDefinition(
        'logic',
        'sleep',
        [new SocketDefinition(SocketValueType.Eval, 'eval'), new SocketDefinition(SocketValueType.Number, 'milliseconds')],
        [new SocketDefinition(SocketValueType.Eval, 'eval')],
        (context, inputValues) => {
            // TODO: return a promise that results with an async delay - Wayne can you help with this?
            const outputValues = new Map<string,any>();
            outputValues.set( 'eval', true );
            return outputValues;
        }
    ),

    // https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/FlowControl/
    new NodeDefinition(
        'logic',
        'sequence',
        [new SocketDefinition(SocketValueType.Eval, 'eval')],
        [new SocketDefinition(SocketValueType.Eval, '1'), new SocketDefinition(SocketValueType.Eval, '2'), new SocketDefinition(SocketValueType.Eval, '2')],
        (context, inputValues) => {
            // these outputs are fired sequentially in an async fashion but without delays.  Thus a promise is returned and it continually returns a promise until each of the sequences has been executed.
            const outputValues = new Map<string,any>();
            outputValues.set('1', true );
            return outputValues;

        }
    ),

    new NodeDefinition(
        'logic',
        'forloop',
        [new SocketDefinition(SocketValueType.Eval, 'eval'), new SocketDefinition(SocketValueType.Number, 'startIndex'), new SocketDefinition(SocketValueType.Number, 'endIndex')],
        [new SocketDefinition(SocketValueType.Eval, 'loopBody'), new SocketDefinition(SocketValueType.Number, 'index'), new SocketDefinition(SocketValueType.Eval, 'completed')],
        (context, inputValues) => {

            // TODO: Figure out how to have multiple multiple "loop" evals each with an index
            // and then, once done, eval "complete"
            const outputValues = new Map<string,any>();
            outputValues.set('loopBody', true );
            outputValues.set('index', inputValues.get("startIndex") );
            return outputValues;

        }
    ),

    // MATH - note, no evals.

    new NodeDefinition(
        'math',
        'random',
        [],
        [new SocketDefinition(SocketValueType.Number, 'sample')],
        (context, inputValues) => {

            const outputValues = new Map<string,any>();
            outputValues.set("sample", Math.random() );
            return outputValues;

        }
    ),
    new NodeDefinition(
        'math',
        'add',
        [new SocketDefinition(SocketValueType.Number, 'a'), new SocketDefinition(SocketValueType.Number, 'b')],
        [new SocketDefinition(SocketValueType.Number, 'sum')],
        (context, inputValues) => {
            const outputValues = new Map<string,any>();
            outputValues.set( 'sum', inputValues.get('a') + inputValues.get('b') );
            return outputValues;
        }
    ),

    // ACTIONS

    new NodeDefinition(
        'action',
        'debugOutput',
        [new SocketDefinition(SocketValueType.Eval, 'eval'), new SocketDefinition(SocketValueType.String, 'text')],
        [new SocketDefinition(SocketValueType.Eval, 'eval')],
        (context, inputValues) => {

            console.log('Debug Output: ' + inputValues.get('text') );

            const outputValues = new Map<string,any>();
            outputValues.set( 'eval', true );
            return outputValues;
        }
    ),
    new NodeDefinition(
        'action',
        'show',
        [new SocketDefinition(SocketValueType.Eval, 'eval'), new SocketDefinition(SocketValueType.Number, 'nodeIndex')],
        [new SocketDefinition(SocketValueType.Eval, 'eval')],
        (context, inputValues) => {

            // const node = context.getSceneNodeByIndex(inputs['node']);
            // node.visible = false;
            const outputValues = new Map<string,any>();
            outputValues.set( 'eval', true );
            return outputValues;

        }
    ),
    new NodeDefinition(
        'action',
        'hide',
        [new SocketDefinition(SocketValueType.Eval, 'eval'), new SocketDefinition(SocketValueType.Number, 'nodeIndex')],
        [new SocketDefinition(SocketValueType.Eval, 'eval')],
        (context, inputValues) => {

            const outputValues = new Map<string,any>();
            outputValues.set( 'eval', true );
            return outputValues;
           //const node = context.getSceneNodeByIndex(inputs['node']);
            //node.visible = true;
            return { eval: true };

        }
    ),
    new NodeDefinition(
        'action',
        'translate',
        [new SocketDefinition(SocketValueType.Eval, 'eval'), new SocketDefinition(SocketValueType.Number, 'nodeIndex'), new SocketDefinition(SocketValueType.Vector3, 'offset')],
        [new SocketDefinition(SocketValueType.Eval, 'eval')],
        (context, inputValues) => {

            const outputValues = new Map<string,any>();
            outputValues.set( 'eval', true );
            return outputValues;
           //const node = context.getSceneNodeByIndex(inputs['node']);
            //node.translation.add(inputs['offset']);
            return { eval: true };

        }
    ),
    new NodeDefinition(
        'action',
        'rotation',
        [new SocketDefinition(SocketValueType.Eval, 'eval'), new SocketDefinition(SocketValueType.Number, 'nodeIndex'), new SocketDefinition(SocketValueType.Vector3, 'delta')],
        [new SocketDefinition(SocketValueType.Eval, 'eval')],
        (context, inputValues) => {

            const outputValues = new Map<string,any>();
            outputValues.set( 'eval', true );
            return outputValues;
           //const node = context.getSceneNodeByIndex(inputs['node']);
            //node.rotation.add(inputs['eulerDelta']);
            return { eval: true };

        }
    ),
    new NodeDefinition(
        'action',
        'scale',
        [new SocketDefinition(SocketValueType.Eval, 'eval'), new SocketDefinition(SocketValueType.Number, 'nodeIndex'), new SocketDefinition(SocketValueType.Vector3, 'factor')],
        [new SocketDefinition(SocketValueType.Eval, 'eval')],
        (context, inputValues) => {

            const outputValues = new Map<string,any>();
            outputValues.set( 'eval', true );
            return outputValues;
           //const node = context.getSceneNodeByIndex(inputs['node']);
            //node.scale.multiplyByVector(inputs['factor']);
            return { eval: true };

        }
    ),
];

// sort in alphabetical order
NodeDefinitions.sort((a, b) => (a.type.localeCompare(b.type)));


class NodeInput {

    constructor( 
        public definition: SocketDefinition,
        public nodeIndex: number | undefined,
        public outputName: string | undefined,
        public value: any | undefined,
    ) {
    }

}

class NodeOutput {

    constructor(
        public definition: SocketDefinition
    ) {
    }

}

class Node {

    public outputs: Map<string,NodeOutput>;

    constructor(
        public index: number,
        public definition: NodeDefinition,
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
class NodeEvalContext {

    constructor() {
    }

    log(text: string) {
        console.log(text);
    }

}

// Purpose:
//  - stores the node graph
class Graph {
    public name: string = "";
    public nodes: Node[] = [];

}

// Purpose:
//  - loads a node graph
class GraphLoader {

    public graph = new Graph();

    constructor() {
    }

    parse(json: any) {

        const nodesJson = json;

        // create new BehaviorNode instances for each node in the json.
        for (let i = 0; i < nodesJson.length; i++) {

            const nodeJson = nodesJson[i];
            const nodeType = nodeJson['type'];
            const definitions = NodeDefinitions.filter((item) => (item.type === nodeType));

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

class GraphEvaluator {

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


const behaviorExample = [
    {
        'type': 'trigger/sceneStart'
    },
    {
        'type': 'action/debugOutput',
        'inputs': {
            'eval': { 'type': 'uplink', 'nodeIndex': 0, 'outputName': 'execute' },
            'text': { 'type': 'constant', 'value': 'Hello World!' }
        }
    }
];

const behaviorExample2 = [
    {
        'type': 'trigger/sceneStart'
    },
    {
        'type': 'action/setter',
        'inputs': {
            'eval': { 'type': 'uplink', 'nodeIndex': 0, 'outputName': 'execute' },
            'jsonPointer': { 'type': 'constant', 'value': '/node/0/translation' },
            'value': { 'type': 'constant', 'value': [3.0, 1.0, 1.0] }
        }
    }
];


class BehaviorTest {

    constructor() {
        this.parser = new BehaviorParser();
        this.behavior = parser.behavior;
    }

    load(json) {
        parser.parse(json);
    }

    init() {
        behavior.trigger("trigger/sceneStart");
    }

    tick() {
        behavior.trigger("trigger/tick");
    }

    executeSteps(maximumSteps) {
        this.behavior.executeSteps(maximumSteps);
    }

}

export { ... };

