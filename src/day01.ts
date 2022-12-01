const parse = (s: string) => s.trim().split('\n\n')
    .map((s) => s.split('\n'))
    .map((s) => s.map((s1) => parseInt(s1))
)

export const mostCallories = (s: string) => {
  return parse(s)
      .map((s) => s.reduce((a, b) => a + b))
      .reduce((a, b) => Math.max(a, b))
}

exports.first = mostCallories

export const top3MostCallories = (s: string) => {
  return parse(s)
      .map((s) => s.reduce((a, b) => a + b))
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((a, b) => a + b)
}

exports.second = top3MostCallories
