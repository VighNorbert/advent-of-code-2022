const parse = (s: string) => {
	let start = { x: 0, y: 0 };
	let end = { x: 0, y: 0 };
	const map = s.trim().split('\n')
		.map((l, li) => l.trim().split('')
			.map((c, ci) => {
				if (c === 'S') {
					start = { x: ci, y: li };
					return 0;
				}
				if (c === 'E') {
					end = { x: ci, y: li };
					return 25;
				}
				return c.charCodeAt(0) - 'a'.charCodeAt(0);
			}));
	return { start, end, map };
};

const dijkstra = (map: number[][], start: { x: number, y: number }, end: { x: number, y: number }) => {
	const dist = map.map(l => l.map(c => Number.MAX_VALUE));
	const prev: ({ x: number, y: number } | null)[][] = map.map(l => l.map(c => null));
	const queue: { x: number, y: number }[] = [];
	dist[start.y][start.x] = 0;
	queue.push(start);
	while (queue.length > 0) {
		const current = queue.pop()!;
		const neighbors = [
			{ x: current.x - 1, y: current.y },
			{ x: current.x + 1, y: current.y },
			{ x: current.x, y: current.y - 1 },
			{ x: current.x, y: current.y + 1 }
		];
		neighbors.forEach(n => {
			if (n.x < 0 || n.x >= map[0].length || n.y < 0 || n.y >= map.length || (map[n.y][n.x] - map[current.y][current.x]) > 1) {
				return;
			}
			const alt = dist[current.y][current.x] + 1;
			if (alt < dist[n.y][n.x]) {
				dist[n.y][n.x] = alt;
				prev[n.y][n.x] = current;
				queue.push(n);
			}
		});
	}

	return dist[end.y][end.x];
};

export const fewestStepFromStartToEnd = (s: string) => {
	const { start, end, map } = parse(s);

	return dijkstra(map, start, end);
};
exports.first = fewestStepFromStartToEnd;

export const fewestStepFromAnyAToEnd = (s: string) => {
	const { end, map } = parse(s);

	return map
		.map((l, li) => l
			.map((c, ci) => {
				if (c === 0) {
					return dijkstra(map, { x: ci, y: li }, end);
				}
				return Number.MAX_VALUE;
			})
			.reduce((a, b) => Math.min(a, b), Number.MAX_VALUE))
		.reduce((a, b) => Math.min(a, b), Number.MAX_VALUE);
};
exports.second = fewestStepFromAnyAToEnd;