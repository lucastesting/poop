/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import legacyMarkdownParser from "./legacyMarkdownParser"

module.exports = function legacyMarkdownLoader(source) {
  this.cacheable()
  const callback = this.async()

  // not a markdown file in expected format
  if (source.split("\n")[0] !== "---") {
    return callback(null, source)
  }

  const data = legacyMarkdownParser(source)

  return callback(null,
    `import React from "react"\nimport FlickrImageLegacy from "../../components/FlickrImageLegacy"\nimport BlogPost from "../../components/BlogPost"\nexport const metadataSomething = ${JSON.stringify(data.meta)}\nexport const intro = <div>${data.intro}</div>\nexport const body = <div>${data.body}</div>\nconst blogPages = [] \nexport default () => <BlogPost intro={intro} body={body} />` // eslint-disable-line max-len
                 )
}
