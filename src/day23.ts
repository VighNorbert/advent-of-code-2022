class Elf {
	newX: number | null = null;
	newY: number | null = null;

	constructor(public x: number, public y: number) {
	}
}

const parse = (s: string) => {
	let elves: Elf[] = [];

	s.trim().split('\n').forEach((row, y) => {
		row.split('').forEach((cell, x) => {
			if (cell === '#') {
				elves.push(new Elf(x, y));
			}
		});
	});

	return elves;
};

const someElfAt = (elves: Elf[], x: number, y: number, offsets: { x: number, y: number }[]) => {
	for (let o of offsets)
		if (elves.some((elf) => elf.x === x + o.x && elf.y === y + o.y))
			return true;
	return false;
};

const simulate = (elves: Elf[], dir: number) => {
	elves.forEach((elf) => {
		elf.newX = elf.newY = null;
	});

	let dirs: { move_x: number, move_y: number, offsets: { x: number, y: number }[] }[] = [
		{ move_x: 0, move_y: -1, offsets: [{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }] }, // north
		{ move_x: 0, move_y: 1, offsets: [{ x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }] }, // south
		{ move_x: -1, move_y: 0, offsets: [{ x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 }] }, // west
		{ move_x: 1, move_y: 0, offsets: [{ x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 }] } // east
	];

	elves.forEach((elf) => {
		let elvesAround = false;
		for (let i = 0; i < 4; i++) {
			let d = dirs[i % 4];
			if (someElfAt(elves, elf.x, elf.y, d.offsets)) {
				elvesAround = true;
				break;
			}
		}
		if (elvesAround) {
			for (let i = 0; i < 4; i++) {
				let d = dirs[(i + dir) % 4];
				if (!someElfAt(elves, elf.x, elf.y, d.offsets)) {
					elf.newX = elf.x + d.move_x;
					elf.newY = elf.y + d.move_y;
					break;
				}
			}
		}
	});
	let someMoved = false;
	elves = elves.map((elf) => {
		if (elves.filter((e) => e.newX != null && e.newX === elf.newX && e.newY === elf.newY).length === 1) {
			elf.x = elf.newX!;
			elf.y = elf.newY!;
			someMoved = true;
		}
		return elf;
	});
	return { elves, someMoved };
};

export const emptyTilesAfter10Rounds = (s: string) => {
	let elves = parse(s);
	for (let i = 0; i < 10; i++) {
		elves = simulate(elves, i % 4).elves;
	}
	let dx = Math.max(...elves.map((elf) => elf.x)) - Math.min(...elves.map((elf) => elf.x)) + 1;
	let dy = Math.max(...elves.map((elf) => elf.y)) - Math.min(...elves.map((elf) => elf.y)) + 1;

	return dx * dy - elves.length;
};
exports.first = emptyTilesAfter10Rounds;

export const firstRoundWhereNoElfMoved = (s: string) => {
	let elves = parse(s);
	let i = 0;
	while (true) {
		let s = simulate(elves, i % 4);
		i++;
		elves = s.elves;
		if (!s.someMoved)
			break;
	}
	return i;
};
exports.second = firstRoundWhereNoElfMoved;