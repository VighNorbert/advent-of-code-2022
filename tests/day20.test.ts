import { decryptFile, decryptFileAdvanced } from '../src/day20';

const input = `1
2
-3
3
-2
0
4
`;

test('day 20-1', () => {
	expect(decryptFile(input)).toBe(3);
});

test('day 20-2', () => {
	expect(decryptFileAdvanced(input)).toBe(1623178306);
});
