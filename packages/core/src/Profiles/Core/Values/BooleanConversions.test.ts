// import { Registry } from '../../Registry';

import {
  Graph,
  IGraphApi,
  Registry
} from 'packages/core/dist/behave-graph-core.cjs';

import { NodeConfiguration } from '../../../Nodes/Node';
import {
  IFunctionNodeDefinition,
  SocketNames,
  SocketsDefinition
} from '../../../Nodes/NodeDefinition';
import { NodeConfigurationDescription } from '../../../Nodes/Registry/NodeDescription';
import { toInteger } from './BooleanNodes';
import { toBoolean as intToBoolean } from './IntegerNodes';

const makeEmptyGraph = (): IGraphApi => {
  return new Graph(new Registry()).makeApi();
};

export type SocketValues<TSockets extends SocketsDefinition> = {
  [key in SocketNames<TSockets>]?: any;
};

/** Helper function to test an function node's exec and get the resulting outputs.
 * Can simulate the input socket values */
const testExec = <
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition,
  TConfig extends NodeConfigurationDescription
>({
  nodeInputVals = {},
  configuration = {},
  exec
}: {
  exec: IFunctionNodeDefinition<TInput, TOutput, TConfig>['exec'];
  configuration?: NodeConfiguration;
  nodeInputVals?: SocketValues<TInput>;
}): SocketValues<TOutput> => {
  const outputs: SocketValues<TOutput> = {};

  exec({
    read: (socketName) => nodeInputVals[socketName],
    write: (outputValueName, value) => {
      outputs[outputValueName] = value;
    },
    configuration,
    graph: makeEmptyGraph()
  });

  return outputs;
};

describe('Boolean Conversions', () => {
  describe('math/toBoolean/integer', () => {
    beforeEach(() => {
      // node = makeFunctionNodeWithEmptyGraph(intToBoolean);
    });
    it.only('writes to the output false when the input value is 0', () => {
      const outputs = testExec({
        exec: intToBoolean.exec,
        nodeInputVals: {
          a: 0n
        }
      });

      expect(outputs['result']).toEqual(false);
    });
    it('writes to the output true when the input value is non-zero', () => {
      const outputs = testExec({
        exec: intToBoolean.exec,
        // test with value 1
        nodeInputVals: {
          a: 1n
        }
      });
      // setInputSocketValue(node, 'a', 1n);
      // node.exec(node);

      expect(outputs['result']).toEqual(true);

      const secondResult = testExec({
        exec: intToBoolean.exec,
        // test with value to 5
        nodeInputVals: {
          a: 5n
        }
      });

      expect(secondResult.outputs['result']).toEqual(true);
    });
  });

  describe('math/toInteger/boolean', () => {
    it('writes to the output 1 when the input value is true', () => {
      const output = testExec({
        exec: toInteger.exec,
        nodeInputVals: {
          a: true
        }
      });
      expect(output['result']).toEqual(1n);
    });
    it('writes to the output 0 when the input value is false', () => {
      const output = testExec({
        exec: toInteger.exec,
        nodeInputVals: { a: false }
      });
      expect(output['result']).toEqual(0n);
    });
  });
});
