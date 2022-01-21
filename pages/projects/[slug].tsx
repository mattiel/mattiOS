import { useMDXComponent } from 'next-contentlayer/hooks'
import { allProjects } from '.contentlayer/data'
import type { Project } from '.contentlayer/types'
import Layout from '@components/Layout'
import Image from 'next/image'
import RevealElement from '@components/RevealElement'
import MDXComponents from '@components/MDXComponents'
import React from "react";
import clsx from 'clsx';

export default function ProjectPage({ project }: { project: Project }) {
  const MDXContent = useMDXComponent(project.body.code)
  const parse = () => {
    return project.body.raw.split('\n').filter((line) => line.startsWith('#'))
  }

  return (
    <Layout>
      <aside className="hidden 2xl:block relative px-12 h-full w-full overflow-hidden max-w-xs">
        <nav className="top-36 fixed">
          <p className="text-white text-sm font-medium mb-4">
            On this page
          </p>
          <ul className="">
            {
              parse().map((line, i) => {
                const isSubHeader = line.startsWith('###')
                const [, title] = line.split('# ')
                return (
                  <li key={i} className="">
                    <a
                      href={`#${title.toLowerCase().replace(/ /g, '-')}`}
                      className={clsx(
                        'dark:text-gray-400 dark:hover:text-white text-sm leading-snug',
                        isSubHeader && 'ml-3'
                      )}>
                      {title}
                    </a>
                  </li>
                )
              })
            }
          </ul>
        </nav>
      </aside>
      <RevealElement className="w-full aspect-video mt-32">
        <Image
          src={`/${project.title.toLowerCase()}/hero.webp`}
          alt={project.title}
          width={1024}
          height={576}
        />
      </RevealElement>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-black dark:text-white mb-12">
        <h1 className="font-semibold text-4xl mb-2">{project.title}</h1>
        <p className="max-w-prose text-lg mb-6">{project.summary}</p>
      </div>
      <article className="prose lg:prose-xl dark:prose-invert max-w-screen-lg dark:prose-hr:bg-gradient-to-r dark:prose-hr:from-gray-800">
        <MDXContent components={{...MDXComponents as any}} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  return {
    paths: allProjects.map((project) => ({ params: { slug: project.slug } })),
    fallback: false
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const project = allProjects.find((project) => project.slug === params.slug)
  return { props: { project } }
}