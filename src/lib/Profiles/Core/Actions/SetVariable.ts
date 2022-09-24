import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';
import Socket from '../../../Sockets/Socket';
import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import IdSocket from '../../../Sockets/Typed/IdSocket';

export default class SetVariable extends Node {
  constructor(name:string, public readonly valueTypeName: string) {
    super(
      'Action',
      name,
      [new FlowSocket(), new IdSocket('variable'), new Socket('value', valueTypeName)],
      [new FlowSocket()],
      (context: NodeEvalContext) => {
        const variableId = context.readInput('variable');
        const variable = context.getVariable(variableId);
        if (this.valueTypeName !== variable.valueTypeName) {
          throw new Error(`type mismatch between VariableSet ${this.valueTypeName} and variable ${variable.valueTypeName}`);
        }
        variable.set(context.readInput('value'));
      },
    );
  }
};
