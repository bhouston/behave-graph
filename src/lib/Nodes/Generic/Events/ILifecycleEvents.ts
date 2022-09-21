/* eslint-disable semi */

import EventEmitter from '../../../EventEmitter';

export default interface ILifecycleEvents {
  startEvent: EventEmitter<void>;
  endEvent: EventEmitter<void>;
  tickEvent: EventEmitter<void>;
};
