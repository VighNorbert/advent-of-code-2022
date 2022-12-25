const parse = (s: string) => s.trim().split('\n');

const snafuToDecimal = (snafu: string): number => {
	let is = snafu.split('').reverse();
	let decimal = 0;
	let m = 1;
	is.forEach(i => {
		switch (i) {
			case '1':
				decimal += m;
				break;
			case '2':
				decimal += 2 * m;
				break;
			case '-':
				decimal -= m;
				break;
			case '=':
				decimal -= 2 * m;
				break;
		}
		m *= 5;
	});
	return decimal;
};

const decimalToSnafu = (decimal: number): string => {
	let s = '';
	let m = 5;
	while (decimal != 0) {
		let r = decimal % m;
		decimal = Math.floor(decimal / m);
		switch (r) {
			case 1:
				s += '1';
				break;
			case 2:
				s += '2';
				break;
			case 3:
				s += '=';
				decimal++;
				break;
			case 4:
				s += '-';
				decimal++;
				break;
			default:
				s += '0';
				break;
		}
	}
	return s.split('').reverse().join('');
};

export const getSumOfSNAFU = (s: string) => {
	const input = parse(s);
	let sum = 0;
	input.forEach((line) => {
		sum += snafuToDecimal(line);
	});
	return decimalToSnafu(sum);
};
exports.first = getSumOfSNAFU;

export const function2 = (s: string) => {
	return 0;
};
exports.second = function2;