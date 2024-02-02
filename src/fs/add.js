import { promises as fs } from 'fs';
// import { join } from 'path';
import Helper from '../utils/helper.js';

const add = async (dirname, filename) => {
  const pathToFile = Helper.alignPath(dirname, filename);

  try {
    await fs.access(pathToFile);
    console.error('File already exists');
  } catch (error) {
    if (error.code === 'ENOENT') { 
      await fs.writeFile(pathToFile, '');
      console.log(`File ${filename} was created in dir: ${dirname}`)
    } else {
      console.error('FS operation failed');
      //throw new Error('FS operation failed');
    }
  }
};

export default add;