import os from 'os';

const username = async () => {
  const username = os.userInfo().username;
  console.log('Current system user name:', username);
}

export default username;