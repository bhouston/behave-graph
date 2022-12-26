import { EasingFunctions, EasingModes } from '../../../Easing';
import {
  makeFunctionNodeDefinition,
  NodeCategory
} from '../../../Nodes/NodeDefinition';

export const Easing = makeFunctionNodeDefinition({
  typeName: 'math/easing',
  category: NodeCategory.Logic,
  label: 'Easing',
  in: {
    easingFunction: {
      valueType: 'string',
      name: 'easingFunction',
      defaultValue: 'linear',
      options: Object.keys(EasingFunctions)
    },
    easingMode: {
      valueType: 'string',
      name: 'easingMode',
      defaultValue: 'inOut',
      options: Object.keys(EasingModes)
    },
    t: 'float'
  },
  out: {
    t: 'float'
  },
  exec: ({ read, write }) => {
    const easingFunction = EasingFunctions[read('easingFunction') as string];
    const easingMode = EasingModes[read('easingMode') as string];
    const easing = easingMode(easingFunction);
    const inputT = read('t') as number;

    write('t', easing(inputT));
  }
});
