import { Solver } from "../../utils/solver.ts";
import { Counter } from "./counter.ts";
import { PasswordDial } from "./password-dial.ts";

export class FirstSolver implements Solver<[string, number]> {
  counter: Counter;
  start?: number;

  constructor(counter: Counter, start?: number) {
    this.counter = counter;
    this.start = start;
  }

  exec(input: [string, number][]): string | number {
    const dial = new PasswordDial(this.start ? this.start : 50, this.counter);
    for (const rotation of input) {
      dial.computeStep(rotation[0], rotation[1]);
    }
    return this.counter.count;
  }
}
