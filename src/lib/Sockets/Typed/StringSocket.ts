import Socket from '../Socket';

export default class StringSocket extends Socket {
  constructor(
    name: string,
    value: string = '',
  ) {
    super(name, 'string', value);
  }
}
