import { Metadata } from '../Metadata.js';
import { Socket } from '../Sockets/Socket.js';
import { EventEmitter } from './EventEmitter.js';
export declare class CustomEvent {
    readonly id: string;
    readonly name: string;
    readonly parameters: Socket[];
    label: string;
    metadata: Metadata;
    readonly eventEmitter: EventEmitter<{
        [parameterName: string]: any;
    }>;
    constructor(id: string, name: string, parameters?: Socket[]);
}
//# sourceMappingURL=CustomEvent.d.ts.map