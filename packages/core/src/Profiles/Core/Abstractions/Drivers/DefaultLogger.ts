/* eslint-disable class-methods-use-this */
import { Logger } from '../../../../Diagnostics/Logger.js';
import { ILogger, LogSeverity } from '../ILogger.js';

export class DefaultLogger implements ILogger {
  log(severity: LogSeverity, text: string): void {
    Logger.log(severity, text);
  }
}
