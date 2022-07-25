import { SocketValueType } from '../../Core/Sockets/SocketValueType';
import SocketSpec from './SocketSpec';

export default class NumberSocketSpec extends SocketSpec {
  constructor(
    public name: string,
    public defaultValue: number = 0,
  ) {
    super(name, SocketValueType.Number, defaultValue);
  }
}
