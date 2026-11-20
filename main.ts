// Entry for the gta6-meme-x-01 bounty (Node 22, standard library only).
// The judged artifact is the X post itself, not this program. All this
// program does is copy POST.json from the repository root into the output
// directory, where the gate reads the post address from it.
//
// POST.json must name the public X post carrying the meme picture (first
// picture) and the make.fun mention plus the play code in its text.
//
// Local run:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'POST.json'), join(OUTPUT_DIR, 'POST.json'));
} catch (err) {
  console.error(`Could not copy POST.json from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
