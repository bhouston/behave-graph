import { Graph } from '../../../Graphs/Graph';
import { ImmediateNode } from '../../../Nodes/ImmediateNode';
import { Node } from '../../../Nodes/Node';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';
import { inputSocketName, resultNodeName } from '../../../Nodes/Templates/keys';
import { Registry } from '../../../Registry';
import { toInteger } from './BooleanNodes';
import { toBoolean as intToBoolean } from './IntegerNodes';

const makeEmptyGraph = () => {
  return new Graph(new Registry());
};

const makeImmediateNodeWithEmptyGraph = (nodeDescription: NodeDescription) =>
  nodeDescription.factory(intToBoolean, makeEmptyGraph()) as ImmediateNode;

const setInputSocketValue = (node: Node, socketName: string, value: any) => {
  const inputSocket = node.inputs.find((socket) => socket.name === socketName);

  if (!inputSocket)
    throw new Error(`cannot find input socket with name ${socketName}`);
  inputSocket.value = value;
};

const getOutputSocketValue = (node: Node, socketName: string) => {
  const outputSocket = node.outputs.find(
    (socket) => socket.name === socketName
  );

  if (!outputSocket)
    throw new Error(`cannot find input socket with name ${socketName}`);

  return outputSocket.value;
};

describe('Boolean Conversions', () => {
  describe('math/toBoolean/integer', () => {
    let node: ImmediateNode;

    beforeEach(() => {
      node = makeImmediateNodeWithEmptyGraph(intToBoolean);
    });
    it.only('writes to the output false when the input value is 0', () => {
      setInputSocketValue(node, inputSocketName.a, 0n);
      node.exec();

      expect(getOutputSocketValue(node, resultNodeName)).toEqual(false);
    });
    it('writes to the output true when the input value is non-zero', () => {
      // set value to 1
      setInputSocketValue(node, inputSocketName.a, 1n);
      node.exec();

      expect(getOutputSocketValue(node, resultNodeName)).toEqual(true);

      // set value to 5
      setInputSocketValue(node, inputSocketName.a, 5n);
      node.exec();

      expect(getOutputSocketValue(node, resultNodeName)).toEqual(true);
    });
  });

  describe('math/toInteger/boolean', () => {
    let node: ImmediateNode;

    beforeEach(() => {
      node = makeImmediateNodeWithEmptyGraph(toInteger);
    });
    it.only('writes to the output 1 when the input value is true', () => {
      setInputSocketValue(node, inputSocketName.a, true);
      node.exec();

      const outputValue = getOutputSocketValue(node, resultNodeName);

      expect(outputValue).toEqual(1n);
    });
    it('writes to the output 0 when the input value is false', () => {
      setInputSocketValue(node, inputSocketName.a, false);
      node.exec();

      const outputValue = getOutputSocketValue(node, resultNodeName);

      expect(outputValue).toEqual(0n);
    });
  });
});
