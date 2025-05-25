import fs from 'fs';

export function createPathIfNotExists(path: string): void {
  if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
}
