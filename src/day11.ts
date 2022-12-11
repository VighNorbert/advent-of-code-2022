const parse = (s: string) => s.trim().split('\n');

class Monkey {
	id: number;
	items: number[];
	operation: (n: number) => number;
	test: (n: number) => boolean;
	throwTrue: number;
	throwFalse: number;
	activity: number;

	constructor(id: number, items: number[], operationType: string, operand: string, testNumber: number, throwTrue: number, throwFalse: number) {
		this.id = id;
		this.items = items;
		this.operation = (n) => (operand == 'old') ? n * n : ((operationType == '+') ? n + parseInt(operand) : n * parseInt(operand));
		this.test = (n) => n % testNumber === 0;
		this.throwTrue = throwTrue;
		this.throwFalse = throwFalse;
		this.activity = 0;
	}

	round(monkeys: Monkey[], hv: number|null = null) {
		if (this.items.length === 0) return;
		while (this.items.length > 0) {
			this.activity++;
			const item = this.items.shift()!;
			let newItem: number;
			if (hv !== null) {
				newItem = this.operation(item) % hv;
			} else {
				newItem = Math.floor(this.operation(item) / 3);
			}
			if (this.test(newItem)) {
				monkeys[this.throwTrue].items.push(newItem);
			} else {
				monkeys[this.throwFalse].items.push(newItem);
			}
		}
	}
}

const monkeyBusiness = (s: string, rounds: number, modulator: number|null) => {
	const monkeys : Monkey[] = parse(s).map((line, i, lines) => {
		if (line.startsWith('Monkey')) {
			let id = parseInt(line.trim().split(' ')[1].substring(0, line.trim().split(' ')[1].indexOf(':')));
			let items = lines[i+1].trim().split(':')[1].split(',').map((n) => parseInt(n.trim()));
			let operationType = lines[i+2].trim().split(':')[1].trim().split(' ')[3];
			let operationNumber = lines[i+2].trim().split(':')[1].trim().split(' ')[4];
			let testNumber = parseInt(lines[i+3].trim().split(' by ')[1]);
			if (modulator !== null) {
				modulator *= testNumber;
			}
			let throwTrue = parseInt(lines[i+4].trim().split('monkey ')[1]);
			let throwFalse = parseInt(lines[i+5].trim().split('monkey ')[1]);
			return new Monkey(id, items, operationType, operationNumber, testNumber, throwTrue, throwFalse);
		}
		return null;
	}).filter((m) => m !== null) as Monkey[];

	for (let i = 0; i < rounds; i++) {
		monkeys.forEach((monkey) => {
			monkey.round(monkeys, modulator);
		});
	}
	return monkeys.sort((a, b) => b.activity - a.activity)
		.slice(0, 2).reduce((a, b) => a * b.activity, 1);
};

export const standardMonkeyBusiness = (s: string) => monkeyBusiness(s, 20, null);
exports.first = standardMonkeyBusiness;


export const extendedMonkeyBusiness = (s: string) => monkeyBusiness(s, 10000, 1);
exports.second = extendedMonkeyBusiness;