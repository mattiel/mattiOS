import { useMDXComponent } from 'next-contentlayer/hooks'
import { allProjects } from '.contentlayer/data'
import type { Project } from '.contentlayer/types'
import Layout from '@components/Layout'
import Image from 'next/image'
import RevealElement from '@components/RevealElement'
import Toc from '@components/Toc'
import MDXComponents from '@components/MDXComponents'
import '@code-hike/mdx/dist/index.css'

export default function ProjectPage({ project }: { project: Project }) {
  const MDXContent = useMDXComponent(project.body.code)

  return (
    <Layout>
      <Toc project={project} />
      <article className="prose mx-auto dark:prose-invert w-full max-w-[calc(36em+36ex)] dark:prose-hr:bg-gradient-to-r dark:prose-hr:from-gray-800 mt-32">
        <div className="grid grid-cols-1 gap-1 text-black dark:text-white not-prose">

          <h1 className="font-semibold text-4xl mb-2">{project.title}</h1>
          <p className="max-w-prose text-lg mb-6">{project.summary}</p>
          <p className="max-w-prose text-gray-600 dark:text-gray-500 text-sm mb-8 tracking-wide">
            Mattie Lee • {new Date(project.date).toDateString()} • {project.readingTime.text}
          </p>
        </div>
        <RevealElement className="w-full aspect-video">
          <Image
            src={`/${project.title.toLowerCase()}/hero.webp`}
            alt={`${project.title} cover`}
            width={1024}
            height={576}
          />
        </RevealElement>
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