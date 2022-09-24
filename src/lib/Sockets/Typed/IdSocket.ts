import Socket from '../Socket';

export default class IdSocket extends Socket {
  constructor(
    name: string,
    value: string = '',
  ) {
    super('id', name, value);
  }
}
