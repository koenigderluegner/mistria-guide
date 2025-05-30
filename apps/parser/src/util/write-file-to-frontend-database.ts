import { environment } from '../environments/environment';
import path from 'path';
import fs from 'fs';
import { createPathIfNotExists } from './create-path-if-not-exists';

export function writeFileToFrontendDatabase(
  fileName: string,
  content: any,
  prettyPrint = true
): void {
  const targetPath = environment.frontendDbPath;

  const filePath = path.join(targetPath, fileName);

  const path1 = path.basename(filePath);
  createPathIfNotExists(filePath.replace(path1, ''));

  fs.writeFileSync(
    filePath,
    JSON.stringify(content, null, prettyPrint ? 2 : null).replace(
      /\n/g,
      '\r\n'
    ),
    {
      encoding: 'utf8',
      flag: 'w+',
    }
  );
}
