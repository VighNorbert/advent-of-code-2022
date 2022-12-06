import { detectStartOfPacket, detectStartOfMessage } from '../src/day06';

test('day 6-1-1', () => {
	expect(detectStartOfPacket('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toBe(7);
});
test('day 6-1-2', () => {
	expect(detectStartOfPacket('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(5);
});
test('day 6-1-3', () => {
	expect(detectStartOfPacket('nppdvjthqldpwncqszvftbrmjlhg')).toBe(6);
});
test('day 6-1-4', () => {
	expect(detectStartOfPacket('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(10);
});
test('day 6-1-5', () => {
	expect(detectStartOfPacket('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(11);
});

test('day 6-2-1', () => {
	expect(detectStartOfMessage('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toBe(19);
});
test('day 6-2-2', () => {
	expect(detectStartOfMessage('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(23);
});
test('day 6-2-3', () => {
	expect(detectStartOfMessage('nppdvjthqldpwncqszvftbrmjlhg')).toBe(23);
});
test('day 6-2-4', () => {
	expect(detectStartOfMessage('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(29);
});
test('day 6-2-5', () => {
	expect(detectStartOfMessage('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(26);
});
