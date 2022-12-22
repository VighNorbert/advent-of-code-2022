const parse = (s: string) => s.trim().split('\n');

class Monkey {
	name: string;
	yell: number | null = null;
	m1s: string = '';
	m2s: string = '';
	m1: Monkey | null = null;
	m2: Monkey | null = null;

	op: string = '+';

	constructor(line: string) {
		const [name, def] = line.split(': ');
		this.name = name.trim();
		let d = def.trim().split(' ');
		if (d.length == 3) {
			this.m1s = d[0];
			this.op = d[1];
			this.m2s = d[2];
		} else {
			this.yell = parseInt(d[0]);
		}
	}

	eval = (monkeys: Map<string, Monkey>): number | null => {
		if (this.yell != null) {
			return this.yell;
		}
		if (this.m1 == null) {
			if (this.m1s == '') return null;
			this.m1 = monkeys.get(this.m1s)!;
			this.m2 = monkeys.get(this.m2s)!;
		}
		const v1 = this.m1.eval(monkeys);
		const v2 = this.m2!.eval(monkeys);

		if (v1 == null || v2 == null) {
			return null;
		}

		if (this.op == '+') {
			this.yell = v1 + v2;
		} else if (this.op == '-') {
			this.yell = v1 - v2;
		} else if (this.op == '*') {
			this.yell = v1 * v2;
		} else if (this.op == '/') {
			this.yell = v1 / v2;
		}
		return this.yell;
	};

	findHumn = (monkeys: Map<string, Monkey>, product: number): number => {
		console.log(this.name, 'product should be', product);
		if (this.name == 'humn') {
			return product;
		}
		if (this.op == '+') {
			if (monkeys.get(this.m1s)!.eval(monkeys) == null) {
				return monkeys.get(this.m1s)!.findHumn(monkeys, product - monkeys.get(this.m2s)!.eval(monkeys)!);
			} else {
				return monkeys.get(this.m2s)!.findHumn(monkeys, product - monkeys.get(this.m1s)!.eval(monkeys)!);
			}
		} else if (this.op == '*') {
			if (monkeys.get(this.m1s)!.eval(monkeys) == null) {
				return monkeys.get(this.m1s)!.findHumn(monkeys, product / monkeys.get(this.m2s)!.eval(monkeys)!);
			} else {
				return monkeys.get(this.m2s)!.findHumn(monkeys, product / monkeys.get(this.m1s)!.eval(monkeys)!);
			}
		} else if (this.op == '-') {
			if (monkeys.get(this.m1s)!.eval(monkeys) == null) {
				return monkeys.get(this.m1s)!.findHumn(monkeys, product + monkeys.get(this.m2s)!.eval(monkeys)!);
			} else {
				return monkeys.get(this.m2s)!.findHumn(monkeys, monkeys.get(this.m1s)!.eval(monkeys)! - product);
			}
		}
		if (monkeys.get(this.m1s)!.eval(monkeys) == null) {
			return monkeys.get(this.m1s)!.findHumn(monkeys, product * monkeys.get(this.m2s)!.eval(monkeys)!);
		} else {
			return monkeys.get(this.m2s)!.findHumn(monkeys, monkeys.get(this.m1s)!.eval(monkeys)! / product);
		}
	};
}

export const rootYelling = (s: string) => {
	const monkeys = new Map<string, Monkey>();

	parse(s).forEach(line => {
		const monkey = new Monkey(line);
		monkeys.set(monkey.name, monkey);
	});

	return monkeys.get('root')!.eval(monkeys);

};
exports.first = rootYelling;

export const humnYelling = (s: string) => {
	const monkeys = new Map<string, Monkey>();

	parse(s).forEach(line => {
		const monkey = new Monkey(line);
		monkeys.set(monkey.name, monkey);
		if (monkey.name == 'humn') {
			monkey.yell = null;
		}
	});

	let root = monkeys.get('root')!;
	if (monkeys.get(root.m1s)!.eval(monkeys) == null) {
		return monkeys.get(root.m1s)!.findHumn(monkeys, monkeys.get(root.m2s)!.eval(monkeys)!);
	} else {
		return monkeys.get(root.m2s)!.findHumn(monkeys, monkeys.get(root.m1s)!.eval(monkeys)!);
	}
};
exports.second = humnYelling;