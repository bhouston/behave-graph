import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';
import Socket from '../../../Sockets/Socket';

export default class SetVariable extends Node {
  constructor(name: string, public readonly valueTypeName: string) {
    super(
      'Action',
      name,
      [
        new Socket('flow', 'flow'),
        new Socket('id', 'variable'),
        new Socket(valueTypeName, 'value'),
      ],
      [
        new Socket('flow', 'flow'),
      ],
      (context: NodeEvalContext) => {
        const variableId = context.readInput<string>('variable');
        const variable = context.getVariable(variableId);
        if (this.valueTypeName !== variable.valueTypeName) {
          throw new Error(`type mismatch between VariableSet ${this.valueTypeName} and variable ${variable.valueTypeName}`);
        }
        variable.set(context.readInput('value'));
      },
    );
  }
}
