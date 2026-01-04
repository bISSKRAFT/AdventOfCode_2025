import { Solver } from "../../utils/solver.ts";
import { Counter } from "../../utils/counter.ts";

export class SecondSolver implements Solver<string> {
  private counter: Counter;

  constructor(counter: Counter) {
    this.counter = counter;
  }

  exec(input: string[]): number {
    for (const line of input) {
      const [start, end] = line.split("-").map(Number);
      for (let candidate = start; candidate <= end; candidate++) {
        const candidateStr = candidate.toString();
        if (
          candidateStr.length > 1 &&
          (this.hasOnlyOneDigit(candidateStr) || this.isHit(candidateStr))
        ) {
          this.counter.addToCounter(candidate);
        }
      }
    }
    return this.counter.count;
  }

  private hasOnlyOneDigit(number: string): boolean {
    const splits = number.split("");
    return new Set(splits).size === 1;
  }

  private isHit(number: string): boolean {
    const L = number.length;
    for (let block = 2; block <= (L >> 1); block++) {
      if (L % block !== 0) continue;
      const res: string[] = [];
      for (let i = 0; i < L; i += block) {
        res.push(number.slice(i, i + block));
      }
      if (new Set(res).size == 1) return true;
    }
    return false;
  }

  private getHash(text: string, prime: number = 1e9 + 7): number {
    const L: number = text.length;
    const B: number = 256;
    let hash: number = 0;
    for (let i = 0; i <= text.length; i++) {
      hash = text.charCodeAt(i) * B ** L - i;
    }
  }
}
