import { SocketValueType } from '../SocketValueType';
import Socket from '../Socket';

export default class StringSocket extends Socket {
  constructor(
    name: string,
    value: string = '',
  ) {
    super(name, SocketValueType.String, value);
  }
}
