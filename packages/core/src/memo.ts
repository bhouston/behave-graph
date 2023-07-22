export function memo<T>(func: () => T): () => T {
  let cache: T | undefined;
  return (): T => {
    if (cache === undefined) {
      cache = func();
    }
    return cache;
  };
}

export function asyncMemo<T>(func: () => Promise<T>): () => Promise<T> {
  let cache: T | undefined;
  return async (): Promise<T> => {
    if (cache === undefined) {
      cache = await func();
    }
    return cache;
  };
}
