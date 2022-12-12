const cSeparator = /[^\d+.-]+/;

export function parseSafeFloat(text: string, fallback = 0): number {
  try {
    return Number.parseFloat(text);
  } catch {
    return fallback;
  }
}
export function parseSafeFloats(text: string, fallback = 0): number[] {
  return text
    .split(cSeparator)
    .filter(Boolean)
    .map((value) => parseSafeFloat(value, fallback));
}

export function toSafeString(elements: number[]): string {
  return `[${elements.join(',')}]`;
}
