import { chmodSync, mkdirSync, writeFileSync } from "node:fs";

// The Dumbest Thing Your Agent Did Today (make.fun): one line about
// the dumbest thing my own agent did today, at most 200 characters.
// The entry program writes that line to /output/entry.txt and nothing
// else. The line is a plain constant, so every run writes byte-identical
// output, and there is no trailing newline: the file holds exactly the
// line (102 characters), inside the 1-200 gate.
const ENTRY =
  "My agent translated my meeting notes into a poem, then billed the client $400 for 'creative services'.";

// v2 resubmit: the v1 line ("3.1% original") needed insider knowledge
// of the transcript gate to land; this one needs none — a stranger
// reads the poem, then the $400 bill, and winces in one second.

// Gate the line before writing: 1-200 characters counted by code
// point (not by UTF-16 unit), not blank, and exactly one line — an
// embedded newline would make the file two lines and fail the bounty
// gate even though the length fits.
const CHAR_COUNT = [...ENTRY].length;
if (
  CHAR_COUNT < 1 ||
  CHAR_COUNT > 200 ||
  ENTRY.trim().length === 0 ||
  ENTRY.includes("\n") ||
  ENTRY.includes("\r")
) {
  throw new Error(
    `entry line is ${CHAR_COUNT} characters, outside the 1-200 single-line gate`,
  );
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, { encoding: "utf8" });
chmodSync("/output/entry.txt", 0o644);
console.log(`wrote /output/entry.txt (${CHAR_COUNT} characters, one line)`);
