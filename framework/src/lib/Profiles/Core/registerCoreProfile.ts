/* eslint-disable max-len */

import { getNodeDescriptions } from '../../Nodes/getNodeDescriptions.js';
import { Registry } from '../../Registry.js';
import { DefaultLogger } from './Abstractions/Drivers/DefaultLogger.js';
import { ManualLifecycleEventEmitter } from './Abstractions/Drivers/ManualLifecycleEventEmitter.js';
import { ILifecycleEventEmitter } from './Abstractions/ILifecycleEventEmitter.js';
import { ILogger } from './Abstractions/ILogger.js';
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
import { registerSerializersForValueType } from './registerSerializersForValueType.js';
import * as BooleanNodes from './Values/BooleanNodes.js';
import { BooleanValue } from './Values/BooleanValue.js';
import * as FloatNodes from './Values/FloatNodes.js';
import { FloatValue } from './Values/FloatValue.js';
import * as IntegerNodes from './Values/IntegerNodes.js';
import { IntegerValue } from './Values/IntegerValue.js';
import * as StringNodes from './Values/StringNodes.js';
import { StringValue } from './Values/StringValue.js';

export function registerCoreProfile(
  registry: Registry,
  ilogger = new DefaultLogger(),
  iLifeCycle = new ManualLifecycleEventEmitter(),
) {
  const { nodes, values } = registry;

  // pull in value type nodes
  values.register(BooleanValue);
  values.register(StringValue);
  values.register(IntegerValue);
  values.register(FloatValue);

  // pull in value type nodes
  nodes.register(...getNodeDescriptions(StringNodes));
  nodes.register(...getNodeDescriptions(BooleanNodes));
  nodes.register(...getNodeDescriptions(IntegerNodes));
  nodes.register(...getNodeDescriptions(FloatNodes));

  // actions

  nodes.register(DebugLog.Description(ilogger));
  nodes.register(AssertExpectTrue.Description);

  // events

  nodes.register(LifecycleOnStart.Description(iLifeCycle));
  nodes.register(LifecycleOnEnd.Description(iLifeCycle));
  nodes.register(LifecycleOnTick.Description(iLifeCycle));

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
