import { EventListener } from './EventListener';

export class EventEmitter<T> {
  private readonly listeners: EventListener<T>[] = [];

  addListener(listener: EventListener<T>) {
    this.listeners.push(listener);
  }

  removeListener(listener: EventListener<T>) {
    this.listeners.splice(this.listeners.indexOf(listener), 1);
  }

  clear() {
    this.listeners.splice(0, this.listeners.length);
  }

  emit(event: T) {
    // copy array before emitting event to ensure even if listener array is modified, everyone listening initially gets the event.
    // inspired by mrdoob's EventDispatcher
    this.listeners.slice(0).forEach((listener) => {
      listener(event);
    });
  }

  get listenerCount(): number {
    return this.listeners.length;
  }
}
