const parse = (s: string) => s.split('\n').map((s) => {
  if (s.length === 0) {
    return -1
  }
  return parseInt(s)
})

export const mostCallories = (s: string) => {
  let max = 0
  let sum = 0
  parse(s).forEach((a) => {
    if (a === -1) {
      if (sum > max) {
        max = sum
      }
      sum = 0
    }
    else {
      sum += a
    }
  })
  return max
}

exports.first = mostCallories

export const top3MostCallories = (s: string) => {
  let sums : number[] = []
  let sum = 0
  parse(s).forEach((a) => {
    if (a === -1) {
      sums.push(sum)
      sum = 0
    }
    else {
      sum += a
    }
  })
  sums.sort((a, b) => b - a)
  return sums[0] + sums[1] + sums[2]
}

exports.second = top3MostCallories
