import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import Helper from '../utils/helper.js';

const hash = async (dirname, pathToFile) => {
  if (!dirname || !pathToFile) {
    console.log("We need to check pathToFile");
    return;
  }

  const finalPathToFile = Helper.alignPath(dirname, pathToFile);
  const hash = createHash('sha256');
  const readStream = createReadStream(finalPathToFile);

  await new Promise((resolve, reject) => {
    readStream.on('data', (chunk) => {
      hash.update(chunk);
    });

    readStream.on('end', () => {
      resolve();
    });

    readStream.on('error', (err) => {
      reject(err);
    });
  });

  const hexHash = hash.digest('hex');
  console.log('SHA256 Hash:', hexHash);
};

export default hash;