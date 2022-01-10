import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '.contentlayer/types'
import RevealElement from '@components/RevealElement'

const Item = ({ title, thumbnail, slug }: Pick<Project, 'title' | 'thumbnail' | 'slug'>) => {
  return (
    <Link href={`/projects/${slug}`}>
      <a className="w-full cursor-pointer overflow-hidden">
        <RevealElement>
          <figure className="w-full aspect-[4/3] overflow-hidden relative mb-4">
            <Image
              src={thumbnail}
              width={800}
              height={600}
              alt={`${title} thumbnail`}
            />
          </figure>
        </RevealElement>
        <figcaption className="flex flex-col space-y-1">
          <h3 className="text-xl text-black dark:text-white">{title}</h3>
        </figcaption>
      </a>
    </Link>
  )
}

export default Item