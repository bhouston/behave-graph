import { makeEventNodeDefinition } from 'packages/core/src/Nodes/NodeDefinition';

import { Assert } from '../../../Diagnostics/Assert';
import { ILifecycleEventEmitter } from '../Abstractions/ILifecycleEventEmitter';

type State = {
  onTickEvent: (() => void) | undefined;
};

const makeInitialState = (): State => ({
  onTickEvent: undefined
});

export const LifecycleOnTick = (
  lifecycleEventEmitter: ILifecycleEventEmitter
) =>
  makeEventNodeDefinition({
    typeName: 'lifecycle/onTick',
    label: 'On Tick',
    category: 'Event',
    in: {},
    out: {
      flow: 'flow',
      deltaSeconds: 'float'
    },
    initialState: makeInitialState(),
    init: ({ state, commit, write }) => {
      Assert.mustBeTrue(state.onTickEvent === undefined);
      let lastTickTime = Date.now();
      const onTickEvent = () => {
        const currentTime = Date.now();
        const deltaSeconds = (currentTime - lastTickTime) * 0.001;
        write('deltaSeconds', deltaSeconds);
        commit('flow');
        lastTickTime = currentTime;
      };

      lifecycleEventEmitter.tickEvent.addListener(onTickEvent);

      return {
        onTickEvent
      };
    },
    dispose: ({ state: { onTickEvent } }) => {
      Assert.mustBeTrue(onTickEvent !== undefined);
      if (onTickEvent)
        lifecycleEventEmitter.tickEvent.removeListener(onTickEvent);
    }
  });
