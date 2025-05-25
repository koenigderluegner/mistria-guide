import { writeFile } from './write-file';

export function extractToDbFile(data: Record<string, any>, key: string): void {
  if (data[key]) {
    writeFile(key + '.json', data[key]);
    delete data[key];
  }
}
