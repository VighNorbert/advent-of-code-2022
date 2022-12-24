interface Coords {
	x: number;
	y: number;
}

const notIn = (c: Coords, collection: Coords[]) => {
	return !collection.some(a => a.x === c.x && a.y === c.y);
};

class Blizzard implements Coords {
	direction: number;
	ds: string;

	constructor(public x: number, public y: number, direction: string) {
		this.ds = direction;
		switch (direction) {
			case '^':
				this.direction = 0;
				break;
			case '>':
				this.direction = 1;
				break;
			case 'v':
				this.direction = 2;
				break;
			default:
				this.direction = 3;
		}
	}

	simulateMovement(height: number, width: number): Blizzard {
		if (this.direction === 0) {
			this.y--;
			if (this.y == 0) this.y = height - 2;
		} else if (this.direction === 2) {
			this.y++;
			if (this.y == height - 1) this.y = 1;
		} else if (this.direction === 1) {
			this.x++;
			if (this.x == width - 1) this.x = 1;
		} else if (this.direction === 3) {
			this.x--;
			if (this.x == 0) this.x = width - 2;
		}
		return this;
	}
}

const parse = (s: string) => {
	let blizzards: Blizzard[] = [];
	let start: Coords = { x: 0, y: 0 };
	let end: Coords = { x: 0, y: 0 };

	const m = s.trim().split('\n');

	let height: number = m.length;
	let width: number = m[0].length;

	s.trim().split('\n').forEach((line, y, arr) => {
		if (y == 0) {
			start.x = line.indexOf('.');
			start.y = y;
		}
		if (y == arr.length - 1) {
			end.x = line.indexOf('.');
			end.y = arr.length - 1;
		}
		line.split('').forEach((char, x) => {
			if (char == '^' || char == '>' || char == 'v' || char == '<') {
				blizzards.push(new Blizzard(x, y, char));
			}
		});
	});

	return { blizzards, start, end, height, width };
};

const getPathLength = (blizzards: Blizzard[], start: Coords, end: Coords, height: number, width: number): { blizzards: Blizzard[], steps: number } => {
	let curSteps: Coords[] = [];
	let nextSteps: Coords[];

	let steps = 0;
	curSteps.push(start);

	while (true) {
		nextSteps = [];
		blizzards = blizzards.map(b => b.simulateMovement(height, width));
		for (let s of curSteps) {
			if (s.x == end.x && s.y == end.y) return { blizzards, steps };
		}
		curSteps.forEach(step => {
			if (step.y > 1 || (step.x == end.x && end.y == 0)) {
				let c: Coords = { x: step.x, y: step.y - 1 };
				if (notIn(c, blizzards) && notIn(c, nextSteps)) nextSteps.push(c);
			}
			if (step.y < height - 2 || (step.x == end.x && end.y == height - 1)) {
				let c: Coords = { x: step.x, y: step.y + 1 };
				if (notIn(c, blizzards) && notIn(c, nextSteps)) nextSteps.push(c);
			}
			if (step.x > 1 && step.y > 0 && step.y < height - 1) {
				let c: Coords = { x: step.x - 1, y: step.y };
				if (notIn(c, blizzards) && notIn(c, nextSteps)) nextSteps.push(c);
			}
			if (step.x < width - 2 && step.y > 0 && step.y < height - 1) {
				let c: Coords = { x: step.x + 1, y: step.y };
				if (notIn(c, blizzards) && notIn(c, nextSteps)) nextSteps.push(c);
			}
			if (notIn(step, blizzards) && notIn(step, nextSteps)) nextSteps.push(step);
		});
		curSteps = nextSteps;
		steps++;
	}
};

export const getFastestPath = (s: string) => {
	let { blizzards, start, end, width, height } = parse(s);

	return getPathLength(blizzards, start, end, height, width).steps;
};
exports.first = getFastestPath;

export const getFastestPathThereBackAndAgain = (s: string) => {
	let { blizzards, start, end, width, height } = parse(s);

	let { blizzards: blizzards1, steps: steps1 } = getPathLength(blizzards, start, end, height, width);
	let { blizzards: blizzards2, steps: steps2 } = getPathLength(blizzards1, end, start, height, width);
	let { steps: steps3 } = getPathLength(blizzards2, start, end, height, width);

	return steps1 + steps2 + steps3 + 2;
};
exports.second = getFastestPathThereBackAndAgain;