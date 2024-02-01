import process from 'node:process';

const up = async () => {
    try {
        process.chdir('../');
        } 
    catch (error) {
        throw new Error('Operation failed'); 
        }
};

export default up;