import { NodeTypeRegistry } from '../../Nodes/NodeTypeRegistry.js';
import { SetVariable } from './Actions/SetVariable.js';
import { OnVariableChanged } from './Events/OnVariableChanged.js';
import { GetVariable } from './Queries/GetVariable.js';

export function registryVariableForValueType(
  nodes: NodeTypeRegistry,
  valueTypeName: string
) {
  nodes.register(
    `variable/set/${valueTypeName}`,
    () => new SetVariable(`variable/set/${valueTypeName}`, valueTypeName)
  );
  nodes.register(
    `variable/get/${valueTypeName}`,
    () => new GetVariable(`variable/get/${valueTypeName}`, valueTypeName)
  );
  nodes.register(
    `variable/onChanged/${valueTypeName}`,
    () =>
      new OnVariableChanged(
        `variable/onChanged/${valueTypeName}`,
        valueTypeName
      )
  );
}
