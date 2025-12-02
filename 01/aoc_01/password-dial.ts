export class PasswordDial {
  private readonly upperBorder: number = 100;
  private readonly lowerBorder: number = 0;

  computeStep(direction: string, amount: number, cursor: number): number {
    if (direction === "R") {
      const step = cursor + amount;
      return step % this.upperBorder;
    } else {
      let amountMtbl = amount;
      if (amount > this.upperBorder) {
        amountMtbl = amount % this.upperBorder;
      }
      const newCursor = cursor - amountMtbl;
      if (newCursor < this.lowerBorder) {
        return this.upperBorder - (Math.abs(newCursor) % this.upperBorder);
      }
      return newCursor;
    }
  }
}
