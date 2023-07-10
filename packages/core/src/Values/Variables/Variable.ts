import { EventEmitter } from '../../Events/EventEmitter.js';
import { Metadata } from '../../Metadata.js';

export class Variable {
  private value: any;
  public label = '';
  public metadata: Metadata = {};
  public version = 0; // this is updated on each change to the variable state.
  public readonly onChanged = new EventEmitter<Variable>();

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly valueTypeName: string,
    public initialValue: any // this is assumed to be properly deseriealized from a string.
  ) {
    this.value = this.initialValue;
  }

  get(): any {
    return this.value;
  }

  set(newValue: any) {
    if (newValue !== this.value) {
      this.value = newValue;
      this.version++;
      this.onChanged.emit(this);
    }
  }
}
