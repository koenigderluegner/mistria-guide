import { readAsset } from './util/read-asset';
import path from 'path';
import fs from 'fs';
import { environment } from './environments/environment';

const dbName = '__fiddle__.json';
const data = readAsset(dbName);

const ordered = Object.keys(data).sort().reduce(
  (obj, key) => {
    obj[key] = data[key];
    return obj;
  },
  {}
);

function createPathIfNotExists(path: string): void {
  if (!fs.existsSync(path))
    fs.mkdirSync(path, {recursive: true});
}

 const targetPath = environment.generatedOutputPath;

createPathIfNotExists(targetPath);

  const filePath = path.join(targetPath, dbName);


  fs.writeFileSync(
    filePath,
    JSON.stringify(ordered, null, 2 ).replace(/\n/g, "\r\n"),
    {
      encoding: 'utf8',
      flag: 'w+',
    }
  );
