/* eslint-disable max-len */

import { getNodeDescriptions } from '../../Nodes/Registry/NodeDescription';
import { IRegistry } from '../../Registry';
import { ValueTypeRegistry } from '../../Values/ValueTypeRegistry';
import { ILifecycleEventEmitter } from './Abstractions/ILifecycleEventEmitter';
import { ILogger } from './Abstractions/ILogger';
import { OnCustomEvent } from './CustomEvents/OnCustomEvent';
import { TriggerCustomEvent } from './CustomEvents/TriggerCustomEvent';
import { ExpectTrue as AssertExpectTrue } from './Debug/AssertExpectTrue';
import { Log as DebugLog, loggerDependencyKey } from './Debug/DebugLog';
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
import { SwitchOnInteger } from './Flow/SwitchOnInteger';
import { SwitchOnString } from './Flow/SwitchOnString';
import { Throttle } from './Flow/Throttle';
import { WaitAll } from './Flow/WaitAll';
import { LifecycleOnEnd } from './Lifecycle/LifecycleOnEnd';
import {
  lifecycleEventEmitterDependencyKey,
  LifecycleOnStart
} from './Lifecycle/LifecycleOnStart';
import { LifecycleOnTick } from './Lifecycle/LifecycleOnTick';
import { Easing } from './Logic/Easing';
import { registerSerializersForValueType } from '../registerSerializersForValueType';
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
import { VariableGet } from './Variables/VariableGet';
import { VariableSet } from './Variables/VariableSet';

export const makeCoreDependencies = ({
  lifecyleEmitter,
  logger
}: {
  lifecyleEmitter: ILifecycleEventEmitter;
  logger: ILogger;
}) => ({
  [lifecycleEventEmitterDependencyKey]: lifecyleEmitter,
  [loggerDependencyKey]: logger
});

export function registerCoreValueTypes(values: ValueTypeRegistry) {
  // pull in value type nodes
  values.register(BooleanValue);
  values.register(StringValue);
  values.register(IntegerValue);
  values.register(FloatValue);
}

export function registerCoreProfile(registry: IRegistry) {
  const { nodes, values } = registry;

  registerCoreValueTypes(values);

  // pull in value type nodes
  nodes.register(...getNodeDescriptions(StringNodes));
  nodes.register(...getNodeDescriptions(BooleanNodes));
  nodes.register(...getNodeDescriptions(IntegerNodes));
  nodes.register(...getNodeDescriptions(FloatNodes));

  // custom events

  nodes.register(OnCustomEvent.Description);
  nodes.register(TriggerCustomEvent.Description);

  // variables

  nodes.register(VariableGet);
  nodes.register(VariableSet);

  // complex logic

  nodes.register(Easing);

  // actions

  nodes.register(DebugLog);
  nodes.register(AssertExpectTrue.Description);

  // events

  nodes.register(LifecycleOnStart);
  nodes.register(LifecycleOnEnd);
  nodes.register(LifecycleOnTick);

  // time

  nodes.register(Delay.Description);
  nodes.register(...getNodeDescriptions(TimeNodes));

  // flow control

  nodes.register(Branch);
  nodes.register(FlipFlop);
  nodes.register(ForLoop);
  nodes.register(Sequence);
  nodes.register(SwitchOnInteger);
  nodes.register(SwitchOnString);
  nodes.register(Debounce.Description);
  nodes.register(Throttle.Description);
  nodes.register(DoN);
  nodes.register(DoOnce);
  nodes.register(Gate);
  nodes.register(MultiGate);
  nodes.register(WaitAll.Description);
  nodes.register(Counter);

  // string converters

  ['boolean', 'float', 'integer'].forEach((valueTypeName) => {
    registerSerializersForValueType(registry, valueTypeName);
  });

  return registry;
}
