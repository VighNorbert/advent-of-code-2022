const parse = (s: string) => s.trim().split('\n');

class Dir {
	name: string;
	children: Dir[] = [];
	size: number = 0;
	parent: Dir | null = null;

	constructor(name: string, parent: Dir | null = null, size: number = 0) {
		this.name = name;
		this.parent = parent;
		while (parent) {
			parent.size += size;
			parent = parent.parent;
		}
	}

	addChild(child: Dir) {
		this.children.push(child);
	}

	getSizesSumUnder100000(): number {
		let sum = 0;
		if (this.size < 100000) {
			sum += this.size;
		}
		for (const child of this.children) {
			sum += child.getSizesSumUnder100000();
		}
		return sum;
	}

	traverseForSmallest(targetSize: number): number {
		let min = this.size;
		for (const child of this.children) {
			if (child.size > targetSize) {
				const childMin = child.traverseForSmallest(targetSize);
				if (childMin < min) {
					min = childMin;
				}
			}
		}
		return min;
	}
}

const getFileSystem = (s: string) => {
	let lines = parse(s);
	let root = new Dir('/');
	let cwd = root;
	for (let i = 0; i < lines.length; i++) {
		let line = lines[i].trim().split(' ');
		if (line[0] == '$') {
			if (line[1] == 'cd') {
				if (line[2] == '/') {
					cwd = root;
				} else if (line[2] == '..') {
					cwd = cwd.parent!;
				} else {
					let child = cwd.children.find(c => c.name == line[2]);
					if (!child) {
						child = new Dir(line[2], cwd);
						cwd.addChild(child);
					}
					cwd = child;
				}
			} else if (line[1] == 'ls') {
				i++;
				let line = lines[i].trim().split(' ');
				while (line[0] != '$') {
					if (line[0] == 'dir') {
						cwd.addChild(new Dir(line[1], cwd));
					} else {
						cwd.addChild(new Dir(line[1], cwd, parseInt(line[0])));
					}
					i++;
					if (i == lines.length) {
						break;
					}
					line = lines[i].trim().split(' ');
				}
				if (i < lines.length) {
					i--;
				}
			}
		} else {
			throw new Error('Invalid input');
			//load file
		}
	}
	return root;
};

export const deletableSum = (s: string) => {
	const root = getFileSystem(s);
	return root.getSizesSumUnder100000();
};
exports.first = deletableSum;

export const getSmallestDirectoryToDelete = (s: string) => {
	const root = getFileSystem(s);
	const targetSize = root.size - 40000000;
	if (targetSize < 0) {
		return 0;
	}
	return root.traverseForSmallest(targetSize);

};
exports.second = getSmallestDirectoryToDelete;
