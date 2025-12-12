import { Puzzle } from "../../utils/puzzle.ts";
import { AocFileReader } from "../../utils/file/file-reader.ts";
import { SecondSolver } from "./solver.ts";
import { Counter } from "../../utils/counter.ts";
import { Parser } from "../../utils/parser/parser.ts";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const puzzle = new Puzzle(
    new AocFileReader(),
    {} as Parser<void>,
    new SecondSolver(
      new Counter(),
    ),
  );
  const splits = await puzzle.read("input.txt", ",");
  const res = puzzle.run(splits);
  console.log(res);
}
