import EventEmitter from './EventEmitter';

export default class Debug {
  public static readonly onVerbose = new EventEmitter<string>();
  public static readonly onWarn = new EventEmitter<string>();
  public static readonly onError = new EventEmitter<string>();

  static {
    Debug.onVerbose.addListener((text: string) => { console.log(`[${new Date().toLocaleString()}]  ${text}`); });
    Debug.onWarn.addListener((text: string) => { console.warn(`[${new Date().toLocaleString()}]  ${text}`); });
    Debug.onError.addListener((text: string) => { console.error(`[${new Date().toLocaleString()}]  ${text}`); });
  }

  static asset(condition: boolean, msg: string = '') {
    if (!condition) throw new Error(`failed assertion: ${msg}`);
  }

  static logVerbose(text: string) {
    this.onVerbose.emit(text);
  }

  static logWarn(text: string) {
    this.onWarn.emit(text);
  }

  static logError(text: string) {
    this.onError.emit(text);
  }
}
