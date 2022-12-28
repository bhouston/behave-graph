import { testExec } from '../../../Nodes/testUtils';
import { toInteger } from './BooleanNodes';
import { toBoolean as intToBoolean } from './IntegerNodes';

describe('Boolean Conversions', () => {
  describe('math/toBoolean/integer', () => {
    it('writes to the output false when the input value is 0', () => {
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
      expect(outputs['result']).toEqual(true);

      const secondResult = testExec({
        exec: intToBoolean.exec,
        // test with value to 5
        nodeInputVals: {
          a: 5n
        }
      });

      expect(secondResult['result']).toEqual(true);
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
