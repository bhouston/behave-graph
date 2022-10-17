export function extractPostfixFromNodeType(nodeType: string): string {
  const tokens = nodeType.split('/');
  const lastToken = tokens.at(-1);
  if (lastToken === undefined) {
    throw new Error(
      `can not break ${nodeType} into forward slash-separated tokens`
    );
  }
  return lastToken;
}
