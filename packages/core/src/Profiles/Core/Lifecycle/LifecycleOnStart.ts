import { Assert } from '../../../Diagnostics/Assert';
import {
  makeEventNodeDefinition,
  NodeCategory
} from '../../../Nodes/NodeDefinitions';
import { ILifecycleEventEmitter } from '../Abstractions/ILifecycleEventEmitter';

type State = {
  onStartEvent?: (() => void) | undefined;
};

const makeInitialState = (): State => ({
  onStartEvent: undefined
});

export const lifecycleEventEmitterDependencyKey = 'lifecycleEventEmitter';

export const LifecycleOnStart = makeEventNodeDefinition({
  typeName: 'lifecycle/onStart',
  label: 'On Start',
  category: NodeCategory.Event,
  in: {},
  out: {
    flow: 'flow'
  },
  initialState: makeInitialState(),
  init: ({ state, commit, graph: { getDependency } }) => {
    Assert.mustBeTrue(state.onStartEvent === undefined);
    const onStartEvent = () => {
      commit('flow');
    };

    const lifecycleEventEmitter = getDependency<ILifecycleEventEmitter>(
      lifecycleEventEmitterDependencyKey
    );

    lifecycleEventEmitter?.startEvent.addListener(onStartEvent);

    return {
      onStartEvent
    };
  },
  dispose: ({ state: { onStartEvent }, graph: { getDependency } }) => {
    Assert.mustBeTrue(onStartEvent !== undefined);

    const lifecycleEventEmitter = getDependency<ILifecycleEventEmitter>(
      lifecycleEventEmitterDependencyKey
    );

    if (onStartEvent)
      lifecycleEventEmitter?.startEvent.removeListener(onStartEvent);

    return {};
  }
});
