import os from 'os';

const homedir = async () => {
  const homeDir = os.homedir();
  console.log('Home directory:', homeDir);
}

export default homedir;