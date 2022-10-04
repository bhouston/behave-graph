/* eslint-disable semi */
import { Object3D } from 'three';

export interface IThree {
  getObject3D(nodeId: string): Object3D;
}
