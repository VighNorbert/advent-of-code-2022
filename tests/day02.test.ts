import { rockPaperScissors, rockPaperScissorsAlt } from '../src/day02';

const strategies = `
A Y
B X
C Z
`;

test('day 2-1', () => {
	expect(rockPaperScissors(strategies)).toBe(15);
});

test('day 2-2', () => {
	expect(rockPaperScissorsAlt(strategies)).toBe(12);
});

test('day 2-AX', () => {
	expect(rockPaperScissorsAlt('A X')).toBe(3);
});
test('day 2-AY', () => {
	expect(rockPaperScissorsAlt('A Y')).toBe(1 + 3);
});
test('day 2-AZ', () => {
	expect(rockPaperScissorsAlt('A Z')).toBe(2 + 6);
});
test('day 2-BX', () => {
	expect(rockPaperScissorsAlt('B X')).toBe(1);
});
test('day 2-BY', () => {
	expect(rockPaperScissorsAlt('B Y')).toBe(2 + 3);
});
test('day 2-BZ', () => {
	expect(rockPaperScissorsAlt('B Z')).toBe(3 + 6);
});
test('day 2-CX', () => {
	expect(rockPaperScissorsAlt('C X')).toBe(2);
});
test('day 2-CY', () => {
	expect(rockPaperScissorsAlt('C Y')).toBe(3 + 3);
});
test('day 2-CZ', () => {
	expect(rockPaperScissorsAlt('C Z')).toBe(1 + 6);
});
