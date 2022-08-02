import Socket from '../Socket';
import { SocketValueType } from '../SocketValueType';

export default class FlowSocket extends Socket {
  constructor(
    name: string = 'flow',
  ) {
    super(name, SocketValueType.Flow, undefined);
  }
}
