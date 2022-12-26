import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync
} from 'node:fs';
import { dirname, join } from 'node:path';

import { title } from 'case';

const exampleTemplate = (name: string, graph: string) => `
# ${title(name)}

\`\`\`json
${graph}
\`\`\`
`;

const getExamplesRecursive = (dir: string): string[] => {
  const files = readdirSync(dir);
  const examples = files
    .filter((file) => file.endsWith('.json'))
    .map((file) => join(dir, file));

  const dirs = files.filter((file) => !file.endsWith('.json'));

  dirs.forEach((sub) => {
    examples.push(...getExamplesRecursive(join(dir, sub)));
  });

  return examples;
};

export default (examplesDir: string, outDir: string) => {
  if (!existsSync(outDir)) {
    console.log('Creating directory', outDir);
    mkdirSync(outDir, { recursive: true });
  }

  console.log('Writing category file', join(outDir, '_category_.json'));
  writeFileSync(
    join(outDir, '_category_.json'),
    `{
  "label": "Examples",
  "position": 6,
  "link": {
    "type": "generated-index"
  }
}
`
  );
  const examples = getExamplesRecursive(examplesDir);

  examples.forEach((example) => {
    const fileContent = readFileSync(example, 'utf-8');
    const filePath = join(
      outDir,
      example.replace(examplesDir, '').replace('.json', '.mdx')
    );
    const dirName = dirname(filePath);

    if (!existsSync(dirName)) {
      console.log('Creating directory', dirName);
      mkdirSync(dirName, { recursive: true });
    }

    console.log('Writing file', filePath);
    writeFileSync(
      filePath,
      exampleTemplate(
        filePath.split('/').pop()!.replace('.mdx', ''),
        fileContent
      )
    );
  });
};
