import Easing from 'packages/core/src/easing.js';

import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { In1Out1FuncNode } from '../../../Nodes/Templates/In1Out1FuncNode.js';

export const Step0 = new NodeDescription(
  'interpolation/step0',
  'Logic',
  'Step0',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', (a: number) =>
      Easing.step0(a)
    )
);

export const Step1 = new NodeDescription(
  'interpolation/step1',
  'Logic',
  'Step1',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', (a: number) =>
      Easing.step1(a)
    )
);

export const Linear = new NodeDescription(
  'interpolation/linear',
  'Logic',
  'Linear',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', (a: number) =>
      Easing.linear(a)
    )
);

export const Ease = new NodeDescription(
  'interpolation/ease',
  'Logic',
  'Ease',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', (a: number) =>
      Easing.ease(a)
    )
);

export const Quad = new NodeDescription(
  'interpolation/quad',
  'Logic',
  'Quad',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', (a: number) =>
      Easing.quad(a)
    )
);

export const Cubic = new NodeDescription(
  'interpolation/cubic',
  'Logic',
  'Cubic',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', (a: number) =>
      Easing.cubic(a)
    )
);

export const Sin = new NodeDescription(
  'interpolation/sin',
  'Logic',
  'Sin',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', (a: number) =>
      Easing.sin(a)
    )
);

export const Circle = new NodeDescription(
  'interpolation/circle',
  'Logic',
  'Circle',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', (a: number) =>
      Easing.circle(a)
    )
);

export const Exp = new NodeDescription(
  'interpolation/exp',
  'Logic',
  'Exp',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', (a: number) =>
      Easing.exp(a)
    )
);

export const Elastic = new NodeDescription(
  'interpolation/elastic',
  'Logic',
  'Elastic',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', (a: number) =>
      Easing.elastic(a)
    )
);

export const Back = new NodeDescription(
  'interpolation/back',
  'Logic',
  'Back',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', (a: number) =>
      Easing.back(a)
    )
);

export const Bounce = new NodeDescription(
  'interpolation/bounce',
  'Logic',
  'Bounce',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', (a: number) =>
      Easing.bounce(a)
    )
);
