import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';
import Socket from '../../../Sockets/Socket';

export default class OnVariableChanged extends Node {
  constructor(name:string, public valueTypeName: string) {
    super(
      'Variables',
      name,
      [
        new Socket('id', 'variable'),
      ],
      [
        new Socket('flow', 'flow'),
        new Socket(valueTypeName, 'value'),
      ],
      (context:NodeEvalContext) => {
        const variableId = context.readInput('variable');
        const variable = context.getVariable(variableId);
        if (this.valueTypeName !== variable.valueTypeName) {
          throw new Error(`type mismatch between VariableGet ${this.valueTypeName} and variable ${variable.valueTypeName}`);
        }

        const onValueChanged = () => {
          context.writeOutput('value', variable.get());
          context.commit('flow');
        };
        variable.onChanged.addListener(onValueChanged);

        context.onAsyncCancelled.addListener(() => {
          variable.onChanged.removeListener(onValueChanged);
        });
      },
    );

    this.async = true;
    this.interruptibleAsync = true;
    this.evaluateOnStartup = true;
  }
}
