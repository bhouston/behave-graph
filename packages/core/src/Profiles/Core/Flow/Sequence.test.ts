import {
  generateTriggerTester,
  RecordedOutputType,
  RecordedWritesOrCommits
} from '../../../Nodes/testUtils';
import { Sequence } from './Sequence.js';

type RecordedWritesType = RecordedWritesOrCommits<typeof Sequence.out>;

describe('Sequence', () => {
  it('it triggeres output flows for each element in sequence when triggered', () => {
    const nodeConfig = {
      numOutputs: 5
    };
    const trigger = generateTriggerTester(Sequence, nodeConfig);

    const outputs = trigger({
      triggeringSocketName: 'flow'
    });

    expect(outputs).toHaveLength(5);

    const expectedOutputs: RecordedWritesType = [
      {
        outputType: RecordedOutputType.commit,
        socketName: '1'
      },
      {
        outputType: RecordedOutputType.commit,
        socketName: '2'
      },
      {
        outputType: RecordedOutputType.commit,
        socketName: '3'
      },
      {
        outputType: RecordedOutputType.commit,
        socketName: '4'
      },
      {
        outputType: RecordedOutputType.commit,
        socketName: '5'
      }
    ];

    expect(outputs).toEqual(expectedOutputs);
  });
});
