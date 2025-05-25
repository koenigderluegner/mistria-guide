import { readAsset } from './util/read-asset';
import { extractToDbFile } from './util/extract-to-db-file';
import { writeFileToFrontendDatabase } from './util/write-file-to-frontend-database';
import { itemParser } from './parsers/item-parser';

const dbName = '__fiddle__.json';
const data = readAsset<Record<string, any>>(dbName);
const blacklistedKeys = ['sha', 'footsteps', 'birds', 'fonts'];

// this is just for easier work with the database
function createReadableFiles(
  data: Record<string, any>,
  blacklistedKeys: string[] = []
) {
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
}

const items = itemParser(data.items);
writeFileToFrontendDatabase('items.json', items);

createReadableFiles(data, blacklistedKeys);
