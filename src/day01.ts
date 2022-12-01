const parse = (s: string) =>
	s
		.trim()
		.split('\n\n')
		.map((s) => s.split('\n'))
		.map((s) => s.map((s1) => parseInt(s1)));

export const mostCalories = (s: string) => {
	return parse(s)
		.map((s) => s.reduce((a, b) => a + b))
		.reduce((a, b) => Math.max(a, b));
};

exports.first = mostCalories;

export const top3MostCalories = (s: string) => {
	return parse(s)
		.map((s) => s.reduce((a, b) => a + b))
		.sort((a, b) => b - a)
		.slice(0, 3)
		.reduce((a, b) => a + b);
};

exports.second = top3MostCalories;
