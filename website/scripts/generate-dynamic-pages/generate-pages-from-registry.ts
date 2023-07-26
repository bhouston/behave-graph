import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import {
  Graph,
  IGraph,
  NodeDefinition,
  NodeSpecJSON,
  Registry,
  ValueType,
  writeNodeSpecsToJSON
} from '@behave-graph/core';
// We need to transform directories to kebab case because otherwise Docusaurus won't generate the toString one
import { kebab, pascal } from 'case';

import nodeTemplate from './templates/node.js';

const generateValuePages = (values: ValueType[], baseDir: string) => {
  const valuesDir = join(baseDir, 'Values');
  if (!existsSync(valuesDir)) {
    console.log('Creating directory', valuesDir);
    mkdirSync(valuesDir, { recursive: true });
  }

  console.log('Writing category file', join(valuesDir, '_category_.json'));
  writeFileSync(
    join(valuesDir, '_category_.json'),
    `{
  "label": "Values",
  "position": 1,
  "link": {
    "type": "generated-index"
  }
}
`
  );

  values.forEach((desc) => {
    const { name, serialize, deserialize } = desc;
    const filePath = join(valuesDir, `${kebab(name)}.mdx`);
    const dirName = dirname(filePath);

    if (!existsSync(dirName)) {
      console.log('Creating directory', dirName);
      mkdirSync(dirName, { recursive: true });
    }

    console.log('Writing file', filePath);
    writeFileSync(
      filePath,
      `
# ${name}

## Serialize

\`\`\`ts
${serialize}
\`\`\`

## Deserialize

\`\`\`ts
${deserialize}
\`\`\`

`
    );
  });
};

const generateNodePages = (
  nodes: NodeDefinition[],
  baseDir: string,
  nodeSpecJson: NodeSpecJSON[],
  graph: IGraph
) => {
  const nodesDir = join(baseDir, 'Nodes');
  if (!existsSync(nodesDir)) {
    console.log('Creating directory', nodesDir);
    mkdirSync(nodesDir, { recursive: true });
  }

  console.log('Writing category file', join(nodesDir, '_category_.json'));
  writeFileSync(
    join(nodesDir, '_category_.json'),
    `{
  "label": "Nodes",
  "position": 2,
  "link": {
    "type": "generated-index"
  }
}
`
  );

  nodes.forEach((desc) => {
    const { typeName, nodeFactory } = desc;
    const kebabName = typeName.split('/').map(kebab).join('/');
    const specJSON = nodeSpecJson.find((n) => n.type === typeName);

    if (!specJSON) {
      throw new Error(`No spec found for node ${typeName}`);
    }

    const filePath = join(nodesDir, `${kebabName}.mdx`);
    const dirName = dirname(filePath);

    if (!nodeFactory) {
      console.warn('desc', desc);
      throw new Error('desc.factory is undefined');
    }

    if (!existsSync(dirName)) {
      console.log('Creating directory', dirName);
      mkdirSync(dirName, { recursive: true });
    }

    const folderName = dirName.split('/').pop();
    console.log('Writing category file', join(dirName, '_category_.json'));
    writeFileSync(
      join(dirName, '_category_.json'),
      `{
  "label": "${pascal(folderName || '')}",
  "link": {
    "type": "generated-index"
  }
}
`
    );

    console.log('Writing file', filePath);
    writeFileSync(
      filePath,
      nodeTemplate(
        nodeFactory(graph, {
          customEvents: {},
          variables: {}
        } as any),
        specJSON
      )
    );
  });
};

// First registry includes only the nodes for that specific profile, second registry includes all nodes required to run writeNodeSpecsToJSON
export default (
  registry: Registry,
  baseDir: string,
  functionalRegistry?: Registry
) => {
  const nodes = registry.nodes.getAllDescriptions();

  const values = registry.values.getAll();

  const nodeSpecJson = writeNodeSpecsToJSON(functionalRegistry || registry);

  const graphApi = new Graph(registry).makeApi();

  generateValuePages(values, baseDir);
  generateNodePages(nodes, baseDir, nodeSpecJson, graphApi);
};
