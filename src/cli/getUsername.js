import process from 'node:process';

const getUsername = () => {
    // console.log('process.argv = ', process.argv);
    const args = process.argv.slice(2);
    const usernameArg = args.find(arg => arg.startsWith('--username='));
    const username = usernameArg ? usernameArg.split('=')[1] : null;  
    // console.log(username.trim());
    return username.trim();
};

// parseArgs();
export default getUsername;