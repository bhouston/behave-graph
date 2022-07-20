import { SocketValueType } from '../SocketValueType';
import SocketSpec from './SocketSpec';

export default class EvalSocketSpec extends SocketSpec {
  constructor(
    public name: string = 'eval',
  ) {
    super(name, SocketValueType.Eval, undefined);
  }
}
