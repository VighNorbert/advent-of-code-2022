import { getOnTopAfterRearrangementOneByOne, getOnTopAfterRearrangementByGroups } from '../src/day05';

const stacks = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

test('day 5-1', () => {
	expect(getOnTopAfterRearrangementOneByOne(stacks)).toBe('CMZ');
});

test('day 5-2', () => {
	expect(getOnTopAfterRearrangementByGroups(stacks)).toBe('MCD');
});
