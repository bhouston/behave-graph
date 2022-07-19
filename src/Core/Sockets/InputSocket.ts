import { SocketSpec } from "./SocketSpec";

export class InputSocket {
    constructor(
        public definition: SocketSpec,
        public unlinkNodeIndex: number | undefined,
        public unlinkNodeOutputSocketName: string | undefined,
        public value: any | undefined
    ) { }
}
