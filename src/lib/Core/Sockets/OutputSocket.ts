import { NodeSocketRef } from '../Nodes/NodeSocketRef';

export default class OutputSocket {
  constructor(
        public downlinks = new Array<NodeSocketRef>(),
        public value: any | undefined = undefined,
  ) { }
}
