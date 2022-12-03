const parse = (s: string) => s.trim().split('\n');

const getSinglePriority = (s: string) => {
	if (s <= 'z' && s >= 'a') return s.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
	return s.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
};

export const getPriority = (s: string) => {
	return parse(s)
		.map((s) => [s.substring(0, s.length / 2).split(''), s.substring(s.length / 2).split('')])
		.map(
			(s) => s[0]
				.map((c) => (s[1].includes(c) ? getSinglePriority(c) : 0))
				.reduce((a, b) => a > b ? a : b)
		)
		// console.log(a);
		.reduce((a, b) => a + b);
};

exports.first = getPriority;

export const getPriorityAlt = (s: string) => {
	let p = parse(s);
	let sum = 0;
	for (let i = 0; i < p.length; i += 3) {
		let a = p[i].split('');
		let b = p[i + 1].split('');
		let c = p[i + 2].split('');
		let prio = a.map((ch) => (b.includes(ch) && c.includes(ch) ? getSinglePriority(ch) : 0))
			.reduce((a, b) => a > b ? a : b);
		sum += prio;
	}
	return sum
};

exports.second = getPriorityAlt;
