import { Solver } from "../../utils/solver.ts";
import { Counter } from "../../utils/counter.ts";

export class SecondSolver implements Solver<string> {
  private counter: Counter;

  constructor(counter: Counter) {
    this.counter = counter;
  }

  exec(input: string[]): number {
    for (const line of input) {
      const parts = line.split("-");
      let candidate: string = parts[0];
      if (parts[0].length % 2 !== 0) {
        candidate = this.getNextNumberWithOneMoreDigit(Number(parts[0]))
          .toString();
      }
      while (Number(candidate) <= Number(parts[1])) {
        if (this.isHit(candidate)) {
          this.counter.addToCounter(Number(candidate));
        }
        candidate = (Number(candidate) + 1).toString();
      }
    }
    return this.counter.count;
  }

  private isHit(number: string): boolean {
    const firstHalf = number.slice(0, number.length / 2);
    const secondHalf = number.slice(number.length / 2);
    return firstHalf === secondHalf;
  }

  private getNextNumberWithOneMoreDigit(num: number): number {
    return Math.pow(10, Math.floor(Math.log10(num)) + 1);
  }
}
