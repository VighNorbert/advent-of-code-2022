import { indicesSum, indicesProduct } from '../src/day13';

const input = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

test('day 13-1', () => {
	expect(indicesSum(input)).toBe(13);
});

test('day 13-2', () => {
	expect(indicesProduct(input)).toBe(140);
});
