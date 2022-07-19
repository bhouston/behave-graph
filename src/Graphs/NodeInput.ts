export class NodeInput {
    constructor(
        public definition: SocketSpec,
        public nodeIndex: number | undefined,
        public outputName: string | undefined,
        public value: any | undefined
    ) { }
}
