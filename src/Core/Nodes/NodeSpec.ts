import { SocketSpec } from "../Sockets/SocketSpec";

// structure for defining BehaviorNodes

export class NodeSpec {

    constructor(
        public type: string,
        public name: string,
        public inputDefinitions: Array<SocketSpec>,
        public outputDefinitions: Array<SocketSpec>,
        public func: function(any, Map<string, any>): Map<string, any>
    ) {
    }

}
