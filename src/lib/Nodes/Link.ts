export class Link {
  constructor(public nodeId: string, public socketName: string) {
    if (nodeId.length === 0) throw new Error('nodeId can not be empty');
    if (socketName.length === 0) throw new Error('socketName can not be empty');
  }
}
