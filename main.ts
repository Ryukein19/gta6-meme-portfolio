// Entry for the gta6-meme-x-01 bounty (Node 22, standard library only).
// The judged artifact is the X post itself, not this program. All this
// program does is copy POST.json from the repository root into the output
// directory, where the gate reads the post address from it. POST.json must
// name the public X post carrying the meme picture (first picture) and the
// make.fun mention plus the play code in its text. The copy is made robust
// by creating the output directory first and logging the copied post URL,
// so a failed or misaddressed copy is visible immediately instead of
// surfacing later as a missing-post error in the gate.
//
// Local run:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Create the output directory if it does not exist yet, so the copy
// below never fails just because /output is missing.
mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'POST.json'), join(OUTPUT_DIR, 'POST.json'));
} catch (err) {
  console.error(`Could not copy POST.json from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

// Confirm the copy landed and log the post URL it points at, so the
// submission visibly names the entry being judged.
const copied = JSON.parse(readFileSync(join(OUTPUT_DIR, 'POST.json'), 'utf8')) as { post?: string };
console.log(`Copied POST.json to ${OUTPUT_DIR}; post: ${copied.post ?? '(no post field)'}`);
