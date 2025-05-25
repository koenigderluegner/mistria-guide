import { readAsset } from './util/read-asset';
import { writeFile } from './util/write-file';
import { extractToDbFile } from './util/extract-to-db-file';

const dbName = '__fiddle__.json';
const data = readAsset<Record<string, any>>(dbName);
const blacklistedKeys = ['sha', 'footsteps', 'birds', 'fonts'];

const ordered: Record<string, any> = Object.keys(data)
  .sort()
  .reduce((obj, key) => {
    if (key.startsWith('activities') || key.includes('/')) {
      return obj;
    }
    obj[key] = data[key];
    return obj;
  }, {});

Object.keys(ordered).forEach((key) =>
  !blacklistedKeys.includes(key) ? extractToDbFile(ordered, key) : null
);
// blacklisted items
writeFile(dbName, ordered);
