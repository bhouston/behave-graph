import { NodeSpec, SocketValueType, SocketSpec } from "../spec";
import { GlobalNodeSpecRegistry } from "../registry";
// TRIGGERS
//
// TODO: Figure out how to force the evaluation of these from the outside.
// TODO: Figure out how to set values for the outputs in a consistent way.  Add to context?  Have a set of output values pre-specified when you trigger it?
// QQ: Should one just trigger its outputs directly rather than even evaluating it?

GlobalNodeSpecRegistry.add(
    new NodeSpec(
        'trigger',
        'sceneStart',
        [],
        [new SocketSpec(SocketValueType.Eval, 'eval')],
        (context, inputs) => {
            return new Map<string,any>().set( 'eval', true );
        }
    )
);

GlobalNodeSpecRegistry.add(
    new NodeSpec(
        'trigger',
        'tick',
        [],
        [new SocketSpec(SocketValueType.Eval, 'eval')],
        (context, inputValues) => {
            const outputValues = new Map<string,any>();
            outputValues.set( 'eval', true );
            return outputValues;
        }
    )
);

    new NodeSpec(
        'trigger',
        'nodeClick',
        [],
        [new SocketSpec(SocketValueType.Eval, 'eval'), new SocketSpec(SocketValueType.Number, 'nodeIndex')],
        (context, inputValues) => {
            const outputValues = new Map<string,any>();
            outputValues.set( 'eval', true );
            outputValues.set( 'nodeIndex', -1 ); // TODO: Replace with real value.
            return outputValues;
        }
    ),

    // LOGIC - multiple eval outputs


    // also called "branch"
    new NodeSpec(
        'logic',
        'if',
        [new SocketSpec(SocketValueType.Eval, 'eval'), new SocketSpec(SocketValueType.Boolean, 'condition')],
        [new SocketSpec(SocketValueType.Eval, 'true'), new SocketSpec(SocketValueType.Eval, 'false')],
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
    new NodeSpec(
        'logic',
        'sleep',
        [new SocketSpec(SocketValueType.Eval, 'eval'), new SocketSpec(SocketValueType.Number, 'milliseconds')],
        [new SocketSpec(SocketValueType.Eval, 'eval')],
        (context, inputValues) => {
            // TODO: return a promise that results with an async delay - Wayne can you help with this?
            const outputValues = new Map<string,any>();
            outputValues.set( 'eval', true );
            return outputValues;
        }
    ),

    // https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/FlowControl/
    new NodeSpec(
        'logic',
        'sequence',
        [new SocketSpec(SocketValueType.Eval, 'eval')],
        [new SocketSpec(SocketValueType.Eval, '1'), new SocketSpec(SocketValueType.Eval, '2'), new SocketSpec(SocketValueType.Eval, '2')],
        (context, inputValues) => {
            // these outputs are fired sequentially in an async fashion but without delays.  Thus a promise is returned and it continually returns a promise until each of the sequences has been executed.
            const outputValues = new Map<string,any>();
            outputValues.set('1', true );
            return outputValues;

        }
    ),

    new NodeSpec(
        'logic',
        'forloop',
        [new SocketSpec(SocketValueType.Eval, 'eval'), new SocketSpec(SocketValueType.Number, 'startIndex'), new SocketSpec(SocketValueType.Number, 'endIndex')],
        [new SocketSpec(SocketValueType.Eval, 'loopBody'), new SocketSpec(SocketValueType.Number, 'index'), new SocketSpec(SocketValueType.Eval, 'completed')],
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

    new NodeSpec(
        'math',
        'random',
        [],
        [new SocketSpec(SocketValueType.Number, 'sample')],
        (context, inputValues) => {

            const outputValues = new Map<string,any>();
            outputValues.set("sample", Math.random() );
            return outputValues;

        }
    ),
    new NodeSpec(
        'math',
        'add',
        [new SocketSpec(SocketValueType.Number, 'a'), new SocketSpec(SocketValueType.Number, 'b')],
        [new SocketSpec(SocketValueType.Number, 'sum')],
        (context, inputValues) => {
            const outputValues = new Map<string,any>();
            outputValues.set( 'sum', inputValues.get('a') + inputValues.get('b') );
            return outputValues;
        }
    ),

    // ACTIONS

    new NodeSpec(
        'action',
        'debugOutput',
        [new SocketSpec(SocketValueType.Eval, 'eval'), new SocketSpec(SocketValueType.String, 'text')],
        [new SocketSpec(SocketValueType.Eval, 'eval')],
        (context, inputValues) => {

            console.log('Debug Output: ' + inputValues.get('text') );

            const outputValues = new Map<string,any>();
            outputValues.set( 'eval', true );
            return outputValues;
        }
    ),
    new NodeSpec(
        'action',
        'show',
        [new SocketSpec(SocketValueType.Eval, 'eval'), new SocketSpec(SocketValueType.Number, 'nodeIndex')],
        [new SocketSpec(SocketValueType.Eval, 'eval')],
        (context, inputValues) => {

            // const node = context.getSceneNodeByIndex(inputs['node']);
            // node.visible = false;
            const outputValues = new Map<string,any>();
            outputValues.set( 'eval', true );
            return outputValues;

        }
    ),
    new NodeSpec(
        'action',
        'hide',
        [new SocketSpec(SocketValueType.Eval, 'eval'), new SocketSpec(SocketValueType.Number, 'nodeIndex')],
        [new SocketSpec(SocketValueType.Eval, 'eval')],
        (context, inputValues) => {

            const outputValues = new Map<string,any>();
            outputValues.set( 'eval', true );
            return outputValues;
           //const node = context.getSceneNodeByIndex(inputs['node']);
            //node.visible = true;
            return { eval: true };

        }
    ),
    new NodeSpec(
        'action',
        'translate',
        [new SocketSpec(SocketValueType.Eval, 'eval'), new SocketSpec(SocketValueType.Number, 'nodeIndex'), new SocketSpec(SocketValueType.Vector3, 'offset')],
        [new SocketSpec(SocketValueType.Eval, 'eval')],
        (context, inputValues) => {

            const outputValues = new Map<string,any>();
            outputValues.set( 'eval', true );
            return outputValues;
           //const node = context.getSceneNodeByIndex(inputs['node']);
            //node.translation.add(inputs['offset']);
            return { eval: true };

        }
    ),
    new NodeSpec(
        'action',
        'rotation',
        [new SocketSpec(SocketValueType.Eval, 'eval'), new SocketSpec(SocketValueType.Number, 'nodeIndex'), new SocketSpec(SocketValueType.Vector3, 'delta')],
        [new SocketSpec(SocketValueType.Eval, 'eval')],
        (context, inputValues) => {

            const outputValues = new Map<string,any>();
            outputValues.set( 'eval', true );
            return outputValues;
           //const node = context.getSceneNodeByIndex(inputs['node']);
            //node.rotation.add(inputs['eulerDelta']);
            return { eval: true };

        }
    ),
    new NodeSpec(
        'action',
        'scale',
        [new SocketSpec(SocketValueType.Eval, 'eval'), new SocketSpec(SocketValueType.Number, 'nodeIndex'), new SocketSpec(SocketValueType.Vector3, 'factor')],
        [new SocketSpec(SocketValueType.Eval, 'eval')],
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