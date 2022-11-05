export declare class EventEmitter<T> {
    private readonly listeners;
    addListener(listener: (t: T) => void): void;
    removeListener(listener: (t: T) => void): void;
    clear(): void;
    emit(event: T): void;
    get listenerCount(): number;
}
//# sourceMappingURL=EventEmitter.d.ts.map