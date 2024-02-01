import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Helper from './src/utils/helper.js';
import getUsername from './src/cli/getUsername.js';
import up from './src/nav/up.js';
import cd from './src/nav/cd.js';
import ls from './src/nav/ls.js';
import cat from './src/fs/cat.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const run = async () => {
    const username = getUsername();
    console.log(`Welcome to the File Manager, ${username}!`);
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
    else if (input.startsWith('cat')) cat(__dirname, input.substring(3).trim());
    else if (input.startsWith('add')) {
        console.log('add;')
    } else if (input.startsWith('.exit')) {
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