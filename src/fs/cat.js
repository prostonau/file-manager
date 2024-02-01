import { createReadStream } from 'fs';
import { join } from 'path';

const cat = (dirname, filename) => {
  const pathToFile = join(dirname, filename);
  console.log('pathToFile = ', pathToFile);
  const readStream = createReadStream(pathToFile, { encoding: 'utf-8' });

  readStream.on('data', (chunk) => {
    console.log(chunk);
  });

  readStream.on('error', (err) => {
    console.error(`${filename} does not exist in the current directory`);
  });
};

export default cat;