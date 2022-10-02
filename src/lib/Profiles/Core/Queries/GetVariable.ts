import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';
import Socket from '../../../Sockets/Socket';

export default class GetVariable extends Node {
  constructor(name: string, public valueTypeName: string) {
    super(
      'Query',
      name,
      [new Socket('id', 'variable')],
      [new Socket(valueTypeName, 'value')],
      (context: NodeEvalContext) => {
        const variableId = context.readInput<string>('variable');
        const variable = context.getVariable(variableId);
        if (this.valueTypeName !== variable.valueTypeName) {
          throw new Error(
            `type mismatch between VariableGet ${this.valueTypeName} and variable ${variable.valueTypeName}`
          );
        }
        const value = variable.get();
        context.writeOutput('value', value);
      }
    );
  }
}
