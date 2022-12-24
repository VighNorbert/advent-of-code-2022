import { getFastestPath, getFastestPathThereBackAndAgain } from '../src/day24';

const input = `
#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#`;

test('day 24-1', () => {
	expect(getFastestPath(input)).toBe(18);
});

test('day 24-2', () => {
	expect(getFastestPathThereBackAndAgain(input)).toBe(54);
});
