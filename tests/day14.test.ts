import { getSandCapacityWithVoid, getSandCapacityWithBottom } from '../src/day14';

const input = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

test('day 14-1', () => {
	expect(getSandCapacityWithVoid(input)).toBe(24);
});

test('day 14-2', () => {
	expect(getSandCapacityWithBottom(input)).toBe(93);
});
