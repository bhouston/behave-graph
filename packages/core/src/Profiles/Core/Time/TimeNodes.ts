import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';
import { In0Out1FuncNode } from '../../../Nodes/Templates/In0Out1FuncNode';

// Unreal Engine Blueprint Time nodes: https://docs.unrealengine.com/4.27/en-US/BlueprintAPI/Utilities/Time/

export const Now = new NodeDescription(
  'time/now',
  'Logic',
  'Now',
  (description, graph) => {
    // ensure we do not leak current actual time, just time since initialization?
    const startTime = Date.now();
    return new In0Out1FuncNode(
      description,
      graph,
      'float',
      () => (Date.now() - startTime) / 1000
    );
  }
);
