import fs from 'fs/promises';
import Helper from '../utils/helper.js';

const rm = async (dirname, pathToFile) => {
  // console.log('dirname = ', dirname);
  // console.log('pathToFile = ', pathToFile);    
  const pathToDelFile = Helper.alignPath(dirname, pathToFile);
  // console.log('pathToDelFile = ', pathToDelFile);  
  
  try {
    await fs.access(pathToDelFile, fs.constants.F_OK);
    await fs.unlink(pathToDelFile);
    console.log('File deleted successfully');
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('File not found');
    } else {
      console.error(err);
    }
  }
};

export default rm;