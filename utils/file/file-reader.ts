export class AocFileReader {
  async read(destToFile: string, splitter = "\n"): Promise<string[]> {
    const raw = await Deno.readTextFile(destToFile);
    return raw.split(splitter);
  }
}
