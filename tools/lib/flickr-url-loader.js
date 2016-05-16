/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */
import flickrPhotoUrlLookup from "./flickr-photo-url-lookup"
import replaceAsync from "string-replace-async"


module.exports = function flickrUrlLoader(source) {
  this.cacheable()
  const callback = this.async()

  return replaceAsync(source, /<FlickrImageLegacy [^>]+>/, (value) => {
    replaceAsync(value, /flickrID="([0-9]+)"/, (_, id) => {
      flickrPhotoUrlLookup(id)
      .then(data => `height=${data.height} width=${data.width} src="${data.source}"`)
    })
  })
  .then(result => {
    callback(null, result)
  })
}
