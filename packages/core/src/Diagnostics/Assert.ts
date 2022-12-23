export class Assert {
  static mustEqual(value: number, mustEqualThisValue: number, msg = '') {
    if (value !== mustEqualThisValue) {
      throw new Error(
        `failed assertion: ${value} must equal ${mustEqualThisValue}.  ${msg}`
      );
    }
  }
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
