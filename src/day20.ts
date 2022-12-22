const parse = (s: string) => s.trim().split('\n');

class LinkedListNode {
	constructor(
		public value: number,
		public next: LinkedListNode | null = null,
		public previous: LinkedListNode | null = null
	) {
	}
}

const decrypt = (s: string, multiplier: number = 1, iterations: number = 1) => {
	const input = parse(s).map(line => parseInt(line) * multiplier);
	let start: LinkedListNode;
	let zero: LinkedListNode;
	const nodes: LinkedListNode[] = [];

	let previous: LinkedListNode | null = null;
	input.forEach((value) => {
		const node = new LinkedListNode(value);
		if (previous) {
			previous.next = node;
			node.previous = previous;
		}
		nodes.push(node);
		if (start === undefined) {
			start = node;
		}
		if (value === 0) {
			zero = node;
		}
		if (value === input[input.length - 1]) {
			node.next = start;
			start.previous = node;
		}
		previous = node;
	});


	for (let iteration = 0; iteration < iterations; iteration++) {
		nodes.forEach((node) => {
			node.next!.previous = node.previous;
			node.previous!.next = node.next;
			let n = node.previous!;
			let value = node.value % (nodes.length - 1);
			if (value > 0) {
				for (let i = 0; i < value; i++) {
					n = n.next!;
				}
			} else {
				for (let i = 0; i > value; i--) {
					n = n.previous!;
				}
			}

			node.next = n.next;
			node.previous = n;
			n.next!.previous = node;
			n.next = node;
		});
	}


	let sum = 0;
	let n = zero!.next!;
	for (let i = 1; i <= 3000; i++) {
		if (i % 1000 === 0) {
			sum += n.value;
		}
		n = n.next!;
	}
	return sum;
};

export const decryptFile = (s: string) => {
	return decrypt(s, 1, 1);
};
exports.first = decryptFile;

export const decryptFileAdvanced = (s: string) => {
	return decrypt(s, 811589153, 10);
};
exports.second = decryptFileAdvanced;