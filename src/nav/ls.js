import fs from 'fs/promises';

const listFilesAndFolders = async () => {
  try {
    const filesAndFolders = await fs.readdir('.');
    const statsArray = await Promise.all(
      filesAndFolders.map(async (name) => {
        const stats = await fs.stat(name);
        return { name, isDirectory: stats.isDirectory() };
      })
    );

    const sortedArray = statsArray.sort((a, b) => {
      if (a.isDirectory === b.isDirectory) {
        return a.name.localeCompare(b.name);
      }
      return a.isDirectory ? -1 : 1;
    });

    let output = []
    let obj = {}

    for (const entry of sortedArray) {    
      obj.Name = entry.name;
      obj.Type = entry.isDirectory ? 'Folder' : 'File';
      output.push(obj);
      obj = {};
    }
    console.table(output);
  } catch (error) {
    console.error('Error:', error);
  }
};

export default listFilesAndFolders;