import * as fs from 'fs/promises';

import { GraphRegistry, registerGenericNodes, writeNodeSpecsToJSON } from '../../../dist/lib/index';

async function main() {
  const registry = new GraphRegistry();
  registerGenericNodes(registry.nodes);

  const outputPath = process.argv[2];
  if (outputPath === undefined) {
    throw new Error('no path specified');
  }

  await fs.writeFile(outputPath, JSON.stringify(writeNodeSpecsToJSON(registry), null, ' '), { encoding: 'utf-8' });
}

main();
