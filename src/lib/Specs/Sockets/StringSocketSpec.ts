import { SocketValueType } from '../../Core/Sockets/SocketValueType';
import SocketSpec from './SocketSpec';

export default class StringSocketSpec extends SocketSpec {
  constructor(
    public name: string,
    public defaultValue: string = '',
  ) {
    super(name, SocketValueType.String, defaultValue);
  }
}
