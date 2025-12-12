import { AocFileReader } from "../utils/file/file-reader.ts";
import { Parser } from "../utils/parser/parser.ts";
import { Solver } from "./solver.ts";

export class Puzzle<T, S> {
  fileReader: AocFileReader;
  parser: Parser<T>;
  solver: Solver<S>;

  constructor(fileReader: AocFileReader, parser: Parser<T>, solver: Solver<S>) {
    this.fileReader = fileReader;
    this.parser = parser;
    this.solver = solver;
  }

  public async read(path: string, split?: string): Promise<string[]> {
    return await this.fileReader.read(path, split);
  }

  public parse(data: string[]): T {
    return this.parser.parse(data);
  }

  run(input: S[]): string | number {
    return this.solver.exec(input);
  }
}
