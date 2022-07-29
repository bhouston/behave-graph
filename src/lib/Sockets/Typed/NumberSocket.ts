import { SocketValueType } from '../SocketValueType';
import Socket from '../Socket';

export default class NumberSocket extends Socket {
  constructor(
    name: string,
    value: number = 0,
  ) {
    super(name, SocketValueType.Number, value);
  }
}
