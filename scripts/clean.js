import fs from 'fs/promises';
import path from 'path';
import process from 'process';

const getSubDirectories = async (directory) => {
  try {
    const stats = await fs.stat(directory);

    if (stats.isDirectory()) {
      // get the subdirectories of the packages directory
      const subDirectoryPath = path.join(process.cwd(), directory);
      const dirNames = await fs.readdir(subDirectoryPath);
      return dirNames.map((dirName) => path.join(directory, dirName));
    }
  } catch (error) {
    return [];
  }
};

// Function to asynchronously delete a directory
async function deleteDirectory(directory) {
  try {
    const stats = await fs.stat(directory);

    if (stats.isDirectory()) {
      try {
        await fs.rm(directory, { recursive: true });
      } catch (error) {
        console.error(`Error deleting ${directory}: ${error.message}`);
      }
    }
  } catch (error) {
    //console.error(`Error deleting ${directory}: ${error.message}`);
  }
}
const isNodeModulesFlagSet = process.argv.includes('--node_modules');
const isDistFlagSet = process.argv.includes('--dist');

const main = async () => {
  const projectDirectories = [
    '.',
    ...(await getSubDirectories('packages')),
    ...(await getSubDirectories('apps')),
    ...(await getSubDirectories('examples'))
  ];

  const directoriesToDelete = [];
  projectDirectories.forEach((directory) => {
    if (isNodeModulesFlagSet)
      directoriesToDelete.push(path.join(directory, 'node_modules'));
    if (isDistFlagSet) directoriesToDelete.push(path.join(directory, 'dist'));
  });

  // Run deletion operations in parallel
  await Promise.all(directoriesToDelete.map(deleteDirectory));
};

main();
