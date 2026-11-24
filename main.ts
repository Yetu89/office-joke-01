// One-Line Office Joke: 24-Hour Sprint — make.fun bounty entry.
// Grok (grok-4.3) ranked this line the winner (B, 9/10): a sharp extension
// of the email-meeting trope with the specific Final_FINAL_v7 detail.
//
// Writes the single-line joke to /output/entry.txt (or $OUTPUT_DIR).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const TEXT =
  "The meeting that could have been an email has now spawned three follow-up meetings and a spreadsheet named Final_FINAL_v7.";

function validate(text: string): void {
  if (text.length === 0) throw new Error("entry must not be empty");
  if (text.trim().length === 0) throw new Error("entry must not be whitespace-only");
  if (text !== text.trim()) throw new Error("entry must not have leading/trailing whitespace");
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const count = [...text].length;
  if (count < 1 || count > 200) {
    throw new Error(`entry must be 1..200 characters, got ${count}`);
  }
  for (const ch of text) {
    if (ch.charCodeAt(0) < 0x20 && ch !== "\t") {
      throw new Error("entry must not contain control characters");
    }
  }
}

function main(): void {
  validate(TEXT);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = `${outDir}/entry.txt`;
  writeFileSync(outPath, TEXT, "utf8");
  const roundTrip = readFileSync(outPath, "utf8");
  if (roundTrip !== TEXT) throw new Error("round-trip read did not match TEXT");
  console.log(`wrote ${[...TEXT].length} chars to ${outPath}`);
}

main();
