type EventCallback = (...args: unknown[]) => void;

class EventBus {
  private listeners: Map<string, EventCallback[]> = new Map();

  on(event: string, callback: EventCallback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
    return () => this.off(event, callback);
  }

  off(event: string, callback: EventCallback) {
    const cbs = this.listeners.get(event);
    if (cbs) {
      this.listeners.set(event, cbs.filter(cb => cb !== callback));
    }
  }

  emit(event: string, ...args: unknown[]) {
    const cbs = this.listeners.get(event);
    if (cbs) {
      cbs.forEach(cb => cb(...args));
    }
  }
}

export const eventBus = new EventBus();
export default eventBus;
