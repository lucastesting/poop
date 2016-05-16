import React, { PropTypes } from "react"

const FlickrImageLegacy = ({ linkUrl, src, height, width, caption }) => (
  <div>
    <a href={linkUrl}>
      <img src={src} height={height} width={width} alt={caption} />
    </a>
    <p>{caption}</p>
  </div>
)
FlickrImageLegacy.propTypes = {
  linkUrl: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
}
export default FlickrImageLegacy
