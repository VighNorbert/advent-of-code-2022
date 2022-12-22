import { rootYelling, humnYelling } from '../src/day21';

const input = `root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`;

test('day 21-1', () => {
	expect(rootYelling(input)).toBe(152);
});

test('day 21-2', () => {
	expect(humnYelling(input)).toBe(301);
});
