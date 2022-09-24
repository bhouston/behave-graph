import Socket from '../Socket';

export default class NumberSocket extends Socket {
  constructor(
    name: string,
    value: number = 0,
  ) {
    super('number', name, value);
  }
}
