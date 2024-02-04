import { createReadStream, createWriteStream } from 'fs';
import fs from 'fs';
import { join } from 'path';
import zlib from 'zlib';
import Helper from '../utils/helper.js';

function changeFileExtension(filename, newExtension) {
  return filename.replace(/\..+$/, `.${newExtension}`);
}


const compress = async (dirname, pathToFile, pathToNewDir) => {  

  if (!pathToFile || !pathToNewDir) {
    console.log("We need to check pathToFile and pathToNewDir");
    return;
  }

  let archiveFilename = '';
  if (Helper.getFilenameFromPath(pathToNewDir).length > 0) archiveFilename = Helper.getFilenameFromPath(pathToNewDir);
  else archiveFilename = Helper.getFilenameFromPath(pathToFile) + '.gz'

  const pathToFileFinal = join(dirname, pathToFile);
  const outputPathFinal = join(dirname, Helper.getFirstPartOfPath(pathToNewDir), archiveFilename);

  try {
    await fs.promises.access(outputPathFinal, fs.constants.F_OK);
    console.log(`File already exists at the destination path ${outputPathFinal}`);
    return;
  } catch (err) {
    if (err.code === 'ENOENT') {
      // File does not exist at the destination path
      await fs.promises.writeFile(outputPathFinal, '');
    } else {
      // Handle other errors
      console.error('Error while accessing the destination path:', err);
    }
  }
  // console.log('pathToFileFinal =', pathToFileFinal);
  // console.log('outputPathFinal =', outputPathFinal);  

  const readStream = createReadStream(pathToFileFinal);
  const writeStream = createWriteStream(outputPathFinal);
  const gzip = zlib.createGzip();

  readStream.pipe(gzip).pipe(writeStream);

  return new Promise((resolve, reject) => {
    writeStream.on('finish', () => {
      console.log('File compressed successfully');
      resolve();
    });
    writeStream.on('error', (error) => {
      console.log('Some error with gzip');
      reject(error);
    });
  });
};

export default compress;