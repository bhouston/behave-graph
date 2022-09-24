import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';
import Socket from '../../../Sockets/Socket';
import IdSocket from '../../../Sockets/Typed/IdSocket';

export default class GetVariable extends Node {
  constructor(name:string, public valueTypeName: string) {
    super(
      'Query',
      name,
      [new IdSocket('variable')],
      [new Socket('value', valueTypeName)],
      (context:NodeEvalContext) => {
        const variableId = context.readInput('variable');
        const variable = context.getVariable(variableId);
        if (this.valueTypeName !== variable.valueTypeName) {
          throw new Error(`type mismatch between VariableGet ${this.valueTypeName} and variable ${variable.valueTypeName}`);
        } const value = variable.get();
        context.writeOutput('value', value);
      },
    );
  }
}
