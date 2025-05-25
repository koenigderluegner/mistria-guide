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

  createPathIfNotExists(targetPath);

  const filePath = path.join(targetPath, fileName);

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
