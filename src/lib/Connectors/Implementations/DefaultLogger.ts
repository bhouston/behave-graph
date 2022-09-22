/* eslint-disable class-methods-use-this */
import Logger from '../../Logger';
import ILoggerConnector from '../ILoggerConnector';

export default class DefaultLogger implements ILoggerConnector {
  constructor() {
  }

  verbose(text: string): void {
    Logger.verbose(text);
  }

  info(text: string): void {
    Logger.info(text);
  }

  warn(text: string): void {
    Logger.warn(text);
  }

  error(text: string): void {
    Logger.error(text);
  }
}
