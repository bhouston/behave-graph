/* eslint-disable max-len */
import { memo } from '../../memo.js';
import { NodeDefinition } from '../../Nodes/Registry/NodeDefinitionsMap.js';
import { getNodeDescriptions } from '../../Nodes/Registry/NodeDescription.js';
import { IRegistry } from '../../Registry.js';
import { ValueTypeMap } from '../../Values/ValueTypeMap.js';
import { getStringConversionsForValueType } from '../registerSerializersForValueType.js';
import { OnCustomEvent } from './CustomEvents/OnCustomEvent.js';
import { TriggerCustomEvent } from './CustomEvents/TriggerCustomEvent.js';
import { ExpectTrue as AssertExpectTrue } from './Debug/AssertExpectTrue.js';
import { Log as DebugLog } from './Debug/DebugLog.js';
import { Branch } from './Flow/Branch.js';
import { Counter } from './Flow/Counter.js';
import { Debounce } from './Flow/Debounce.js';
import { DoN } from './Flow/DoN.js';
import { DoOnce } from './Flow/DoOnce.js';
import { FlipFlop } from './Flow/FlipFlop.js';
import { ForLoop } from './Flow/ForLoop.js';
import { Gate } from './Flow/Gate.js';
import { MultiGate } from './Flow/MultiGate.js';
import { Sequence } from './Flow/Sequence.js';
import { SwitchOnInteger } from './Flow/SwitchOnInteger.js';
import { SwitchOnString } from './Flow/SwitchOnString.js';
import { Throttle } from './Flow/Throttle.js';
import { WaitAll } from './Flow/WaitAll.js';
import { LifecycleOnEnd } from './Lifecycle/LifecycleOnEnd.js';
import { LifecycleOnStart } from './Lifecycle/LifecycleOnStart.js';
import { LifecycleOnTick } from './Lifecycle/LifecycleOnTick.js';
import { Easing } from './Logic/Easing.js';
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

export const getCoreValuesMap = memo<ValueTypeMap>(() => {
  const valueTypes = [BooleanValue, StringValue, IntegerValue, FloatValue];
  return Object.fromEntries(
    valueTypes.map((valueType) => [valueType.name, valueType])
  );
});

function getCoreStringConversions(values: ValueTypeMap): NodeDefinition[] {
  return Object.keys(getCoreValuesMap())
    .filter((name) => name !== 'string')
    .flatMap((valueTypeName) =>
      getStringConversionsForValueType({ values, valueTypeName })
    );
}

export const getCoreNodesMap = memo<Record<string, NodeDefinition>>(() => {
  const nodeDefinitions = [
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
    AssertExpectTrue,

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

    ...getCoreStringConversions(getCoreValuesMap())
  ];
  return Object.fromEntries(
    nodeDefinitions.map((nodeDefinition) => [
      nodeDefinition.typeName,
      nodeDefinition
    ])
  );
});

export const registerCoreProfile = (registry: IRegistry): IRegistry => {
  const values = { ...registry.values, ...getCoreValuesMap() };
  return {
    values,
    nodes: { ...registry.nodes, ...getCoreNodesMap() },
    dependencies: { ...registry.dependencies }
  };
};
