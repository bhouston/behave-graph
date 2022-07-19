import { SocketValueType } from "./SocketValueType";

export class SocketSpec {
  constructor(
    public name: string,
    public valueType: SocketValueType,
    public defaultValue: any = undefined
  ) {}
}

export class EvalSocketSpec extends SocketSpec {

  constructor(
    public name: string = "eval"
  ) {
    super( name, SocketValueType.Eval, undefined );
  }

}
export class StringSocketSpec extends SocketSpec {
   constructor(
    public name: string,
    public defaultValue: string = ""
   ) {
    super( name, SocketValueType.String, defaultValue );
   }
}
export class NumberSocketSpec extends SocketSpec {
  constructor(
   public name: string,
   public defaultValue: number = 0
  ) {
   super( name, SocketValueType.Number, defaultValue );
  }
}

export class BooleanSocketSpec extends SocketSpec {
  constructor(
   public name: string,
   public defaultValue: boolean = true
  ) {
   super( name, SocketValueType.Boolean, defaultValue );
  }
}