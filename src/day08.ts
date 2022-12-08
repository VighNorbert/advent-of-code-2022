const parse = (s: string) => s.trim().split('\n').map(l => l.split('').map(Number));

export const visibleCount = (s: string) => {
	return parse(s)
		.map((row, i, m) =>
			row
				.map((c1, j) =>
					[
						row.filter((_, k) => k < j),
						row.filter((_, k) => k > j),
						m.filter((_, k) => k < i).map(r2 => r2[j]),
						m.filter((_, k) => k > i).map(r2 => r2[j])
					]
						.filter((a) => (a.reduce((a, b) => a > b ? a : b, -1) < c1))
						.length > 0
				)
				.map(Number)
				.reduce((a, b) => a + b, 0)
		)
		.reduce((a, b) => a + b, 0);
};
exports.first = visibleCount;

export const heighestScenicScore = (s: string) => {
	return parse(s)
		.map((row, i, m) =>
			row
				.map((c1, j) =>
					[
						row.filter((_, k) => k < j).reverse(),
						row.filter((_, k) => k > j),
						m.filter((_, k) => k < i).map(r2 => r2[j]).reverse(),
						m.filter((_, k) => k > i).map(r2 => r2[j])
					]
						.map((array) =>
							array
								.map((b, k) =>
									array.every((c, l) => c < c1 || k <= l) ? k + 1 : 1
								)
								.reduce((a, b) => a > b ? a : b, 0)
						)
						.reduce((a, b) => a * b, 1)
				)
				.reduce((a, b) => a > b ? a : b, -1)
		)
		.reduce((a, b) => a > b ? a : b, -1);
};
exports.second = heighestScenicScore;
