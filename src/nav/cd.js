import fs from 'fs/promises';
import path from 'path';

async function cd(path_to_directory) {
  if (path_to_directory.endsWith(':')) {
    path_to_directory += '/';
  } 
    
  const currentPath = path.isAbsolute(path_to_directory) ?
    path_to_directory :
    path.resolve(path_to_directory);

  try {
    await fs.access(currentPath);
    process.chdir(currentPath);
    console.log('Current directory:', process.cwd());
  } catch (error) {
    console.error('Error accessing the directory:', error.message);
  }
}

export default cd;