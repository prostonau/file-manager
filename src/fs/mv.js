import fs from 'fs';
import { join } from 'path';
import Helper from '../utils/helper.js';

const mv = async (dirname, pathToFile, pathToNewDir) => {
  if (pathToNewDir === '/' || pathToNewDir === '') {
    console.log('we cannot copy to the same dir');
    return;
  }

  const oldPath = join(dirname, pathToFile);
  const newPath = join(dirname, pathToNewDir, Helper.getFilenameFromPath(pathToFile));

  console.log ('oldPath = ', oldPath);
  console.log ('newPath = ', newPath);
  
    try {
      await fs.promises.access(newPath, fs.constants.F_OK);
      console.log('File already exists at the destination path. Copy operation aborted.');
      return;
    } catch (err) {
      if (err.code === 'ENOENT') {
        // File does not exist at the destination path
        await fs.promises.writeFile(newPath, '');
      } else {
        // Handle other errors
        console.error('Error while accessing the destination path:', err);
      }
    }

    try {
      await fs.promises.writeFile(newPath, '');

      const readStream = fs.createReadStream(oldPath);
      const writeStream = fs.createWriteStream(newPath);

      readStream.on('error', (err) => {
        console.error('Error reading file:', err);
      });

      writeStream.on('error', (err) => {
        console.error('Error writing file:', err);
      });

      readStream.pipe(writeStream);

      await new Promise((resolve, reject) => {
        readStream.on('close', () => {
          // Delete the initial file after copying it
          fs.promises.unlink(oldPath)
            .then(() => {
              console.log(`${pathToFile} has been renamed to ${pathToNewDir} and the initial file has been deleted`);
              resolve();
            })
            .catch((err) => {
              console.error('Error deleting the initial file:', err);
              reject(err);
            });
        });
      });

    } catch (err) {
      console.error('Error while copying file:', err);
    } 
    


};

export default mv;