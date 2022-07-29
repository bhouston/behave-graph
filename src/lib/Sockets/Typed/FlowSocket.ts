import { SocketValueType } from '../SocketValueType';
import Socket from '../Socket';

export default class FlowSocket extends Socket {
  constructor(
    name: string = 'flow',
  ) {
    super(name, SocketValueType.Flow, undefined);
  }
}
