const parse = (s: string) => s.trim().split('\n')
	.map(i => [i.split(' ')[0], parseInt(i.split(' ')[1])]);

const moveTail = (tx: number, ty: number, hx: number, hy: number) => {
	if (Math.abs(tx - hx) < 2 && Math.abs(ty - hy) < 2) {
		return { x: tx, y: ty };
	}
	if (tx != hx) {
		tx += tx > hx ? -1 : 1;
	}
	if (ty != hy) {
		ty += ty > hy ? -1 : 1;
	}
	return { x: tx, y: ty };
};

const simulateTailPositions = (s: string, knots: number) => {
	const instructions = parse(s);
	const tailPositions = new Set<string>();
	tailPositions.add('0,0');
	const knotsList: { x: number, y: number }[] = [];
	for (let i = 0; i < knots; i++) {
		knotsList.push({ x: 0, y: 0 });
	}
	instructions.forEach(instruction => {
		const [direction, distance] = instruction;
		for (let i = 0; i < distance; i++) {
			switch (direction) {
				case 'R':
					knotsList[0].x++;
					break;
				case 'L':
					knotsList[0].x--;
					break;
				case 'U':
					knotsList[0].y++;
					break;
				case 'D':
					knotsList[0].y--;
					break;
			}
			for (let j = 1; j < knots; j++) {
				knotsList[j] = moveTail(knotsList[j].x, knotsList[j].y, knotsList[j - 1].x, knotsList[j - 1].y);
			}
			let s = `${knotsList[knots - 1].x},${knotsList[knots - 1].y}`;
			if (!tailPositions.has(s)) {
				tailPositions.add(s);
			}
		}
	});
	return tailPositions.size;
};

export const simulateTailPositionsWith2Knots = (s: string) => {
	return simulateTailPositions(s, 2);
};
exports.first = simulateTailPositionsWith2Knots;

export const simulateTailPositionsWith10Knots = (s: string) => {
	return simulateTailPositions(s, 10);
};
exports.second = simulateTailPositionsWith10Knots;
