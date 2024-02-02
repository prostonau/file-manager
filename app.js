// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';
import Helper from './src/utils/helper.js';
import getUsername from './src/cli/getUsername.js';
import up from './src/nav/up.js';
import cd from './src/nav/cd.js';
import ls from './src/nav/ls.js';
import cat from './src/fs/cat.js';
import add from './src/fs/add.js';
import rn from './src/fs/rn.js';
import cp from './src/fs/cp.js';
import mv from './src/fs/mv.js';
import rm from './src/fs/rm.js';
import EOL from './src/os/eol.js';
import cpus from './src/os/cpus.js';
import homedir from './src/os/homedir.js';
import username from './src/os/username.js';
import architecture from './src/os/architecture.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);


const run = async () => {
    const user = getUsername();
    console.log(`Welcome to the File Manager, ${user}!`);
    // Display current working directory
    Helper.showCurrentDirInConsole();

    // Handle CLI input
    process.stdin.setEncoding('utf-8');
    process.stdin.on('data', (input) => {
    input = input.trim();

    // Implement the logic to handle different commands
    if (input.startsWith('up')) up();
    else if (input.startsWith('cd')) cd(input.substring(2).trim());
    else if (input.startsWith('ls')) ls(input.substring(2).trim());
    else if (input.startsWith('cat')) cat(process.cwd(), input.substring(3).trim());
    else if (input.startsWith('add')) add(process.cwd(), input.substring(3).trim());    
    else if (input.startsWith('rn')) rn(process.cwd(), Helper.getArgsArray(input)[0], Helper.getArgsArray(input)[1]);
    else if (input.startsWith('cp') && !input.startsWith('cpus')) cp(process.cwd(), Helper.getArgsArray(input)[0], Helper.getArgsArray(input)[1]);
    else if (input.startsWith('mv')) mv(process.cwd(), Helper.getArgsArray(input)[0], Helper.getArgsArray(input)[1]);
    else if (input.startsWith('rm')) rm(process.cwd(), input.substring(2).trim());
    else if (input.startsWith('EOL')) EOL();
    else if (input.startsWith('cpus')) cpus();
    else if (input.startsWith('homedir')) homedir();
    else if (input.startsWith('username')) username();
    else if (input.startsWith('architecture')) architecture();
    else if (input.startsWith('.exit')) {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        process.exit();
    }
      else {
        console.log('Invalid input');
    }

    Helper.showCurrentDirInConsole();

    });

    // Display goodbye message
    process.on('SIGINT', () => {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        process.exit();
    })
}

run()