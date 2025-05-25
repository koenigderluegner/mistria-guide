import { readAsset } from './util/read-asset';
import path from 'path';
import fs from 'fs';
import { environment } from './environments/environment';

const dbName = '__fiddle__.json';
const data = readAsset<Record<string, any>>(dbName);
const blacklistedKeys = ['sha', 'footsteps', 'birds', 'fonts'];

const ordered = Object.keys(data)
  .sort()
  .reduce((obj, key) => {
    if (key.startsWith('activities') || key.includes('/')) {
      return obj;
    }
    obj[key] = data[key];
    return obj;
  }, {});

function extractToDbFile(data: Record<string, any>, key: string): void {
  if (data[key]) {
    writeFile(key + '.json', data[key]);
    delete data[key];
  }
}

function createPathIfNotExists(path: string): void {
  if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
}

function writeFile(fileName: string, content: any): void {
  const targetPath = environment.generatedOutputPath;

  createPathIfNotExists(targetPath);

  const filePath = path.join(targetPath, fileName);

  fs.writeFileSync(
    filePath,
    JSON.stringify(content, null, 2).replace(/\n/g, '\r\n'),
    {
      encoding: 'utf8',
      flag: 'w+',
    }
  );
}

Object.keys(ordered).forEach((key) =>
  !blacklistedKeys.includes(key) ? extractToDbFile(ordered, key) : null
);
// blacklisted items
writeFile(dbName, ordered);
