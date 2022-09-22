/* eslint-disable semi */

import EventEmitter from '../DesignPatterns/EventEmitter';

export default interface ILifecycleAbstraction {
  startEvent: EventEmitter<void>;
  endEvent: EventEmitter<void>;
  tickEvent: EventEmitter<void>;
};
