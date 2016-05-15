module.exports = function parseLegacyMarkdown(source) {
  const file = source.split("\n")
  if (file[0] === "---") throw Error
  const endMeta = file.indexOf("---", 1)
  const endIntro = file.indexOf("<!-- more -->")

  const meta = file.
    slice(1, endMeta).
    join("\n").
    trim().
    split("\n")

  const nicerMeta = meta.reduce((memo, line) => {
    const splitPoint = line.indexOf(":")
    const key = line.slice(0, splitPoint).trim()
    const value = line.slice(splitPoint + 1).trim()
    memo[key] = value // eslint-disable-line no-param-reassign
    return memo
  }, {})

  nicerMeta.tags = nicerMeta.tags.split(",").map(tag => tag.trim())

  const intro = file.
    slice(endMeta + 1, endIntro).
    join("\n").
    trim().
    split("\n")

  const body = file.
    slice(endIntro + 1, file.length).
    join("\n").
    trim().
    split("\n")


  const paragraphize = (memo, line, index, array) => {
    if (index === 0) { memo.push("<p>") }
    if (line === "") { memo.push("</p>") }
    memo.push(line)
    if (line === "") { memo.push("<p>") }
    if (index === (array.length - 1)) { memo.push("</p>") }
    return memo
  }

  const nicerIntro = intro.reduce(paragraphize, [])
  const nicerBody = body.reduce(paragraphize, [])

  return { intro: nicerIntro, body: nicerBody, meta: nicerMeta }
}
