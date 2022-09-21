import { Metadata } from '../Graphs/Metadata';

export default class Variable {
  public value: any;
  public label: string = '';
  public metadata: Metadata = {};
  public version = 0; // this is updated on each change to the variable state.

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly valueTypeName: string,
    public initialValue: any = undefined, // this is assumed to be properly deseriealized from a string.
  ) {
    this.value = this.initialValue;
  }

  get(): any {
    return this.value;
  }

  set(newValue: any) {
    this.value = newValue;
    this.version++;
  }
}
