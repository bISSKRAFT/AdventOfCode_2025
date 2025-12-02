export interface AocFileReader {
  read(destToFile: string): any;
}

export class PaswordRotationReader implements AocFileReader {
  async read(destToFile: string): Promise<string[]> {
    return (await Deno.readTextFile(destToFile)).split("\n");
  }

  getDirectionAndAmount(command: string): [string, number] {
    const split = command.match("([A-Za-z])([0-9]+)");
    if (!split?.at(1) || !split.at(2)) {
      throw new Error(`parsing falied with:${command}`);
    }
    return [split.at(1)!, Number(split.at(2)!)];
  }
}
