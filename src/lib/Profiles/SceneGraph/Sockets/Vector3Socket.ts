import { Vector3 } from 'three';

import Socket from '../../../Sockets/Socket';

export default class Vector3Socket extends Socket {
  constructor(
    name: string,
    value = new Vector3(),
  ) {
    super(name, 'vector3', value);
  }
}
