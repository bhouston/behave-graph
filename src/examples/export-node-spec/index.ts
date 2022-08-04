import { GraphTypeRegistry, registerGenericNodes, writeNodeSpecsToJSON } from '../../../dist/lib/index';

async function main() {
  const registry = new GraphTypeRegistry();
  registerGenericNodes(registry);
  writeNodeSpecsToJSON(registry);
}

main();
