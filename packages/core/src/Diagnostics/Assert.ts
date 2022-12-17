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
}
