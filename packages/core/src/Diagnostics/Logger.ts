/* eslint-disable no-console */

import { EventEmitter } from '../Events/EventEmitter';

export class Logger {
  public static readonly onVerbose = new EventEmitter<string>();
  public static readonly onInfo = new EventEmitter<string>();
  public static readonly onWarn = new EventEmitter<string>();
  public static readonly onError = new EventEmitter<string>();

  static {
    const prefix = () => {
      return new Date().toLocaleTimeString().padStart(11, '0');
    };
    Logger.onVerbose.addListener((text: string) => {
      console.log(prefix() + ` VERB:  ${text}`);
    });
    Logger.onInfo.addListener((text: string) => {
      console.log(prefix() + ` INFO:  ${text}`);
    });
    Logger.onWarn.addListener((text: string) => {
      console.warn(prefix() + ` WARN:  ${text}`);
    });
    Logger.onError.addListener((text: string) => {
      console.error(prefix() + ` ERR:  ${text}`);
    });
  }

  static verbose(text: string) {
    this.onVerbose.emit(text);
  }

  static info(text: string) {
    this.onInfo.emit(text);
  }

  static warn(text: string) {
    this.onWarn.emit(text);
  }

  static error(text: string) {
    this.onError.emit(text);
  }
}
