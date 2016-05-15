function closeImgTags(source) {
  return source.replace(/(<img [^>]*)/g, (_match, p1) => {
    if (p1[p1.length - 1] === "/") return p1
    return `${p1} /`
  })
}

function paragraphize(memo, line, index, array) {
  if (index === 0) { memo.push("<p>") }
  if (line === "") { memo.push("</p>") }
  memo.push(line)
  if (line === "") { memo.push("<p>") }
  if (index === (array.length - 1)) { memo.push("</p>") }
  return memo
}

function format(source) {
  return source.
    split("\n").
    reduce(paragraphize, []).
    join("\n")
}


module.exports = function parseLegacyMarkdown(source) {
  const file = closeImgTags(source).split("\n")
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
    trim()

  const body = file.
    slice(endIntro + 1, file.length).
    join("\n").
    trim()

  const nicerIntro = format(intro)
  const nicerBody = format(body)

  return { intro: nicerIntro, body: nicerBody, meta: nicerMeta }
}
