import { promises as fs } from 'node:fs';

import { Logger } from '../../lib/Diagnostics/Logger.js';
import { writeNodeSpecsToJSON } from '../../lib/Graphs/IO/writeNodeSpecsToJSON.js';
import { validateNodeRegistry } from '../../lib/Nodes/Validation/validateNodeRegistry.js';
import { registerCoreProfile } from '../../lib/Profiles/Core/registerCoreProfile.js';
import { registerSceneProfile } from '../../lib/Profiles/Scene/registerSceneProfile.js';
import { Registry } from '../../lib/Registry.js';

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
