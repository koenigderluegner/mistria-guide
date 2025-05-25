import fs from 'fs';
import path from 'path';
import { environment } from '../environments/environment';

export function readAsset<T = unknown>(fileName: string): T {
  return JSON.parse(
    fs.readFileSync(path.join(environment.assetPath, fileName), {
      encoding: 'utf8',
      flag: 'r',
    })
  );
}
