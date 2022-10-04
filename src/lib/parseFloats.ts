const cSeparator = /[^\d+.-]+/;

export function parseFloats(text: string): number[] {
  return text
    .split(cSeparator)
    .filter(Boolean)
    .map((value) => Number.parseFloat(value));
}
