/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import legacyMarkdownParser from "./legacyMarkdownParser"

module.exports = function legacyMarkdownLoader(source) {
  this.cacheable()
  const target = this.target
  const callback = this.async()
  let foo
  if (target !== "node") {
    foo = "import 'babel/polyfill'\n"
  }

  console.log(source)
  const data = legacyMarkdownParser(source)

    console.log(`${foo}import React from "react"\nimport BlogPost from "../components/BlogPost"\nexport const metadataSomething = ${JSON.stringify(data.meta)}\nexport const intro = <div>${data.intro}</div>\nexport const body = <div>${data.body}</div>\nconst blogPages = [] \nexport default () => <BlogPost intro={intro} body={body} />`) // eslint-disable-line max-len
  return callback(null,
    `import React from "react"\nimport BlogPost from "../components/BlogPost"\nexport const metadataSomething = ${JSON.stringify(data.meta)}\nexport const intro = <div>${data.intro}</div>\nexport const body = <div>${data.body}</div>\nconst blogPages = [] \nexport default () => <BlogPost intro={intro} body={body} />` // eslint-disable-line max-len
                 )
}
