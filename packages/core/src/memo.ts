export function memo<T>(func: () => T): () => T {
  let cache: T | undefined;
  return (): T => {
    if (cache === undefined) {
      cache = func();
    }
    return cache;
  };
}
