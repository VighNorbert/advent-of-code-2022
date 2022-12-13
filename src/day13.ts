const compare = (a: number | any[], b: number | any[]): boolean | null => {
	if (typeof a === 'number' && typeof b === 'number') {
		if (a == b) {
			return null;
		}
		return a < b;
	} else if (typeof a === 'number') {
		return compare([a], b);
	} else if (typeof b === 'number') {
		return compare(a, [b]);
	} else {
		for (let i = 0; i < a.length; i++) {
			if (i >= b.length) {
				return false;
			}
			let c = compare(a[i], b[i]);
			if (c !== null) {
				return c;
			}
		}
		if (a.length == b.length) {
			return null;
		}
		return true;
	}
};

export const indicesSum = (s: string) => {
	let result = 0;
	const pairs = s.trim().split('\n\n');
	pairs.forEach((pair, pair_index) => {
		const [a, b] = pair.split('\n');
		const c = compare(JSON.parse(a), JSON.parse(b));
		if (c || c === null) {
			result += pair_index + 1;
		}
	});
	return result;
};
exports.first = indicesSum;

const getIndex = (s: string, a: number | any[]): number => {
	let result = 0;
	const pairs = s.trim().split('\n');
	pairs.forEach((ln) => {
		if (ln.length != 0) {
			if (compare(JSON.parse(ln), a) == true) {
				result++;
			}
		}
	});
	return result + 1;
};

export const indicesProduct = (s: string) => {
	return getIndex(s, [[2]]) * (getIndex(s, [[6]]) + 1);
};
exports.second = indicesProduct;