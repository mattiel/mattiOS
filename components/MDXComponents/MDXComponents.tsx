import React from 'react'
import Image from 'next/image'

import Card from '@components/Card'
import RevealElement from '@components/RevealElement'
import Scroller from '@components/Scroller'
import Video from "@components/Video";

type ImageProps = {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fill?: string
}

// @TODO reveal image when it's loaded
const RevealImage: React.FC<ImageProps> = (props) => {
  // const [loaded, setLoaded] = React.useState(false)
  //
  // function handleLoad() {
  //   setLoaded(true)
  // }

  return (
    <RevealElement className={props.className}>
      {/*<Image onLoadingComplete={handleLoad} className="" {...props}/>*/}
      <Image {...props} alt={props.alt}/>
    </RevealElement>
  )
}

const MDXComponents = {
  Image: RevealImage,
  RevealElement,
  Card,
  Scroller,
  Video
}

export default MDXComponents