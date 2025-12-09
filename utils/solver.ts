export interface Solver<S> {
  exec(input: S[]): string | number;
}
