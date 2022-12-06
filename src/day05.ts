const parse = (s: string) => {
	const p = s
		.split('\n')
		.map((row) => {
			if (row.charAt(0) == 'm') return row;
			let r = '';
			for (let i = 1; i < row.length; i += 4) {
				r += row.charAt(i);
			}
			return r;
		})
		.filter((row) => row.length > 0);
	const stacksMap = p.filter((row) => row.charAt(0) != 'm').reverse();
	const moves = p.filter((row) => row.charAt(0) == 'm');

	const stacks: string[][] = [];
	for (let j = 0; j < stacksMap[0].length; j++) {
		const s = [];
		for (let i = 1; i < stacksMap.length; i++) {
			const c = stacksMap[i].charAt(j);
			if (c != ' ') s.push(c);
		}
		stacks.push(s);
	}
	return { stacks: stacks, moves: moves };
};

const moveContainers = (
	stacks: string[][],
	count: number,
	from: number,
	to: number
) => {
	for (let i = 0; i < count; i++) {
		const f = stacks[from].pop();
		if (f) stacks[to].push(f);
	}
};

const moveContainerGroup = (
	stacks: string[][],
	count: number,
	from: number,
	to: number
) => {
	const f = stacks[from].splice(stacks[from].length - count, count);
	if (f) stacks[to].push(...f);
};

const getOnTopAfterRearrangement = (s: string, f: Function) => {
	const p = parse(s);
	const stacks = p.stacks;
	const moves = p.moves;

	for (let m of moves) {
		const l = m.split(' ').map(Number);
		f(stacks, l[1], l[3] - 1, l[5] - 1);
	}

	return stacks.map((s) => s[s.length - 1]).join('');
};

export const getOnTopAfterRearrangementOneByOne = (s: string) =>
	getOnTopAfterRearrangement(s, moveContainers);
exports.first = getOnTopAfterRearrangementOneByOne;

export const getOnTopAfterRearrangementByGroups = (s: string) =>
	getOnTopAfterRearrangement(s, moveContainerGroup);
exports.second = getOnTopAfterRearrangementByGroups;
