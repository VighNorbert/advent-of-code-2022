import { mostCallories, top3MostCallories } from '../src/day01'

const callories = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`

test('day 1-1', () => {
  expect(mostCallories(callories)).toBe(24000)
})

test('day 1-2', () => {
  expect(top3MostCallories(callories)).toBe(45000)
})
