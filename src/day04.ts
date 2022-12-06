const parse = (s: string) =>
	s
		.trim()
		.split('\n')
		.map((l) => l.split(',').map((m) => m.split('-').map(Number)))
		.map(([a, b]) =>
			a[0] > b[0] || (a[0] === b[0] && a[1] < b[1]) ? [b, a] : [a, b]
		);

export const containedAssignments = (s: string) => {
	return parse(s)
		.map(([a, b]) => (a[1] >= b[1] ? 1 : 0))
		.map(Number)
		.reduce((a, b) => a + b);
};

exports.first = containedAssignments;

export const overlapingAssignments = (s: string) => {
	return parse(s)
		.map(([a, b]) =>
			b[0] <= a[1] || (b[1] >= a[0] && b[1] <= a[1]) ? 1 : 0
		)
		.map(Number)
		.reduce((a, b) => a + b);
};

exports.second = overlapingAssignments;
