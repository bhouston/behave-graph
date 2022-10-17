/* eslint-disable max-len */

import { Registry } from '../../Registry.js';
import { ExpectTrue as AssertExpectTrue } from './Debug/AssertExpectTrue.js';
import { Log as DebugLog } from './Debug/DebugLog.js';
import { Branch } from './Flow/Branch.js';
import { Delay } from './Flow/Delay.js';
import { FlipFlop } from './Flow/FlipFlop.js';
import { ForLoop } from './Flow/ForLoop.js';
import { Sequence } from './Flow/Sequence.js';
import { LifecycleOnEnd } from './Lifecycle/LifecycleOnEnd.js';
import { LifecycleOnStart } from './Lifecycle/LifecycleOnStart.js';
import { LifecycleOnTick } from './Lifecycle/LifecycleOnTick.js';
import { registerBooleanValue } from './registerBooleanValue.js';
import { registerFloatValue } from './registerFloatValue.js';
import { registerIntegerValue } from './registerIntegerValue.js';
import { registerSerializersForValueType } from './registerSerializersForValueType.js';
import { registerStringValue } from './registerStringValue.js';

export function registerCoreProfile(registry: Registry) {
  const { nodes, values } = registry;

  registerBooleanValue(registry);
  registerStringValue(registry);
  registerIntegerValue(registry);
  registerFloatValue(registry);

  // actions

  nodes.register(DebugLog.Description);
  nodes.register(AssertExpectTrue.Description);

  // events

  nodes.register(LifecycleOnStart.Description);
  nodes.register(LifecycleOnEnd.Description);
  nodes.register(LifecycleOnTick.Description);

  // flow control

  nodes.register(Branch.Description);
  nodes.register(FlipFlop.Description);
  nodes.register(ForLoop.Description);
  nodes.register(Sequence.Description);
  nodes.register(Delay.Description);

  // string converters

  ['boolean', 'float', 'integer'].forEach((valueTypeName) => {
    registerSerializersForValueType(registry, valueTypeName);
  });

  return registry;
}
