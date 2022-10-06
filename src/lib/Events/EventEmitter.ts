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
    this.listeners.forEach((listener) => {
      listener(event);
    });
  }

  get listenerCount(): number {
    return this.listeners.length;
  }
}
