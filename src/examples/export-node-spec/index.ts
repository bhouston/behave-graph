import * as fs from 'fs/promises';

import { Debug, validateDirectedAcyclicGraph, validateGraphRegistry, validateLinks, GraphRegistry, registerGenericNodes, writeNodeSpecsToJSON } from '../../../dist/lib/index';

async function main() {
  const registry = new GraphRegistry();
  registerGenericNodes(registry.nodes);

  const outputPath = process.argv[2];
  if (outputPath === undefined) {
    throw new Error('no path specified');
  }

  Debug.logVerbose('validating:');
  const errorList: string[] = [];
  Debug.logVerbose('validating registry');
  errorList.push(...validateGraphRegistry(registry));
  
  if (errorList.length > 0) {
    Debug.logError(`${errorList.length} errors found:`);
    errorList.forEach((errorText, errorIndex) => {
      Debug.logError(`${errorIndex}: ${errorText}`);
    });
    return;
  }

  await fs.writeFile(outputPath, JSON.stringify(writeNodeSpecsToJSON(registry), null, ' '), { encoding: 'utf-8' });
}

main();
