import Socket from '../Socket';
import { SocketValueType } from '../SocketValueType';

export default class BooleanSocket extends Socket {
  constructor(
    name: string,
    value: boolean = true,
  ) {
    super(name, SocketValueType.Boolean, value);
  }
}
