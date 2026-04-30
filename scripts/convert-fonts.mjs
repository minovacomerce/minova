import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import wawoff from 'wawoff2';

const dir = 'public/fonts/codec-pro';
const files = ['CodecPro-Regular.ttf', 'CodecPro-Italic.ttf'];

for (const f of files) {
  const ttf = readFileSync(join(dir, f));
  const woff2 = await wawoff.compress(ttf);
  const out = join(dir, f.replace(/\.ttf$/, '.woff2'));
  writeFileSync(out, Buffer.from(woff2));
  console.log('wrote', out, woff2.length, 'bytes');
}
