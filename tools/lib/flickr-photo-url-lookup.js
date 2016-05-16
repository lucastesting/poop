import Flickr from "flickrapi"
import Promise from "bluebird"
import fs from "fs"

const flickrOptions = {
  api_key: process.env.FLICKR_API_KEY,
  secret: process.env.FLICKR_SHARED_SECRET,
  user_id: process.env.FLICKR_USER_ID,
  access_token: process.env.FLICKR_ACCESS_TOKEN,
  access_token_secret: process.env.FLICKR_ACCESS_TOKEN_SECRET,
}

function lookupPhoto(id) {
  const filename = `flickr-data/${id}.json`
  if (fs.existsSync(filename)) {
    return Promise.promisify(fs.readFile)(filename)
      .then(data => JSON.parse(data))
      .catch(err => console.error(err))
  }

  return Promise.promisify(Flickr.tokenOnly)(flickrOptions)
    .then(flickr => (
      Promise.promisify(flickr.photos.getSizes)({ photo_id: id })
        .then(result => result.sizes.size)
        .then(sizeArray => sizeArray.reduce((memo, val) => { memo[val.label] = val; return memo }, {})) // eslint-disable-line no-param-reassign
        .then(sizes => {
          Promise.promisify(fs.writeFile)(filename, JSON.stringify(sizes, null, 2))
            .catch(err => console.error(err))
          return sizes
        })
        .catch(err => console.error(err))
    )
  )
}

export default function getImageData(id) {
  return lookupPhoto(id)
    .then(sizes => sizes["Large 1600"] ||
                   sizes.Large ||
                   sizes["Medium 800"] ||
                   sizes["Medium 640"] ||
                   sizes.Medium)
    .then(size => (
      {
        height: size.height,
        width: size.width,
        source: size.source,
      }
    ))
}
