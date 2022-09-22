import EventEmitter from './EventEmitter';

export default class Logger {
  public static readonly onVerbose = new EventEmitter<string>();
  public static readonly onWarn = new EventEmitter<string>();
  public static readonly onError = new EventEmitter<string>();

  static {
    Logger.onVerbose.addListener((text: string) => { console.log(`[${new Date().toLocaleString()}]  ${text}`); });
    Logger.onWarn.addListener((text: string) => { console.warn(`[${new Date().toLocaleString()}] WARNING:  ${text}`); });
    Logger.onError.addListener((text: string) => { console.error(`[${new Date().toLocaleString()}] ERROR:  ${text}`); });
  }

  static verbose(text: string) {
    this.onVerbose.emit(text);
  }

  static warn(text: string) {
    this.onWarn.emit(text);
  }

  static error(text: string) {
    this.onError.emit(text);
  }
}
