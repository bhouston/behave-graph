import {
  generateTriggerTester,
  RecordedOutputType,
  RecordedWritesOrCommits
} from '../../../Nodes/testUtils';
import { Counter } from './Counter';

type RecordedWritesType = RecordedWritesOrCommits<typeof Counter.out>;

describe('Counter', () => {
  describe('when the flow node is triggered', () => {
    it('should increase the count then commit to the flow node', () => {
      // create a flow node tester

      const trigger = generateTriggerTester(Counter);

      // trigger to count 1
      trigger({
        triggeringSocketName: 'flow'
      });

      // trigger to count 2
      const recordedOutputs = trigger({
        triggeringSocketName: 'flow'
      });

      expect(recordedOutputs).toHaveLength(2);

      const expectedOutputs: RecordedWritesType = [
        {
          outputType: RecordedOutputType.write,
          socketName: 'count',
          value: 2
        },
        {
          outputType: RecordedOutputType.commit,
          socketName: 'flow'
        }
      ];

      expect(recordedOutputs).toEqual(expectedOutputs);
    });
  });
  describe('when the reset node is triggered', () => {
    it('should reset to 0 but not write to any outputs', () => {
      const trigger = generateTriggerTester(Counter);

      // trigger first count
      trigger({
        triggeringSocketName: 'flow'
      });
      // trigger to second count
      trigger({
        triggeringSocketName: 'flow'
      });

      // reset to 0 - should not have a write or commit
      const resetRecordedOutputs = trigger({
        triggeringSocketName: 'reset'
      });

      // make sure there were no recorded outputs
      expect(resetRecordedOutputs).toHaveLength(0);

      // trigger a counter increment; it should have a write with value one and commit to the flow
      const outputs = trigger({ triggeringSocketName: 'flow' });
      const expectedOutputs: RecordedWritesType = [
        {
          outputType: RecordedOutputType.write,
          socketName: 'count',
          value: 1
        },
        {
          outputType: RecordedOutputType.commit,
          socketName: 'flow'
        }
      ];

      expect(outputs).toEqual(expectedOutputs);
    });
  });
});
