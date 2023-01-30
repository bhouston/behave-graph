import { INode } from '@behave-graph/core';

import { NodeSpecJSON } from '../../../../packages/core/src/Graphs/IO/NodeSpecJSON';
import inputsTemplate from './inputs';
import outputsTemplate from './outputs';

const buildPage = (
  node: INode,
  specJSON: NodeSpecJSON,
  displayDynamicInputsOutputsLegend: boolean
) => `
import NodePreview from '@site/src/components/NodePreview';

# ${node.description.typeName}

${node.description.helpDescription || node.description.label}

<NodePreview 
  description={${JSON.stringify(node.description, null, 2)}}
  inputs={${JSON.stringify(node.inputs, null, 2)}}
  outputs={${JSON.stringify(node.outputs, null, 2)}}
  spec={${JSON.stringify(specJSON, null, 2)}}  />

${inputsTemplate(node, specJSON)}

${outputsTemplate(node, specJSON)}

${displayDynamicInputsOutputsLegend ? '*: Dynamic I/O' : ''}

`;

export default (node: INode, specJSON: NodeSpecJSON) => {
  const hasVariableInputs =
    node.inputs.some((i) => i.name === '1') &&
    node.inputs.length !== specJSON.inputs.length;

  const hasVariableOutputs =
    node.outputs.some((i) => i.name === '1') &&
    node.outputs.length !== specJSON.outputs.length;

  if (hasVariableInputs) {
    specJSON.inputs = node.inputs.map((i) => {
      const inSpec = specJSON.inputs.find((s) => s.name === i.name);
      const returnValue = inSpec ?? {
        name: i.name,
        valueType: i.valueTypeName,
        defaultValue: i.value
      };

      if (Number.isInteger(Number.parseInt(i.name, 10))) {
        (i as any).name = `${i.name} *`;
      }

      return returnValue;
    });
  }

  if (hasVariableOutputs) {
    specJSON.outputs = node.outputs.map((i) => {
      const inSpec = specJSON.outputs.find((s) => s.name === i.name);
      const returnValue = inSpec ?? {
        name: i.name,
        valueType: i.valueTypeName,
        defaultValue: i.value
      };

      if (Number.isInteger(Number.parseInt(i.name, 10))) {
        (i as any).name = `${i.name} *`;
      }

      return returnValue;
    });
  }

  return buildPage(node, specJSON, hasVariableInputs || hasVariableOutputs);
};
