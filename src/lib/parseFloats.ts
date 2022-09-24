const SEPARATOR = /[^\d.+-]+/;

export default function parseFloats(text: string): number[] {
  return text.split(SEPARATOR).filter(Boolean).map(parseFloat);
}
