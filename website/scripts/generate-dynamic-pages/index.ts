import { join } from 'node:path';

// import generatePagesFromDescriptions from './generate-pages-from-descriptions';
// import { descriptions as coreDescriptions } from './profiles/core';
// generatePagesFromDescriptions(
//   coreDescriptions,
//   join(__dirname, '../../docs/profiles/Core')
// );
import { registerCoreProfile } from '../../../packages/core/src/Profiles/Core/registerCoreProfile';
import { registerSceneProfile } from '../../../packages/core/src/Profiles/Scene/registerSceneProfile';
import { Registry } from '../../../packages/core/src/Registry';
import generatePagesFromExamples from './generate-pages-from-examples';
import generatePagesFromRegistry from './generate-pages-from-registry';

const coreRegistry = new Registry();

registerCoreProfile(coreRegistry);

generatePagesFromRegistry(
  coreRegistry,
  join(__dirname, '../../docs/profiles/Core')
);

const sceneRegistry = new Registry();
const sceneFunctionalRegistry = new Registry();

registerSceneProfile(sceneRegistry);
registerCoreProfile(sceneFunctionalRegistry);
registerSceneProfile(sceneFunctionalRegistry);

generatePagesFromRegistry(
  sceneRegistry,
  join(__dirname, '../../docs/profiles/Scene'),
  sceneFunctionalRegistry
);

generatePagesFromExamples(
  join(__dirname, '../../../graphs'),
  join(__dirname, '../../docs/examples')
);
