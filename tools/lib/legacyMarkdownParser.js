import parseUtils from "parse5-utils"

function closeImgTags(source) {
  return source.replace(/(<img [^>]*)/g, (_match, p1) => {
    if (p1[p1.length - 1] === "/") return p1
    return `${p1} /`
  })
}

function lineIsFlickrImage(line) {
  return line.match(/<a [^>]*><img [^>]*src="https:\/\/farm[0-9]+.staticflickr.com[^>]*>/)
}

function extractFlickrImageId(line) {
  return parseInt(
    line.match(/src="https:\/\/farm[0-9]+.staticflickr.com\/[0-9]+\/([0-9]+)_[^>]*>/)[1],
    10)
}

function extractFlickrImageDetails(line) {
  const doc = parseUtils.parseFragment(line)

  return {
    imagePageUrl: parseUtils.attributesOf(doc.childNodes[0]).href,
    altTag: parseUtils.attributesOf(doc.childNodes[0].childNodes[0]).alt,
  }
}

function paragraphize(memo, line, index, array) {
  if (index === 0) { memo.push("<p>") }
  if (line === "") { memo.push("</p>") }
  if (lineIsFlickrImage(line)) {
    const flickrID = extractFlickrImageId(line)
    const flickrDetails = extractFlickrImageDetails(line)
    memo.push(`<p> flickr image: ${flickrID}, imagePageUrl: ${flickrDetails.imagePageUrl} altTag: ${flickrDetails.altTag}</p>`)
    // memo.push(`<FlickrImageLegacy flickrID={${flickrID}} linkUrl={${flickrDetails.imagePageUrl}} caption={${flickrDetails.altTag}} />`)
  } else {
    memo.push(line)
  }
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
