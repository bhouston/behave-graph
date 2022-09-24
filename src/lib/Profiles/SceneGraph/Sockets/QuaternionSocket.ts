import { Quaternion } from 'three';

import Socket from '../../../Sockets/Socket';

export default class QuaternionSocket extends Socket {
  constructor(
    name: string,
    value = new Quaternion(),
  ) {
    super(name, 'quaternion', value);
  }
}
