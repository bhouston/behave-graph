import { SocketValueType } from "./SocketValueType";


export class SocketSpec {

    constructor(
        public type: SocketValueType,
        public name: string
    ) {
    }

}
