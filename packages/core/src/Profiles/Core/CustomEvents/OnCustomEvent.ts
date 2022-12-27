import { Assert } from '../../../Diagnostics/Assert';
import { CustomEvent } from '../../../Events/CustomEvent';
import {
  makeEventNodeDefinition,
  NodeCategory,
  SocketsList
} from '../../../Nodes/NodeDefinition';

type State = {
  onCustomEvent: (params: Record<string, any>) => void;
  customEvent: CustomEvent;
};

const makeInitialState = (): State | undefined => undefined;

export const OnCustomEvent = makeEventNodeDefinition({
  typeName: 'customEvent/onTriggered',
  category: NodeCategory.Event,
  label: 'On Triggered',
  configuration: {
    customEventId: {
      valueType: 'number'
    }
  },
  in: {},
  out: (configuration, graph) => {
    const customEvents = graph.customEvents;
    const customEvent =
      customEvents[configuration.customEventId] ||
      new CustomEvent('-1', 'undefined');

    const result: SocketsList = [
      {
        key: 'flow',
        valueType: 'flow'
      },
      ...customEvent.parameters.map((parameter) => ({
        key: parameter.name,
        valueType: parameter.valueTypeName,
        label: parameter.label
      }))
    ];

    return result;
  },
  initialState: makeInitialState(),
  init: ({ write, commit, state, configuration, graph: { customEvents } }) => {
    Assert.mustBeTrue(state === undefined);

    const customEvent = customEvents[configuration.customEventId];

    const onCustomEvent = (parameters: Record<string, any>) => {
      customEvent.parameters.forEach((parameterSocket) => {
        if (!(parameterSocket.name in parameters)) {
          throw new Error(
            `parameters of custom event do not align with parameters of custom event node, missing ${parameterSocket.name}`
          );
        }
        write(parameterSocket.name, parameters[parameterSocket.name]);
      });
      commit('flow');
    };
    customEvent.eventEmitter.addListener(onCustomEvent);

    // return updated state, so that we can later in dispose detach the listener from the event
    return {
      customEvent,
      onCustomEvent
    };
  },
  dispose: ({ state }) => {
    Assert.mustBeTrue(state !== undefined);

    if (typeof state !== 'undefined') {
      state.customEvent.eventEmitter.removeListener(state.onCustomEvent);
    }
  }
});
