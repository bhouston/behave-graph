import { Socket } from '../../../../packages/core/src/Sockets/Socket';

export default (sockets: Socket[]) => {
  if (sockets.length === 0) {
    return '';
  }

  return `
| Name | Type |
|------|------|
${sockets.map((i) => `| ${i.name} | ${i.valueTypeName} |`).join('\n')}
`;
};
