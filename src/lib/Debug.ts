export default class Debug {
  public static verbose = false;

  static asset(condition: boolean, msg: string = '') {
    if (!condition) throw new Error(`failed assertion: ${msg}`);
  }

  static log(text: string) {
    if (Debug.verbose) {
      console.log(`[${new Date().toLocaleString()}]  ${text}`);
    }
  }

  static warn(text: string) {
    console.log(`[${new Date().toLocaleString()}] ${text}`);
  }
}
