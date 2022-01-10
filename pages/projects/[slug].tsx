import { useMDXComponent } from 'next-contentlayer/hooks'
import { allProjects } from '.contentlayer/data'
import type { Project } from '.contentlayer/types'
import Layout from '@components/Layout'

const mdxComponents = {
}

export default function ProjectPage({ project }: { project: Project }) {
  const MDXContent = useMDXComponent(project.body.code)
  return (
    <Layout>
      <div className="prose dark:prose-invert mt-24">
        <MDXContent components={mdxComponents} />
      </div>
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