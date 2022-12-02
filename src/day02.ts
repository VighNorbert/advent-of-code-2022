const parse = (s: string) => s.trim().split('\n');

const convertRPS = (s: string) => {
	if (s <= 'C') return s.charCodeAt(0) - 'A'.charCodeAt(0);
	return s.charCodeAt(0) - 'X'.charCodeAt(0);
};

export const rockPaperScissors = (s: string) => {
	return parse(s)
		.map((s) => s.split(' ').map((s1) => convertRPS(s1)))
		.map(
			(arr) =>
				arr[1] +
				1 +
				(arr[0] == arr[1] ? 3 : (arr[0] - arr[1] + 3) % 3 == 2 ? 6 : 0)
		)
		.reduce((a, b) => a + b);
};

exports.first = rockPaperScissors;

export const rockPaperScissorsAlt = (s: string) => {
	return parse(s)
		.map((s) => s.split(' ').map((s1) => convertRPS(s1)))
		.map((arr) => arr[1] * 3 + ((arr[0] + arr[1] + 2) % 3) + 1)
		.reduce((a, b) => a + b);
};

exports.second = rockPaperScissorsAlt;
