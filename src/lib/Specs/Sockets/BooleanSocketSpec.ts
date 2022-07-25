import { SocketValueType } from '../../Core/Sockets/SocketValueType';
import SocketSpec from './SocketSpec';

export default class BooleanSocketSpec extends SocketSpec {
  constructor(
    public name: string,
    public defaultValue: boolean = true,
  ) {
    super(name, SocketValueType.Boolean, defaultValue);
  }
}
