import Socket from '../Socket';
import { SocketValueType } from '../SocketValueType';

export default class NumberSocket extends Socket {
  constructor(
    name: string,
    value: number = 0,
  ) {
    super(name, SocketValueType.Number, value);
  }
}
