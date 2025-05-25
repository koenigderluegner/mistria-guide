import { EnvironmentConfig } from './environment-config.interface';
import path from 'path';

export const environment: EnvironmentConfig = {
  assetPath: path.join(__dirname, '..', 'assets'),
  frontendDbPath: path.join(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    '..',
    'apps',
    'frontend',
    'public',
    'database'
  ),
  generatedOutputPath: path.join(__dirname, '..', 'generated'),
  generatedDataTypesPath:path.join(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    '..',
    'libs',
    'data-types',
    'src',
    'generated'
  ),
};
