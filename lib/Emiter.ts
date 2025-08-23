export class Event<T extends (...args: any[]) => void> {
    private listeners: T[] = [];
  
    subscribe(fn: T) {
      this.listeners.push(fn);
    }
  
    unsubscribe(fn: T) {
      this.listeners = this.listeners.filter(l => l !== fn);
    }
  
    invoke(...args: Parameters<T>) {
      for (const fn of this.listeners) {
        fn(...args);
      }
    }
  }
  