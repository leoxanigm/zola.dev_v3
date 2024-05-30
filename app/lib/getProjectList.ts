import fs from 'fs';
import path from 'path';

// const PROJECTS_DIR = path.join(__dirname);
const PROJECTS_DIR = path.resolve(process.cwd(), 'app/projects');

export async function getProjectList() {
  const dirents = await fs.promises.readdir(PROJECTS_DIR, {
    withFileTypes: true
  });

  return dirents
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}
