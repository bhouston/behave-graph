import Socket from '../Socket';

export default class FlowSocket extends Socket {
  constructor(
    name: string = 'flow',
  ) {
    super('flow', name, undefined);
  }
}
