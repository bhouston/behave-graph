export function toCamelCase(text: string): string {
  if (text.length > 0) {
    return text.at(0)?.toLocaleUpperCase() + text.slice(1);
  }
  return text;
}
