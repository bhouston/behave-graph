import { NodeSpecJSON } from '../../../../packages/core/src/Graphs/IO/NodeSpecJSON';
import { Socket } from '../../../../packages/core/src/Sockets/Socket';

export default (inputs: Socket[], specJSON: NodeSpecJSON) => {
  if (inputs.length === 0) {
    return '';
  }

  return `
| Name | Type | Default Value | Choices |
|------|------|---------------|---------|
${inputs
  .map(
    (i) =>
      `| ${i.name} | ${i.valueTypeName} | ${
        i.value ?? ''
      } | ${i.valueChoices?.join(', ')} |`
  )
  .join('\n')}
`;
};
