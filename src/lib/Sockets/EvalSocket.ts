import { SocketValueType } from '../../Core/Sockets/SocketValueType';
import Socket from './Socket';

export default class EvalSocket extends Socket {
  constructor(
    name: string = 'eval',
  ) {
    super(name, SocketValueType.Eval, undefined);
  }
}
