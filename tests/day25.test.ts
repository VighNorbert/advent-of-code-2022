import { getSumOfSNAFU, function2 } from '../src/day25';

const input = `
1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`;

test('day 25-1', () => {
	expect(getSumOfSNAFU(input)).toBe("2=-1=0");
});

test('day 25-2', () => {
	expect(function2(input)).toBe(-1);
});
