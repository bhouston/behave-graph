export default class Assert {
  static mustBeTrue(condition: boolean, msg: string = '') {
    if (!condition) throw new Error(`failed assertion: ${msg}`);
  }
}
