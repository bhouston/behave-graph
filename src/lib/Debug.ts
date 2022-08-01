export default class Debug {
  public static verbose = true;

  static asset(condition: boolean, msg: string = '') {
    if (!condition) throw new Error(`failed assertion: ${msg}`);
  }

  static log(text: string) {
    if (Debug.verbose) {
      console.log(text);
    }
  }

  static warn(text: string) {
    console.warn(text);
  }
}
