import * as fs from 'fs/promises';
import GraphLoader from '../lib/IO/loadGraph';
import { GlobalNodeSpecRegistry } from '../lib/Nodes/NodeRegistry';

async function main() {
  const loader = new GraphLoader();
  const textFile = await fs.readFile('./examples/helloworld.json', { encoding: 'utf-8' });
  console.log(textFile);
  const graph = loader.parse(JSON.parse(textFile), GlobalNodeSpecRegistry);
  console.log(graph);
}

main();
