import { SocketValueType } from '../../Core/Sockets/SocketValueType';
import SocketSpec from '../../Specs/Sockets/SocketSpec';
import NumberSocketSpec from '../../Specs/Sockets/NumberSocketSpec';
import StringSocketSpec from '../../Specs/Sockets/StringSocketSpec';
import EvalSocketSpec from '../../Specs/Sockets/EvalSocketSpec';
import NodeSpec from '../../Specs/Nodes/NodeSpec';
import { NodeSpecRegistry } from '../NodeSpecRegistry';


export default function registerDefaultActions(nodeSpecRegistry: NodeSpecRegistry) {

    nodeSpecRegistry.add(
        new NodeSpec(
            'action',
            'nodeTranslate',
            [
                new EvalSocketSpec(),
                new NumberSocketSpec('nodeIndex'),
                new NumberSocketSpec('xTranslation'),
                new NumberSocketSpec('yTranslation'),
                new NumberSocketSpec('zTranslation'),
            ],
            [new EvalSocketSpec()],
            (context, inputValues) => {
                const outputValues = new Map<string, any>();
                outputValues.set('eval', true);
                return outputValues;
                // const node = context.getSceneNodeByIndex(inputs['node']);
                // node.translation.add(inputs['offset']);
                // return { eval: true };
            },
        ),
    );

    nodeSpecRegistry.add(
        new NodeSpec(
            'action',
            'nodeRotation',
            [
                new EvalSocketSpec(),
                new NumberSocketSpec('nodeIndex'),
                new NumberSocketSpec('xRotation'),
                new NumberSocketSpec('yRotation'),
                new NumberSocketSpec('zRotation'),
            ],
            [new EvalSocketSpec()],
            (context, inputValues) => {
                const outputValues = new Map<string, any>();
                outputValues.set('eval', true);
                return outputValues;
                // const node = context.getSceneNodeByIndex(inputs['node']);
                // node.rotation.add(inputs['eulerDelta']);
                // return { eval: true };
            },
        ),
    );

    nodeSpecRegistry.add(
        new NodeSpec(
            'action',
            'nodeScale',
            [
                new EvalSocketSpec(),
                new NumberSocketSpec('nodeIndex'),
                new NumberSocketSpec('xScale'),
                new NumberSocketSpec('yScale'),
                new NumberSocketSpec('zScale'),
            ],
            [new EvalSocketSpec()],
            (context, inputValues) => {
                const outputValues = new Map<string, any>();
                outputValues.set('eval', true);
                return outputValues;
                // const node = context.getSceneNodeByIndex(inputs['node']);
                // node.scale.multiplyByVector(inputs['factor']);
                // return { eval: true };
            },
        ),
    );