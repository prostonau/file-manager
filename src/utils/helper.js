import process from 'node:process';
import path from 'path';
import { join } from 'path';

class Helper {
     static showCurrentDirInConsole  () {
        console.log(`You are currently in ${process.cwd()}`);
      }   

      static getArgsArray(args) {
        let wordsArray = args.split(" ").filter(word => word.length > 0); // разделяем строку по пробелу и удаляем пустые элементы
        wordsArray.shift();
        //console.log('getArgsArray =', wordsArray);        
        return  wordsArray;
      }
      
      static alignPath(dirname, filePath) {
        // console.log('Helper | dirname = ', dirname)
        // console.log('Helper | filePath = ', filePath)

        if (path.isAbsolute(filePath)) {
            // console.log(`The path to the file is absolute: ${filePath}`);
            return filePath
          } else {
            // console.log(`The file path is relative: ${join(dirname, filePath)}`);
            return join(dirname, filePath);
          }   
      }

      static getFirstPartOfPath(filePath) {
        let match = filePath.match(/.*[\\\/]/);
        const firstPart = match ? match[0] : "";
        return firstPart;
      } 
      
      static getFilenameFromPath(filePath) {
        filePath = filePath.trim();
        if (filePath === "\\" || filePath === "/" || filePath === ".") return '';        
        if (!filePath.match(/[^\/\\]+$/)) return '';
        return filePath.match(/[^\/\\]+$/)[0];
      } 
}

export default Helper