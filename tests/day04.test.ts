import { containedAssignments, overlapingAssignments } from '../src/day04';

const assignemnts = `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`;

test('day 4-1', () => {
	expect(containedAssignments(assignemnts)).toBe(2);
});

test('day 4-2', () => {
	expect(overlapingAssignments(assignemnts)).toBe(4);
});
