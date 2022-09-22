import Socket from '../../../Sockets/Socket';
import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import IdSocket from '../../../Sockets/Typed/VariableSocket';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';

export default class VariableSet extends Node {
  constructor(name:string, public valueTypeName: string, socketFactory: (socketName:string) => Socket) {
    super(
      'State',
      name,
      [new FlowSocket(), new IdSocket('variable'), socketFactory('value')],
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
