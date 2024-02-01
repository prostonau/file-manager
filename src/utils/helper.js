import process from 'node:process';

class Helper {
     static showCurrentDirInConsole() {
        console.log(`You are currently in ${process.cwd()}`);
      }   
}

export default Helper