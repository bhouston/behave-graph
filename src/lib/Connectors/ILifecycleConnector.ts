/* eslint-disable semi */

import EventEmitter from '../EventEmitter';

export default interface ILifecycleConnector {
  startEvent: EventEmitter<void>;
  endEvent: EventEmitter<void>;
  tickEvent: EventEmitter<void>;
};
