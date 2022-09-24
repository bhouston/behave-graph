import { Vector2 } from 'three';

import Socket from '../../../Sockets/Socket';

export default class Vector2Socket extends Socket {
  constructor(
    name: string,
    value = new Vector2(),
  ) {
    super(name, 'vector2', value);
  }
}
