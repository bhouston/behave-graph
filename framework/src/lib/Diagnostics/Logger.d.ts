import { EventEmitter } from '../Events/EventEmitter.js';
export declare class Logger {
    static readonly onVerbose: EventEmitter<string>;
    static readonly onInfo: EventEmitter<string>;
    static readonly onWarn: EventEmitter<string>;
    static readonly onError: EventEmitter<string>;
    static verbose(text: string): void;
    static info(text: string): void;
    static warn(text: string): void;
    static error(text: string): void;
}
//# sourceMappingURL=Logger.d.ts.map