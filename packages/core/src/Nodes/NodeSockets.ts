import { Socket } from '../Sockets/Socket.js';

export const readInputFromSockets = <T>(
  inputs: Socket[],
  inputName: string,
  nodeTypeName: string
) => {
  const inputSocket = inputs.find((socket) => socket.name === inputName);
  if (inputSocket === undefined) {
    throw new Error(
      `can not find input socket with name ${inputName} on node of type ${nodeTypeName}`
    );
  }
  return inputSocket.value as T;
};

export const writeOutputsToSocket = <T>(
  outputs: Socket[],
  outputName: string,
  value: T,
  nodeTypeName: string
) => {
  const outputSocket = outputs.find((socket) => socket.name === outputName);
  if (outputSocket === undefined) {
    throw new Error(
      `can not find output socket with name ${outputName} on node of type ${nodeTypeName}`
    );
  }
  outputSocket.value = value;
};
