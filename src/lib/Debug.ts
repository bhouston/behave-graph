import { DebugLogFunc } from './DebugLogFunc';

export default class Debug {
  static asset(condition: boolean, msg: string = '') {
    if (!condition) throw new Error(`failed assertion: ${msg}`);
  }

  public static verbose = false;
  public static onVerbose: DebugLogFunc = (text) => { console.log(`[${new Date().toLocaleString()}]  ${text}`); };
  static logVerbose(text: string) {
    if (Debug.verbose) {
      this.onVerbose(text);
    }
  }

  public static warn = true;
  public static onWarn: DebugLogFunc = (text) => { console.log(`[${new Date().toLocaleString()}]  ${text}`); };
  static logWarn(text: string) {
    if (Debug.warn) {
      this.onWarn(text);
    }
  }

  public static error = true;
  public static onError: DebugLogFunc = (text) => { console.log(`[${new Date().toLocaleString()}]  ${text}`); };
  static logError(text: string) {
    if (Debug.error) {
      this.onError(text);
    }
  }
}
