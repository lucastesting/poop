/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import glob from "glob"
import { join } from "path"

module.exports = function blogLoader(source) {
  this.cacheable()
  const target = this.target
  const callback = this.async()

  if (target === "node") {
    source = source.replace("import 'babel/polyfill';", "") // eslint-disable-line no-param-reassign
  }

  glob("**/*.{js,jsx,markdown}", { cwd: join(__dirname, "../../pages/blog") }, (err, files) => {
    if (err) {
      return callback(err)
    }

    const pages = files.map(file => {
      let path = file

      if (path.endsWith(".js")) {
        path = path.substr(0, path.length - 3)
      } else if (path.endsWith(".jsx")) {
        path = path.substr(0, path.length - 4)
      } else if (path.endsWith(".markdown")) {
        path = path.substr(0, path.length - 9)
      }
      return path
    })


    if (pages.length) {
      const pagesData = pages.map(page => (
        {
          page,
          title: page,
        }
      )
      )
      return callback(null,
                      source.replace(" blogPages = []",
                                     (` blogPages = ${JSON.stringify(pagesData)}`)))
    }

    return callback(new Error("Cannot find any blog pages."))
  })
}
