import { NodeDescription } from './NodeDescription.js';

export function toNodeDescriptions(importWildcard: any) {
  return Object.keys(importWildcard).map(
    (key) => (importWildcard as { [key: string]: NodeDescription })[key]
  ) as NodeDescription[];
}
