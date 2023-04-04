/* eslint-disable max-len */

import { getNodeDescriptions } from '../../Nodes/Registry/NodeDescription';
import {
  NodeDefinition,
  NodeDefinitionsMap
} from '../../Nodes/Registry/NodeTypeRegistry';
import { ValueTypeMap } from '../../Values/ValueTypeRegistry';
import { getStringConversionsForValueType } from '../registerSerializersForValueType';
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

export function getCoreValueTypes(): ValueTypeMap {
  return toMap(
    [BooleanValue, StringValue, IntegerValue, FloatValue],
    (v) => v.name
  );
}

export function toMap<T>(
  elements: T[],
  getName: (element: T) => string
): Record<string, T> {
  return Object.fromEntries(
    elements.map((element) => [getName(element), element])
  );
}

function getStringConversions(values: ValueTypeMap): NodeDefinition[] {
  return ['boolean', 'float', 'integer'].flatMap((valueTypeName) =>
    getStringConversionsForValueType({ values, valueTypeName })
  );
}

export function getCoreNodeDefinitions(
  values: ValueTypeMap
): NodeDefinitionsMap {
  const allNodeDefinitions: NodeDefinition[] = [
    ...getNodeDescriptions(StringNodes),
    ...getNodeDescriptions(BooleanNodes),
    ...getNodeDescriptions(IntegerNodes),
    ...getNodeDescriptions(FloatNodes),

    // custom events

    OnCustomEvent.Description,
    TriggerCustomEvent.Description,

    // variables

    VariableGet,
    VariableSet,

    // complex logic

    Easing,

    // actions

    DebugLog,
    AssertExpectTrue.Description,

    // events

    LifecycleOnStart,
    LifecycleOnEnd,
    LifecycleOnTick,

    // time

    Delay.Description,
    ...getNodeDescriptions(TimeNodes),

    // flow control

    Branch,
    FlipFlop,
    ForLoop,
    Sequence,
    SwitchOnInteger,
    SwitchOnString,
    Debounce.Description,
    Throttle.Description,
    DoN,
    DoOnce,
    Gate,
    MultiGate,
    WaitAll.Description,
    Counter,

    ...getStringConversions(values)
  ];

  // convert array to map
  return toMap(allNodeDefinitions, (node) => node.typeName);
}

export const getCoreRegistry = () => {
  const values = getCoreValueTypes();
  return {
    values,
    nodes: getCoreNodeDefinitions(getCoreValueTypes())
  };
};
