import { visibleCount, heighestScenicScore } from '../src/day08';

const input = `30373
25512
65332
33549
35390`;

test('day 8-1', () => {
	expect(visibleCount(input)).toBe(21);
});

test('day 8-2', () => {
	expect(heighestScenicScore(input)).toBe(8);
});
