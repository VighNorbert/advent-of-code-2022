import { emptyTilesAfter10Rounds, firstRoundWhereNoElfMoved } from '../src/day23';

const input = `
....#..
..###.#
#...#.#
.#...##
#.###..
##.#.##
.#..#..`;

test('day 23-1', () => {
	expect(emptyTilesAfter10Rounds(input)).toBe(110);
});

test('day 23-2', () => {
	expect(firstRoundWhereNoElfMoved(input)).toBe(20);
});
