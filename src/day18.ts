const parse = (s: string): Cube[] => s.trim().split('\n')
	.map((row) => {
		let r = row.split(',').map(i => parseInt(i));
		return { x: r[0], y: r[1], z: r[2] };
	});

interface Cube {
	x: number;
	y: number;
	z: number;
}

export const approximateSurface = (s: string) => {
	let cubes = parse(s);

	let result = 6 * cubes.length;

	for (let a of cubes) {
		for (let b of cubes) {
			if (Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z) == 1) {
				result--;
			}
		}
	}
	return result;
};
exports.first = approximateSurface;

export const exteriorSurface = (s: string) => {
	let cubesParsed = parse(s);

	let min: Cube = cubesParsed.reduce((a, b) => ({
		x: Math.min(a.x, b.x),
		y: Math.min(a.y, b.y),
		z: Math.min(a.z, b.z)
	}));
	let max: Cube = cubesParsed.reduce((a, b) => ({
		x: Math.max(a.x, b.x),
		y: Math.max(a.y, b.y),
		z: Math.max(a.z, b.z)
	}));

	let checked: number[] = [0];
	let cubes: number[] = cubesParsed.map(c => c.x * max.y * 2 * max.z * 2 + c.y * max.z * 2 + c.z);

	let start = { x: 0, y: 0, z: 0 };
	let queue: Cube[] = [start];

	let result = 0;
	while (queue.length > 0) {
		let a = queue.shift()!;
		checked.push(a.x * max.y * 2 * max.z * 2 + a.y * max.z * 2 + a.z);
		let neighbors: Cube[] = [
			{ x: a.x - 1, y: a.y, z: a.z },
			{ x: a.x + 1, y: a.y, z: a.z },
			{ x: a.x, y: a.y - 1, z: a.z },
			{ x: a.x, y: a.y + 1, z: a.z },
			{ x: a.x, y: a.y, z: a.z - 1 },
			{ x: a.x, y: a.y, z: a.z + 1 }
		];
		for (let n of neighbors) {
			// if in bounds
			if (n.x >= min.x - 1 && n.x <= max.x + 1 &&
				n.y >= min.y - 1 && n.y <= max.y + 1 &&
				n.z >= min.z - 1 && n.z <= max.z + 1) {
				let s = n.x * max.y * 2 * max.z * 2 + n.y * max.z * 2 + n.z;
				if (cubes.includes(s)) {
					result++;
				} else if (!checked.includes(s) && !queue.some(c => c.x == n.x && c.y == n.y && c.z == n.z)) {
					queue.push(n);
				}
			}
		}
	}
	return result;
};
exports.second = exteriorSurface;