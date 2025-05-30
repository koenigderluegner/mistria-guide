import { readAsset } from './util/read-asset';
import { extractToDbFile } from './util/extract-to-db-file';
import { writeFileToFrontendDatabase } from './util/write-file-to-frontend-database';
import { itemParser } from './parsers/item-parser';
import { TypesGenerator } from './types-generator/types-generator';
import { bugParser } from './parsers/bug-parser';
import { fishParser } from './parsers/fish-parser';
import { dbItemParser } from './parsers/db-item-parser';

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

const bugs = bugParser(data.bugs);
writeFileToFrontendDatabase('bugs.json', bugs);

const fish = fishParser(data.fish);
writeFileToFrontendDatabase('fish.json', fish);

const dbItems = dbItemParser(items, bugs, fish);
dbItems.forEach((item) => {
  writeFileToFrontendDatabase(`/item/${item.id}.json`, item);
});


createReadableFiles(data, blacklistedKeys);
TypesGenerator.generate();
