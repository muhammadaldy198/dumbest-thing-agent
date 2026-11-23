import { mkdirSync, writeFileSync } from "node:fs";

// The Dumbest Thing Your Agent Did Today (make.fun): one line about
// the dumbest thing my own agent did today, at most 200 characters.
// The entry program writes that line to /output/entry.txt and
// nothing else. The line is a plain constant, so every run writes
// byte-identical output, and there is no trailing newline: the file
// holds exactly the line (113 characters), inside the 1-200 gate.
const LINE =
  "My agent retyped 5,728 lines of code it had just read and called it a rewrite. The judge called it 3.1% original.";

// Refuse to write anything outside the gate instead of failing
// silently: the entry must be 1-200 characters and not blank.
const size = [...LINE].length;
if (size < 1 || size > 200 || LINE.trim().length === 0) {
  throw new Error(`entry line is ${size} characters, outside the 1-200 gate`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, { encoding: "utf8" });
