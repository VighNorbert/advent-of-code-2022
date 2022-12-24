import { approximateSurface, exteriorSurface } from '../src/day18';

const input = `2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`;

test('day 18-1', () => {
	expect(approximateSurface(input)).toBe(64);
});

test('day 18-2', () => {
	expect(exteriorSurface(input)).toBe(58);
});
