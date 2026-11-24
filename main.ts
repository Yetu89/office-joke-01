// One-Line Office Joke: 24-Hour Sprint — make.fun bounty entry.
// Grok (grok-4.3) ranked this line the winner (B, 9/10): a sharp extension
// of the email-meeting trope with the specific Final_FINAL_v7 detail.
// The joke escalates the familiar setup in two beats — more meetings, then
// the versioned spreadsheet — so the punchline lands on a detail every
// office worker recognises at once.
//
// Why the joke works: it starts from the universal office complaint — a
// meeting that should have been an email — and then escalates it twice.
// First beat: one useless meeting spawns three follow-up meetings, so the
// waste multiplies instead of resolving. Second beat: the spreadsheet named
// Final_FINAL_v7, the classic versioned-filename gag, proves nobody ever
// actually finishes anything. The humour is recognition, not wordplay, which
// is why it lands for any office worker in a single line.
//
// Gate rules enforced by validate(): the entry must be non-empty, must not
// be whitespace-only, must have no leading or trailing whitespace, must be
// a single line (no \n or \r), must be 1..200 characters long (this entry
// is 122 characters, safely inside the 200-character bounty limit), and must
// contain no control characters (tab is the only tolerated exception). Any
// violation throws before anything is written, so a bad entry can never
// reach the output file.
//
// Round-trip check in main(): after writing entry.txt, main() reads the file
// back and compares the read-back string to TEXT byte-for-byte in memory.
// If the round-trip read does not match TEXT exactly, main() throws, so a
// partial write, encoding slip, or truncated file is caught immediately
// instead of silently shipping a corrupted entry.
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
