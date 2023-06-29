import {
  generateTriggerTester,
  RecordedOutputType,
  RecordedWritesOrCommits
} from '../../../Nodes/testUtils.js';
import { Gate } from './Gate.js';

type RecordedWritesType = RecordedWritesOrCommits<typeof Gate.out>;

const generateTrigger = () => generateTriggerTester(Gate);

const flowTriggeredOutput: RecordedWritesType = [
  {
    outputType: RecordedOutputType.commit,
    socketName: 'flow'
  }
];

describe('Gate', () => {
  describe('when the `flow` node is triggered', () => {
    describe('when the gate starts closed', () => {
      const inputVals = {
        startClosed: true
      };
      it('does nothing', () => {
        const trigger = generateTrigger();
        const outputs = trigger({
          triggeringSocketName: 'flow',
          inputVals
        });

        expect(outputs).toHaveLength(0);
      });
      describe('when the gate is opened', () => {
        it('commits to the flow output', () => {
          const trigger = generateTrigger();

          // initial trigger
          trigger({
            triggeringSocketName: 'flow',
            inputVals
          });

          trigger({ triggeringSocketName: 'open', inputVals });

          const outputs = trigger({ triggeringSocketName: 'flow', inputVals });

          expect(outputs).toEqual(flowTriggeredOutput);
        });
      });
    });
    describe('when the gate starts opened (by default)', () => {
      it('commits to the flow output', () => {
        const trigger = generateTrigger();

        const outputs = trigger({
          triggeringSocketName: 'flow'
        });

        expect(outputs).toHaveLength(1);

        expect(outputs).toEqual(flowTriggeredOutput);
      });
      describe('when the gate is closed', () => {
        it('does nothing', () => {
          const trigger = generateTrigger();

          trigger({
            triggeringSocketName: 'flow'
          });

          // close the gate
          trigger({ triggeringSocketName: 'close' });

          // triggering shouldn't do anything
          expect(trigger({ triggeringSocketName: 'flow' })).toHaveLength(0);
        });
      });
    });
    describe('when the gate is toggled', () => {
      it('will commit if it should be opened', () => {
        const trigger = generateTrigger();

        // by default, something should trigger
        expect(trigger({ triggeringSocketName: 'flow' })).toEqual(
          flowTriggeredOutput
        );

        trigger({ triggeringSocketName: 'toggle' });
        expect(trigger({ triggeringSocketName: 'flow' })).toHaveLength(0);

        trigger({ triggeringSocketName: 'toggle' });
        expect(trigger({ triggeringSocketName: 'flow' })).toEqual(
          flowTriggeredOutput
        );
      });
    });
  });
});
