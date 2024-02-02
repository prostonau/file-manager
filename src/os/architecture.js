import process from 'process';

const architecture = async () => {
    console.log(`Node.js binary compiled for CPU architecture: ${process.arch}`);
  }
  
export default architecture;