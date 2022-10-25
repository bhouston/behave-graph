import { NodeDescription } from './NodeDescription.js';

export function getNodeDescriptions(importWildcard: any) {
  return Object.keys(importWildcard)
    .map((key) => (importWildcard as { [key: string]: any })[key])
    .filter((value) => value instanceof NodeDescription) as NodeDescription[];
}
