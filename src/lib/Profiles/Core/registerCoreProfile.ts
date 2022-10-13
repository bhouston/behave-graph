/* eslint-disable max-len */

import { Registry } from '../../Registry.js';
import { ExpectTrue } from './Actions/ExpectTrue.js';
import { Log } from './Actions/Log.js';
import { TriggerCustomEvent } from './Actions/TriggerCustomEvent.js';
import { OnCustomEvent } from './Events/OnCustomEvent.js';
import { OnLifecycleEnd } from './Events/OnLifecycleEnd.js';
import { OnLifecycleStart } from './Events/OnLifecycleStart.js';
import { OnLifecycleTick } from './Events/OnLifecycleTick.js';
import { Branch } from './Flow/Branch.js';
import { FlipFlop } from './Flow/FlipFlop.js';
import { ForLoop } from './Flow/ForLoop.js';
import { Sequence } from './Flow/Sequence.js';
import { registerBooleanValue } from './registerBooleanValue.js';
import { registerFloatValue } from './registerFloatValue.js';
import { registerIntegerValue } from './registerIntegerValue.js';
import { registerSerializersForValueType } from './registerSerializersForValueType.js';
import { registerStringValue } from './registerStringValue.js';
import { registryVariableForValueType } from './registerVariableForValueType.js';
import { Delay } from './Time/Delay.js';

export function registerCoreProfile(registry: Registry) {
  const { nodes, values } = registry;

  registerBooleanValue(registry);
  registerStringValue(registry);
  registerIntegerValue(registry);
  registerFloatValue(registry);

  // actions

  nodes.register('action/log', () => new Log());
  nodes.register('assert/expectTrue', () => new ExpectTrue());

  // events

  nodes.register('lifecycle/start', () => new OnLifecycleStart());
  nodes.register('lifecycle/end', () => new OnLifecycleEnd());
  nodes.register('lifecycle/tick', () => new OnLifecycleTick());

  // flow control

  nodes.register('flow/branch', () => new Branch());
  nodes.register('flow/flipFlop', () => new FlipFlop());
  nodes.register('flow/forLoop', () => new ForLoop());
  nodes.register('flow/sequence', () => new Sequence());

  // time

  nodes.register('time/delay', () => new Delay());

  // custom events

  nodes.register('event/customEvent', () => new OnCustomEvent());
  nodes.register('action/triggerCustomEvent', () => new TriggerCustomEvent());

  // string converters

  ['boolean', 'float', 'integer'].forEach((valueTypeName) => {
    registerSerializersForValueType(registry, valueTypeName);
  });

  // variables

  ['boolean', 'float', 'integer', 'string'].forEach((valueTypeName) => {
    registryVariableForValueType(nodes, valueTypeName);
  });

  return registry;
}
