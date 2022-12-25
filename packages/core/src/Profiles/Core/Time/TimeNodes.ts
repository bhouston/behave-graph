import { makeInNOutFunctionDesc } from '../../../Nodes/FunctionNode';

// Unreal Engine Blueprint Time nodes: https://docs.unrealengine.com/4.27/en-US/BlueprintAPI/Utilities/Time/

export const Now = new makeInNOutFunctionDesc({
  name: 'time/now',
  category: 'Logic',
  label: 'Now',
  out: 'float',
  exec: () => Date.now() / 1000
});
