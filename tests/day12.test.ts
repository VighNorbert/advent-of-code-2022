import { fewestStepFromStartToEnd, fewestStepFromAnyAToEnd } from '../src/day12';

const input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

test('day 12-1', () => {
	expect(fewestStepFromStartToEnd(input)).toBe(31);
});

test('day 12-2', () => {
	expect(fewestStepFromAnyAToEnd(input)).toBe(29);
});
