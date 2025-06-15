import { EnvironmentConfig } from './environment-config.interface';
import path from 'path';
import { workspaceRoot } from 'nx/src/utils/workspace-root';

export const environment: EnvironmentConfig = {
  assetPath: path.join(__dirname, '..', 'assets'),
  frontendDbPath: path.join(
    workspaceRoot,
    'apps',
    'frontend',
    'public',
    'database'
  ),
  generatedOutputPath: path.join(__dirname, '..', 'generated'),
  generatedDataTypesPath: path.join(
    workspaceRoot,
    'libs',
    'data-types',
    'src',
    'generated'
  ),
};
