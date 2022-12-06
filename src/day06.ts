const findFirstDistinctSubstring = (input: string, length: number) => {
	return input
		.split('')
		.map((_, index) => input.substring(index, index + length).split(''))
		.map((substring) =>
			substring
				.map((c1, c1i) =>
					substring
						.map((c2, c2i) => (c1 === c2 && c1i != c2i ? 1 : 0))
						.map(Number)
						.reduce((a, b) => a + b)
				)
				.reduce((a, b) => a + b)
		)
		.map((matches, index) => (matches === 0 ? index + length : 0))
		.filter((value) => value != 0)[0];
};

export const detectStartOfPacket = (s: string) => {
	return findFirstDistinctSubstring(s, 4);
};
exports.first = detectStartOfPacket;

export const detectStartOfMessage = (s: string) => {
	return findFirstDistinctSubstring(s, 14);
};
exports.second = detectStartOfMessage;
