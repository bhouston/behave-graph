const cSeparator = /[^\d.+-]+/;

export default function parseFloats(text: string): number[] {
  return text.split(cSeparator).filter(Boolean).map(parseFloat);
}
