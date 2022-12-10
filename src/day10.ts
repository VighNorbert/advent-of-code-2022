const parse = (s: string) => s.trim().split('\n');

export const getSumOfSignalStrengths = (s: string) => {
	let result = 0;
	let x = 1;
	let index = 1;

	parse(s).forEach((instruction) => {
		if ((index - 20) % 40 == 0) {
			result += x * index;
		}
		index++;
		if (instruction.startsWith('addx')) {
			if ((index - 20) % 40 == 0) {
				result += x * index;
			}
			index++;
			x += parseInt(instruction.substring(5));
		}
	});
	return result;
};
exports.first = getSumOfSignalStrengths;

export const getCrtOutput = (s: string) => {
	let crt : string[][] = [[],[],[],[],[],[]];
	let x = 1;
	let index = 0;

	parse(s).forEach((instruction) => {
		crt[Math.floor(index / 40)].push((x - 1 <= index % 40 && index % 40 <= x + 1) ? '#' : '.');
		index++;
		if (instruction.startsWith('addx')) {
			crt[Math.floor(index / 40)].push((x - 1 <= index % 40 && index % 40 <= x + 1) ? '#' : '.');
			index++;
			x += parseInt(instruction.substring(5));
		}
	});
	return crt.map(row => row.join(''));
};
exports.second = getCrtOutput;