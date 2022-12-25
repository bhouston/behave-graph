import {
  makeEventNodeDefinition,
  NodeCategory
} from 'packages/core/src/Nodes/NodeDefinition';

import { Assert } from '../../../Diagnostics/Assert';
import { ILifecycleEventEmitter } from '../Abstractions/ILifecycleEventEmitter';

type State = {
  onStartEvent: (() => void) | undefined;
};

const makeInitialState = (): State => ({
  onStartEvent: undefined
});

export const LifecycleOnStart = (
  lifecycleEventEmitter: ILifecycleEventEmitter
) =>
  makeEventNodeDefinition({
    typeName: 'lifecycle/onStart',
    label: 'On Start',
    category: NodeCategory.Event,
    in: {},
    out: {
      flow: 'flow'
    },
    initialState: makeInitialState(),
    init: ({ state, commit }) => {
      Assert.mustBeTrue(state.onStartEvent === undefined);
      const onStartEvent = () => {
        commit('flow');
      };

      lifecycleEventEmitter.startEvent.addListener(onStartEvent);

      return {
        onStartEvent
      };
    },
    dispose: ({ state: { onStartEvent } }) => {
      Assert.mustBeTrue(onStartEvent !== undefined);
      if (onStartEvent)
        lifecycleEventEmitter.startEvent.removeListener(onStartEvent);
    }
  });
