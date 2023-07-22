import { Assert } from '../../../Diagnostics/Assert.js';
import {
  makeEventNodeDefinition,
  NodeCategory
} from '../../../Nodes/NodeDefinitions.js';
import { ILifecycleEventEmitter } from '../Abstractions/ILifecycleEventEmitter.js';

// inspired by: https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/Events/

type State = {
  onEndEvent?: (() => void) | undefined;
};

const makeInitialState = (): State => ({
  onEndEvent: undefined
});

export const LifecycleOnEnd = makeEventNodeDefinition({
  typeName: 'lifecycle/onEnd',
  label: 'On End',
  category: NodeCategory.Event,
  in: {},
  out: {
    flow: 'flow'
  },
  initialState: makeInitialState(),
  init: ({ state, commit, graph: { getDependency } }) => {
    Assert.mustBeTrue(state.onEndEvent === undefined);
    const onEndEvent = () => {
      commit('flow');
    };

    const lifecycleEventEmitter = getDependency<ILifecycleEventEmitter>(
      'ILifecycleEventEmitter'
    );

    lifecycleEventEmitter?.endEvent.addListener(onEndEvent);

    return {
      onEndEvent
    };
  },
  dispose: ({ state: { onEndEvent }, graph: { getDependency } }) => {
    Assert.mustBeTrue(onEndEvent !== undefined);

    const lifecycleEventEmitter = getDependency<ILifecycleEventEmitter>(
      'ILifecycleEventEmitter'
    );

    if (onEndEvent) lifecycleEventEmitter?.endEvent.removeListener(onEndEvent);

    return {};
  }
});
