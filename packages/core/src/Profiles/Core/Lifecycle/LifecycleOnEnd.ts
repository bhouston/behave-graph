import { makeEventNodeDefinition } from 'packages/core/src/Nodes/NodeDefinition';

import { Assert } from '../../../Diagnostics/Assert';
import { ILifecycleEventEmitter } from '../Abstractions/ILifecycleEventEmitter';

// inspired by: https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/Events/

type State = {
  onEndEvent: (() => void) | undefined;
};

const makeInitialState = (): State => ({
  onEndEvent: undefined
});

export const LifecycleOnEnd = (lifecycleEventEmitter: ILifecycleEventEmitter) =>
  makeEventNodeDefinition({
    typeName: 'lifecycle/onEnd',
    label: 'On End',
    category: 'Event',
    in: {},
    out: {
      flow: 'flow'
    },
    initialState: makeInitialState(),
    init: ({ state, commit }) => {
      Assert.mustBeTrue(state.onEndEvent === undefined);
      const onEndEvent = () => {
        commit('flow');
      };

      lifecycleEventEmitter.endEvent.addListener(onEndEvent);

      return {
        onEndEvent
      };
    },
    dispose: ({ state: { onEndEvent } }) => {
      Assert.mustBeTrue(onEndEvent !== undefined);
      if (onEndEvent) lifecycleEventEmitter.endEvent.removeListener(onEndEvent);
    }
  });
