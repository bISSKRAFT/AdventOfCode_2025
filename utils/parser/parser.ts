export interface Parser<T> {
	parse(input: string[]): T;
}

export class FirstPuzzleParser implements Parser<[string, number][]> {
	parse(input: string[]): [string, number][] {
		const parsed = [];
		for (const line of input) {
			if (!line) continue;
			parsed.push(this.parseLine(line));
		}
		return parsed;
	}

	private parseLine(input: string): [string, number] {
		const split = input.match("([A-Za-z])([0-9]+)");
		if (!split?.at(1) || !split.at(2)) {
			throw new Error(`parsing falied with:${input}`);
		}
		return [split.at(1)!, Number(split.at(2)!)];
	}
}
