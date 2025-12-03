import { Counter } from "./counter.ts";

export class PasswordDial {
  private readonly counter: Counter;
  private readonly upperBorder: number = 100;
  private readonly lowerBorder: number = 0;
  private crtCursor: number;

  constructor(cursorStart: number, counter: Counter) {
    this.crtCursor = cursorStart;
    this.counter = counter;
  }

  public set cursor(value: number) {
    if (value > 99 || value < 0) {
      throw new RangeError(`Cursor out of bounds! - ${value}`);
    }
    this.crtCursor = value;
  }

  computeStep(direction: string, amount: number): void {
    try {
      let remainder: number = -1;
      if (amount > this.upperBorder) {
        const qAndR = this.getQuotientAndRemainder(amount);
        this.counter.addToCounter(qAndR[0]);
        remainder = qAndR[1];
      }
      const finalRotation = remainder > -1 ? remainder : amount;
      if (direction === "R") {
        this.computeRightRotation(finalRotation);
      } else {
        this.computeLeftRotation(finalRotation);
      }
      this.checkCursor();
    } catch (e) {
      console.log(
        `direction: ${direction}, amount: ${amount}, crtCursor: ${this.crtCursor}`,
      );
      throw e;
    }
  }

  private computeRightRotation(amount: number) {
    const cursorCandidate = this.crtCursor + amount;
    if (cursorCandidate > this.upperBorder) {
      const qAndR = this.getQuotientAndRemainder(cursorCandidate);
      this.counter.addToCounter(1);
      this.cursor = qAndR[1];
    } else {
      this.cursor = cursorCandidate % this.upperBorder;
    }
  }

  private checkCursor() {
    if (this.counter.checkForValue<number>(this.crtCursor, 0)) {
      this.counter.addToCounter(1);
    }
  }

  private computeLeftRotation(amount: number) {
    if (this.crtCursor === 0) {
      this.cursor = this.upperBorder - Math.abs(amount);
      return;
    }
    const cursorCandidate = this.crtCursor - amount;
    if (cursorCandidate < this.lowerBorder) {
      this.cursor = this.upperBorder - Math.abs(cursorCandidate);
      this.counter.addToCounter(1);
    } else {
      this.cursor = cursorCandidate;
    }
  }

  private getQuotientAndRemainder(amount: number): [number, number] {
    const quotient = Math.floor(amount / this.upperBorder);
    const remainder = amount % this.upperBorder;
    if (remainder < 0 || remainder > 99) {
      throw new RangeError("Remainder out of bounds");
    }
    return [quotient, remainder];
  }
}
