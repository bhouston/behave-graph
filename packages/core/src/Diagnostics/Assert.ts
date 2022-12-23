export class Assert {
  static mustBeTrue(condition: boolean, msg = '') {
    if (!condition) {
      throw new Error(`failed assertion: ${msg}`);
    }
  }
  static mustBeDefined(variable: any, msg = '') {
    if (variable === undefined) {
      throw new Error(`failed assertion: variable must be defined ${msg}`);
    }
  }
}
