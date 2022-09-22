import { promises as fs } from 'fs';

import {
  DefaultLogger, GraphEvaluator, Logger, ManualLifecycle,
  readGraphFromJSON, registerGenericNodes,
  Registry, validateDirectedAcyclicGraph, validateGraphRegistry, validateLinks,
} from '../../../dist/lib/index';

async function main() {
  // Logger.onVerbose.clear();

  const registry = new Registry();
  registerGenericNodes(registry.nodes);
  registry.connectors.register('ILoggerConnector', new DefaultLogger());
  const manualLifecycle = new ManualLifecycle();
  registry.connectors.register('ILifecycleConnector', manualLifecycle);

  const graphJsonPath = process.argv[2];
  if (graphJsonPath === undefined) {
    throw new Error('no path specified');
  }

  Logger.verbose(`reading behavior graph: ${graphJsonPath}`);
  const textFile = await fs.readFile(graphJsonPath, { encoding: 'utf-8' });
  const graph = readGraphFromJSON(JSON.parse(textFile), registry);
  graph.name = graphJsonPath;

  // await fs.writeFile('./examples/test.json', JSON.stringify(writeGraphToJSON(graph), null, ' '), { encoding: 'utf-8' });
  Logger.verbose('validating:');
  const errorList: string[] = [];
  Logger.verbose('validating registry');
  errorList.push(...validateGraphRegistry(registry));
  Logger.verbose('validating socket links have matching types on either end');
  errorList.push(...validateLinks(graph));
  Logger.verbose('validating that graph is directed acyclic');
  errorList.push(...validateDirectedAcyclicGraph(graph));

  if (errorList.length > 0) {
    Logger.error(`${errorList.length} errors found:`);
    errorList.forEach((errorText, errorIndex) => {
      Logger.error(`${errorIndex}: ${errorText}`);
    });
    return;
  }

  Logger.verbose('creating behavior graph');
  const graphEvaluator = new GraphEvaluator(graph);

  /*
  graphEvaluator.evaluationListeners.push((node: Node, nodeEvaluationType: NodeEvaluationType, async: boolean) => {
    if (nodeEvaluationType === NodeEvaluationType.None) {
      console.log(`Node ${node.typeName} ${node.id} completed evaluation.`);
    } else {
      console.log(`Node ${node.typeName} ${node.id} started evaluation, mode: ${NodeEvaluationType[nodeEvaluationType]}, async: ${async}.`);
    }
  });
  */

  Logger.verbose('triggering start event');
  manualLifecycle.startEvent.emit();

  Logger.verbose('executing all (async)');
  await graphEvaluator.executeAllAsync(5.0);

  Logger.verbose('triggering end event');
  manualLifecycle.endEvent.emit();

  Logger.verbose('executing all (async)');
  await graphEvaluator.executeAllAsync(5.0);
}

main();
