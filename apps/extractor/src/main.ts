import { IconSprites } from '@mistria-guide/data-types';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { workspaceRoot } from 'nx/src/utils/workspace-root';

const frontendTargetPath = path.resolve(
  workspaceRoot,
  'apps/frontend/public/assets/sprites'
);
const assetPath = path.resolve(
  workspaceRoot,
  'apps/extractor/src/assets/Export_Textures/Sprites'
);

IconSprites.forEach((sprite) => {
  copyImage(
    path.join(assetPath, `${sprite}_0.png`),
    path.resolve(frontendTargetPath, `./${sprite}.png`)
  );
});

function copyImage(sourcePath: string, destinationPath: string) {
  try {
    const destDir = path.dirname(destinationPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    fs.copyFileSync(sourcePath, destinationPath);
  } catch (error) {
    console.error('Error copying image:', error);
  }
}
