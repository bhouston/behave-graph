import { SocketValueType } from '../SocketValueType';
import Socket from '../Socket';

export default class BooleanSocket extends Socket {
  constructor(
    name: string,
    value: boolean = true,
  ) {
    super(name, SocketValueType.Boolean, value);
  }
}
