import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import Node from '../../Node';
import { NodeCategory } from '../../NodeCategory';

export default class Tick extends Node {
  constructor() {
    super(
      NodeCategory.Event,
      'event/tick',
      [],
      [new FlowSocket()],
      () => {},
    );
  }
}
