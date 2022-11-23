/* eslint-disable max-len */
import { getNodeDescriptions } from '../../Nodes/Registry/NodeDescription';
import { Registry } from '../../Registry';
import { DefaultLogger } from './Abstractions/Drivers/DefaultLogger';
import { ManualLifecycleEventEmitter } from './Abstractions/Drivers/ManualLifecycleEventEmitter';
import { ILifecycleEventEmitter } from './Abstractions/ILifecycleEventEmitter';
import { ILogger } from './Abstractions/ILogger';
import { ExpectTrue as AssertExpectTrue } from './Debug/AssertExpectTrue';
import { Log as DebugLog } from './Debug/DebugLog';
import { Branch } from './Flow/Branch';
import { Counter } from './Flow/Counter';
import { Debounce } from './Flow/Debounce';
import { DoN } from './Flow/DoN';
import { DoOnce } from './Flow/DoOnce';
import { FlipFlop } from './Flow/FlipFlop';
import { ForLoop } from './Flow/ForLoop';
import { Gate } from './Flow/Gate';
import { MultiGate } from './Flow/MultieGate';
import { Sequence } from './Flow/Sequence';
import { Throttle } from './Flow/Throttle';
import { WaitAll } from './Flow/WaitAll';
import { LifecycleOnEnd } from './Lifecycle/LifecycleOnEnd';
import { LifecycleOnStart } from './Lifecycle/LifecycleOnStart';
import { LifecycleOnTick } from './Lifecycle/LifecycleOnTick';
import { Easing } from './Logic/Easing';
import { registerSerializersForValueType } from './registerSerializersForValueType';
import { Delay } from './Time/Delay';
import * as TimeNodes from './Time/TimeNodes';
import * as BooleanNodes from './Values/BooleanNodes';
import { BooleanValue } from './Values/BooleanValue';
import * as FloatNodes from './Values/FloatNodes';
import { FloatValue } from './Values/FloatValue';
import * as IntegerNodes from './Values/IntegerNodes';
import { IntegerValue } from './Values/IntegerValue';
import * as StringNodes from './Values/StringNodes';
import { StringValue } from './Values/StringValue';

export function registerCoreProfile(
  registry: Registry,
  logger: ILogger = new DefaultLogger(),
  lifecycleEventEmitter: ILifecycleEventEmitter = new ManualLifecycleEventEmitter()
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

  // complex logic

  nodes.register(Easing.Description);

  // actions

  nodes.register(DebugLog.Description(logger));
  nodes.register(AssertExpectTrue.Description);

  // events

  nodes.register(LifecycleOnStart.Description(lifecycleEventEmitter));
  nodes.register(LifecycleOnEnd.Description(lifecycleEventEmitter));
  nodes.register(LifecycleOnTick.Description(lifecycleEventEmitter));

  // time

  nodes.register(Delay.Description);
  nodes.register(...getNodeDescriptions(TimeNodes));

  // flow control

  nodes.register(Branch.Description);
  nodes.register(FlipFlop.Description);
  nodes.register(ForLoop.Description);
  nodes.register(...Sequence.GetDescriptions());
  nodes.register(Debounce.Description);
  nodes.register(Throttle.Description);
  nodes.register(DoN.Description);
  nodes.register(DoOnce.Description);
  nodes.register(Gate.Description);
  nodes.register(MultiGate.Description);
  nodes.register(...WaitAll.GetDescriptions());
  nodes.register(Counter.Description);

  // string converters

  ['boolean', 'float', 'integer'].forEach((valueTypeName) => {
    registerSerializersForValueType(registry, valueTypeName);
  });

  return registry;
}
