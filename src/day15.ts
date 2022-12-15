const parse = (s: string) => s.trim().split('\n').map((row) => {
	const [sensor, beacon] = row.split(':');
	const sx = parseInt(sensor.substring(12, sensor.indexOf(',')));
	const sy = parseInt(sensor.substring(sensor.indexOf('y=') + 2));

	const bx = parseInt(beacon.substring(beacon.indexOf('x=') + 2, beacon.indexOf(',')));
	const by = parseInt(beacon.substring(beacon.indexOf('y=') + 2));

	return { sx, sy, bx, by };
});

const manhattan = (sx: number, sy: number, bx: number, by: number) => {
	return Math.abs(sx - bx) + Math.abs(sy - by);
};

export const safePositions = (s: string, row: number = 2000000) => {
	let minx = 0, maxx = 0;
	parse(s).map(({ sx, sy, bx, by }) => {
		minx = Math.min(sx, bx, minx);
		maxx = Math.max(sx, bx, maxx);
	});

	let safe: Set<number> = new Set<number>();

	parse(s).map(({ sx, sy, bx, by }) => {
		let m = manhattan(sx, sy, bx, by);
		for (let x = sx - m; x <= sx + m; x++) {
			if (manhattan(sx, sy, x, row) <= m && !(bx == x && by == row) && !safe.has(x)) {
				safe.add(x);
			}
		}
	});
	return safe.size;
};

exports.first = safePositions;

const merge = (val1: { a: number, b: number }, val2: { a: number, b: number }) => {
	if (val1.a > val2.a) [val1, val2] = [val2, val1];

	if (val1.b < val2.a - 1) return null;

	if (val1.b > val2.b) return val1;

	return { a: val1.a, b: val2.b };
};

export const distressBeaconTuningFrequency = (s: string, max: number = 4000000) => {
	let minx = 0, maxx = 0;
	const commands = parse(s);
	commands.map(({ sx, sy, bx, by }) => {
		minx = Math.min(sx, bx, minx);
		maxx = Math.max(sx, bx, maxx);
	});

	let safe: { a: number, b: number }[] = [];
	for (let row = 0; row <= max; row++) {
		safe = [];

		commands.map(({ sx, sy, bx, by }) => {
			let m = manhattan(sx, sy, bx, by) - Math.abs(sy - row);
			let a = Math.max(0, sx - m);
			let b = Math.min(max, sx + m);
			if (a <= b) safe.push({ a, b });
		});

		let merged = false;
		while (safe.length > 1) {
			merged = false;
			let newsafe: { a: number, b: number }[] = [];
			for (let i = 1; i < safe.length; i++) {
				let o = merge(safe[0], safe[i]);
				if (o != null) {
					merged = true;
					newsafe.push(o);
				} else {
					newsafe.push(safe[i]);
				}
			}
			if (merged) safe = newsafe;
			if (!merged) {
				for (let x = 0; x <= max; x++) {
					let found = false;
					for (let s of safe)
						if (x >= s.a && x <= s.b)
							found = true;
					if (!found)
						return x * 4000000 + row;
				}
				break;
			}
		}
	}
	return 0;
};
exports.second = distressBeaconTuningFrequency;