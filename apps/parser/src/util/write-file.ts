import { environment } from '../environments/environment';
import path from 'path';
import fs from 'fs';
import { createPathIfNotExists } from './create-path-if-not-exists';

export function writeFile(fileName: string, content: any): void {
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
