export class Assert {
  static mustBeTrue(condition: boolean, msg = '') {
    if (!condition) {
      throw new Error(`failed assertion: ${msg}`);
    }
  }
}
