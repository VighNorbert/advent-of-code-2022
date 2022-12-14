const parse = (s: string) => s.trim().split('\n').map((row) => row.split(' -> '));

const getDimensions = (input: string[][]) => {
	let h = 0, w = 0;
	input.forEach((row) => {
		row.forEach((c) => {
			let coords = c.split(',');
			if (parseInt(coords[0]) > w) {
				w = parseInt(coords[0]);
			}
			if (parseInt(coords[1]) > h) {
				h = parseInt(coords[1]);
			}
		});
	});
	return { w: w, h: h };
};

const generateGrid = (input: string[][], w: number, h: number) => {
	const grid: string[][] = [];
	for (let i = 0; i <= h; i++) {
		let r: string[] = [];
		for (let j = 0; j <= w; j++) {
			r.push('.');
		}
		grid.push(r);
	}
	input.forEach((row) => {
		row.forEach((c, index) => {
			let coords = c.split(',');
			let cx = parseInt(coords[0]), cy = parseInt(coords[1]);
			if (index > 0) {
				let lastcoords = row[index - 1].split(',');
				let lcx = parseInt(lastcoords[0]), lcy = parseInt(lastcoords[1]);
				for (let x = Math.min(cx, lcx); x <= Math.max(cx, lcx); x++) {
					for (let y = Math.min(cy, lcy); y <= Math.max(cy, lcy); y++) {
						grid[y][x] = '#';
					}
				}
			}
		});
	});
	return grid;
};

const sandCapacity = (grid: string[][], w: number, h: number) => {
	let count = 0;
	while (true) {
		count++;
		let x = 500, y = 0;
		let moved = false;
		while (true) {
			moved = false;
			if (y == h || grid[y + 1][x] == '.') {
				if (y != h) moved = true;
				y++;
			} else if (x == 0 || grid[y + 1][x - 1] == '.') {
				if (x != 0) moved = true;
				y++;
				x--;
			} else if (x == w - 1 || grid[y + 1][x + 1] == '.') {
				if (x != w - 1) moved = true;
				y++;
				x++;
			}
			if (!moved) {
				if (!(y == h + 1 || x == -1 || x == w)) {
					grid[y][x] = 'O';
				}
				break;
			}
		}
		if (y == h + 1 || x == -1 || x == w || (x == 500 && y == 0)) {
			if (!(x == 500 && y == 0)) count--;
			break;
		}
	}
	return count;
};

export const getSandCapacityWithVoid = (s: string) => {
	let input = parse(s);
	let { w, h } = getDimensions(input);

	const grid = generateGrid(input, w, h);

	return sandCapacity(grid, w, h);
};
exports.first = getSandCapacityWithVoid;


const addBottomRows = (grid: string[][]) => {
	let r2 = [];
	for (let j = 0; j <= grid[0].length; j++) {
		r2.push('.');
	}
	grid.push(r2);
	r2 = [];
	for (let j = 0; j <= grid[0].length; j++) {
		r2.push('#');
	}
	grid.push(r2);
};

export const getSandCapacityWithBottom = (s: string) => {
	let input = parse(s);
	let { w, h } = getDimensions(input);
	w += h;

	const grid = generateGrid(input, w, h);
	addBottomRows(grid);
	h += 2;

	return sandCapacity(grid, w, h);
};
exports.second = getSandCapacityWithBottom;