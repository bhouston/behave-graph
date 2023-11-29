import fsPromises from 'fs/promises';
import path from 'path';
import process from 'process';
import fs from 'fs';

const rootPath = path.join(
  path.dirname(import.meta.url.replace('file:/', '')),
  '..'
);

const directoryNamesToClean = ['node_modules', 'dist'].filter((directoryName) =>
  process.argv.includes(`--${directoryName}`)
);
// remove subdirectories that don't exist.
const projectPathsToClean = ['apps', 'examples', 'packages'].filter(
  (projectPath) => {
    return fs.existsSync(path.join(rootPath, projectPath));
  }
);

const getSubDirectories = async (directory) => {
  // get the subdirectories of the packages directory
  const subDirectoryPath = path.join(rootPath, directory);
  const dirNames = await fsPromises.readdir(subDirectoryPath);
  return dirNames.map((dirName) => path.join(directory, dirName));
};

// Function to asynchronously delete a directory
async function deleteDirectory(directory) {
  try {
    await fsPromises.rm(directory, { recursive: true });
  } catch (error) {
    console.error(`Error deleting ${directory}: ${error.message}`);
  }
}

const main = async () => {
  const projectDirectories = ['.'];
  for (const projectPath of projectPathsToClean) {
    projectDirectories.push(...(await getSubDirectories(projectPath)));
  }

  const directoriesToDelete = [];
  projectDirectories.forEach((directory) => {
    directoryNamesToClean.forEach((directoryName) => {
      directoriesToDelete.push(path.join(directory, directoryName));
    });
  });

  // Run deletion operations in parallel
  await Promise.all(
    directoriesToDelete
      .filter((directory) => fs.existsSync(directory))
      .map(deleteDirectory)
  );
};

main();
