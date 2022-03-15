import { useMDXComponent } from 'next-contentlayer/hooks'
import { allProjects } from '.contentlayer/data'
import type { Project } from '.contentlayer/types'
import Layout from '@components/Layout'
import Image from 'next/image'
import RevealElement from '@components/RevealElement'
import Toc from '@components/Toc'
import MDXComponents from '@components/MDXComponents'
import '@code-hike/mdx/dist/index.css'
import Head from 'next/head'

export default function ProjectPage({ project }: { project: Project }) {
  const MDXContent = useMDXComponent(project.body.code)

  return (
    <Layout>
      <Head>
        <title>Mattie - {project.title}</title>
      </Head>
      <Toc />
      <article className="prose mx-auto dark:prose-invert w-full max-w-[calc(36em+36ex)] dark:prose-hr:bg-gradient-to-r dark:prose-hr:from-gray-800 mt-32">
        <div className="grid grid-cols-1 gap-1 text-black dark:text-white not-prose">
          <h1 className="font-semibold text-4xl mb-2">{project.title}</h1>
          <p className="max-w-prose text-lg mb-2">{project.summary}</p>
          <p className="text-gray-600 dark:text-gray-500 text-sm mb-8 tracking-wide">
            Mattie Lee • {new Date(project.date).toDateString()} • {project.readingTime.text}
          </p>
          <RevealElement className="w-full aspect-video">
            <Image
              src={`/${project.title.toLowerCase()}/hero.webp`}
              alt={`${project.title} cover`}
              width={1024}
              height={576}
            />
          </RevealElement>
          <p className="flex flex-wrap mb-2 gap-2">
            {project.tags?.split(", ").map((tag) => (
              <span key={tag} className="inline-block text-xs bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full">
                {`#${tag}`}
              </span>
            ))}
          </p>
        </div>
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