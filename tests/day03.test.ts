import { getPriority, getPriorityAlt } from '../src/day03';

const contents = `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`;

test('day 3-1', () => {
	expect(getPriority(contents)).toBe(157);
});

test('day 3-2', () => {
	expect(getPriorityAlt(contents)).toBe(70);
});
