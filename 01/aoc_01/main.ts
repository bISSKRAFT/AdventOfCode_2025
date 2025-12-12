// for neovim: :lua for _,c in pairs(vim.lsp.get_clients()) do if c.name=="ts_ls" then c.stop() end end

import { AocFileReader } from "../../utils/file/file-reader.ts";
import { FirstPuzzleParser } from "../../utils/parser/parser.ts";
import { Puzzle } from "../../utils/puzzle.ts";
import { FirstSolver } from "./first-solver.ts";
import { Counter } from "../../utils/counter.ts";

if (import.meta.main) {
  const input = Number(prompt("Please enter value to start: ", "50"));

  const counter = new Counter();
  const puzzle = new Puzzle(
    new AocFileReader(),
    new FirstPuzzleParser(),
    new FirstSolver(counter, input),
  );
  const parsed = puzzle.parse(await puzzle.read("../input.txt"));
  const res = puzzle.run(parsed);

  console.log("The password is: ", res);
}
