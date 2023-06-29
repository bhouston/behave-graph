/* eslint-disable max-len */
import { DependenciesRegistry } from '../../Nodes/Registry/DependenciesRegistry.js';
import { getNodeDescriptions } from '../../Nodes/Registry/NodeDescription.js';
import { IRegistry } from '../../Registry.js';
import { ValueTypeRegistry } from '../../Values/ValueTypeRegistry.js';
import { ILifecycleEventEmitter } from './Abstractions/ILifecycleEventEmitter.js';
import { ILogger } from './Abstractions/ILogger.js';
import { OnCustomEvent } from './CustomEvents/OnCustomEvent.js';
import { TriggerCustomEvent } from './CustomEvents/TriggerCustomEvent.js';
import { ExpectTrue as AssertExpectTrue } from './Debug/AssertExpectTrue.js';
import { Log as DebugLog, loggerDependencyKey } from './Debug/DebugLog.js';
import { Branch } from './Flow/Branch.js';
import { Counter } from './Flow/Counter.js';
import { Debounce } from './Flow/Debounce.js';
import { DoN } from './Flow/DoN.js';
import { DoOnce } from './Flow/DoOnce.js';
import { FlipFlop } from './Flow/FlipFlop.js';
import { ForLoop } from './Flow/ForLoop.js';
import { Gate } from './Flow/Gate.js';
import { MultiGate } from './Flow/MultieGate.js';
import { Sequence } from './Flow/Sequence.js';
import { SwitchOnInteger } from './Flow/SwitchOnInteger.js';
import { SwitchOnString } from './Flow/SwitchOnString.js';
import { Throttle } from './Flow/Throttle.js';
import { WaitAll } from './Flow/WaitAll.js';
import { LifecycleOnEnd } from './Lifecycle/LifecycleOnEnd.js';
import {
  lifecycleEventEmitterDependencyKey,
  LifecycleOnStart
} from './Lifecycle/LifecycleOnStart';
import { LifecycleOnTick } from './Lifecycle/LifecycleOnTick.js';
import { Easing } from './Logic/Easing.js';
import { registerSerializersForValueType } from './registerSerializersForValueType.js';
import { Delay } from './Time/Delay.js';
import * as TimeNodes from './Time/TimeNodes.js';
import * as BooleanNodes from './Values/BooleanNodes.js';
import { BooleanValue } from './Values/BooleanValue.js';
import * as FloatNodes from './Values/FloatNodes.js';
import { FloatValue } from './Values/FloatValue.js';
import * as IntegerNodes from './Values/IntegerNodes.js';
import { IntegerValue } from './Values/IntegerValue.js';
import * as StringNodes from './Values/StringNodes.js';
import { StringValue } from './Values/StringValue.js';
import { VariableGet } from './Variables/VariableGet.js';
import { VariableSet } from './Variables/VariableSet.js';

export function registerLogger(
  registry: DependenciesRegistry,
  logger: ILogger
) {
  registry.register(loggerDependencyKey, logger);
}

export function registerLifecycleEventEmitter(
  registry: DependenciesRegistry,
  emitter: ILifecycleEventEmitter
) {
  registry.register(lifecycleEventEmitterDependencyKey, emitter);
}

export function registerCoreValueTypes(values: ValueTypeRegistry) {
  // pull in value type nodes
  values.register(BooleanValue);
  values.register(StringValue);
  values.register(IntegerValue);
  values.register(FloatValue);
}

export function registerCoreProfile(
  registry: Pick<IRegistry, 'nodes' | 'values'>
) {
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
