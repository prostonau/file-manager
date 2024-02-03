import { createReadStream, createWriteStream } from 'fs';
import fs from 'fs';
import { join } from 'path';
import zlib from 'zlib';
import Helper from '../utils/helper.js';

const decompress = async (dirname, pathToFile, pathToNewDir) => {
  if (!pathToFile || !pathToNewDir) {
    console.log('We need to check pathToZipFile and pathToNewDir');
    return;
  }

  if (!pathToFile.trim().endsWith(".gz")) {
    console.log(`We need to add path to gz file: ${pathToFile}`);
    return;
  }

  let unArchiveFilename = '';
  if (Helper.getFilenameFromPath(pathToNewDir).length > 0) unArchiveFilename = Helper.getFilenameFromPath(pathToNewDir);
  else unArchiveFilename = Helper.getFilenameFromPath(pathToFile).replace(".gz", "");

  const pathToFileFinal = join(dirname, pathToFile);
  const outputPathFinal = join(dirname, Helper.getFirstPartOfPath(pathToNewDir), unArchiveFilename);

  // console.log('pathToFileFinal =', pathToFileFinal);
  // console.log('outputPathFinal =', outputPathFinal);

  try {
    await fs.promises.access(pathToFileFinal, fs.constants.F_OK);
    //console.log(`We can not find file by path: ${pathToFileFinal}`);
    // return;
  } catch (err) {
    if (err.code === 'ENOENT') {
        console.error('Error while accessing the destination path:', err);
    }
  }


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

  const readStream = createReadStream(pathToFileFinal);
  const unzip = zlib.createGunzip();
  const writeStream = createWriteStream(outputPathFinal);

  readStream.pipe(unzip).pipe(writeStream);

  return new Promise((resolve, reject) => {
    writeStream.on('finish', () => {
      console.log('File decompressed successfully');
      resolve();
    });
    writeStream.on('error', (error) => {
      console.log('Some error with gunzip');
      reject(error);
    });
  });
};

export default decompress;