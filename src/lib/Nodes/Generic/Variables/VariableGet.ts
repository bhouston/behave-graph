import Socket from '../../../Sockets/Socket';
import IdSocket from '../../../Sockets/Typed/VariableSocket';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';

export default class VariableGet extends Node {
  constructor(name:string, public valueTypeName: string, socketFactory: (socketName:string) => Socket) {
    super(
      'Variables',
      name,
      [new IdSocket('variable')],
      [socketFactory('value')],
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
