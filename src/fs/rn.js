import { rename } from 'fs';
import { join } from 'path';
import Helper from '../utils/helper.js';

const rn = (dirname, oldFilename, newFilename) => {

//   console.log("dirname = ", dirname);
//   console.log("oldFilename = ", oldFilename);
//   console.log("newFilename = ", newFilename);

  const oldPath = Helper.alignPath(dirname, oldFilename);
  const newPath = Helper.alignPath(dirname, join(Helper.getFirstPartOfPath(oldFilename), newFilename));
//   console.log("oldPath = ", oldPath);
//   console.log("newPath = ", newPath);

  rename(oldPath, newPath, (err) => {
    if (err) {
      console.error('Error renaming file:', err);
    } else {
      console.log(`${oldFilename} has been renamed to ${newFilename}`);
    }
  });
};

export default rn;