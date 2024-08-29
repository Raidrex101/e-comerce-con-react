import { useState } from 'react'
const PlaceholderForImg = (props) => {
    const { notFoundSrc, src, ...imageAttributes } = props
  const [imgSrc, setImgSrc] = useState(src)
  return (
    <img
    className='card-img-top'
    style={{ height: "200px"  }}
      {...imageAttributes}
      src={imgSrc || notFoundSrc}
      onError={() => { setImgSrc(notFoundSrc) }}
    />
  )
}

export default PlaceholderForImg