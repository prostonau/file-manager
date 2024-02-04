import os from 'os';

const EOL = async () => {
  const eol = os.EOL;
  console.log(`The default end-of-line character(s) is/are: ${JSON.stringify(eol)}`);
}

export default EOL;