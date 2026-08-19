import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const assets = [
  'ui-theme/Aiguillon_design/assets/backgrounds/bandeau-gauche-bleu.png',
];

for (const relativePath of assets) {
  const outputPath = resolve(relativePath);
  const encodedPath = `${outputPath}.base64`;
  const encoded = await readFile(encodedPath, 'utf8');
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, Buffer.from(encoded.replace(/\s/g, ''), 'base64'));
}
