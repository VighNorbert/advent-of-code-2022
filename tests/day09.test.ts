import { simulateTailPositionsWith2Knots, simulateTailPositionsWith10Knots } from '../src/day09';

const input = `
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;
const largerInput = `
R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

test('day 9-1', () => {
	expect(simulateTailPositionsWith2Knots(input)).toBe(13);
});

test('day 9-2-1', () => {
	expect(simulateTailPositionsWith10Knots(input)).toBe(1);
});
test('day 9-2-2', () => {
	expect(simulateTailPositionsWith10Knots(largerInput)).toBe(36);
});
