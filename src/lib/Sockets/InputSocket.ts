import { NodeSocketRef } from '../Nodes/NodeSocketRef';

export default class InputSocket {
  constructor(
        public uplinks = new Array<NodeSocketRef>(),
        public value: any | undefined,
  ) { }
}
