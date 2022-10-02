/* eslint-disable class-methods-use-this */
import Logger from '../../Diagnostics/Logger';
import ILogger from '../ILogger';

export default class DefaultLogger implements ILogger {
  constructor() {}

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
