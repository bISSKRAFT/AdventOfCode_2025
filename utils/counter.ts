export class Counter {
  private _count: number = 0;

  private set setCount(value: number) {
    if (typeof value !== "number" || Number.isNaN(value)) {
      throw new Error(`Trying to set counter to NaN - ${value}`);
    }
    this._count = value;
  }

  public get count(): number {
    return this._count;
  }

  checkForValue<T>(candidate: T, value: T): boolean {
    return candidate === value;
  }

  addToCounter(amount: number): void {
    if (amount <= 0) return;
    this.setCount = this.count + amount;
  }
}
