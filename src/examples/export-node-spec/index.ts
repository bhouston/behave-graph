import { promises as fs } from 'node:fs';

import {
  Logger,
  registerCoreProfile,
  registerSceneProfile,
  Registry,
  validateNodeRegistry,
  writeNodeSpecsToJSON
} from '../../lib';

async function main() {
  // Logger.onVerbose.clear();

  const outputPath = process.argv[2];
  if (outputPath === undefined) {
    throw new Error('no path specified');
  }

  const registry = new Registry();
  registerCoreProfile(registry);
  registerSceneProfile(registry);

  const errorList: string[] = [];
  errorList.push(...validateNodeRegistry(registry));
  if (errorList.length > 0) {
    Logger.error(`${errorList.length} errors found:`);
    errorList.forEach((errorText, errorIndex) => {
      Logger.error(`${errorIndex}: ${errorText}`);
    });
    return;
  }

  await fs.writeFile(
    outputPath,
    JSON.stringify(writeNodeSpecsToJSON(registry), null, ' '),
    { encoding: 'utf-8' }
  );
}

main();
