import { EventEmitter } from '../../../../Events/EventEmitter.js';
import { ILifecycleEventEmitter } from '../ILifecycleEventEmitter.js';
export declare class ManualLifecycleEventEmitter implements ILifecycleEventEmitter {
    readonly startEvent: EventEmitter<void>;
    readonly endEvent: EventEmitter<void>;
    readonly tickEvent: EventEmitter<void>;
}
//# sourceMappingURL=ManualLifecycleEventEmitter.d.ts.map