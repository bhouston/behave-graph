import * as fs from "fs/promises";
import {
  Debug,
  GraphEvaluator,
  loadGraph,
  registerGenericNodes,
  NodeRegistry,
} from "../../dist/index.js";

async function main() {
  const nodeRegistry = new NodeRegistry();
  registerGenericNodes(nodeRegistry);

  const graphJsonPath = process.argv[2];
  if (graphJsonPath === undefined) {
    throw new Error("no path specified");
  }

  Debug.log(`reading behavior graph: ${graphJsonPath}`);
  const textFile = await fs.readFile(graphJsonPath, { encoding: "utf-8" });
  const graph = loadGraph(JSON.parse(textFile), nodeRegistry);
  graph.name = graphJsonPath;

  Debug.log("creating behavior graph");
  const graphEvaluator = new GraphEvaluator(graph);

  Debug.log("triggering start event");
  graphEvaluator.triggerEvents("event/start");

  Debug.log("executing all (async)");
  await graphEvaluator.executeAllAsync();
}

main();
