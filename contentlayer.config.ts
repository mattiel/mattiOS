import { ComputedFields, defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import readingTime from 'reading-time'
import { remarkCodeHike } from '@code-hike/mdx'
import theme from './code-hike-theme'

const computedFields: ComputedFields = {
  slug: {
    type: 'string',
    resolve: doc => doc._raw.sourceFileName.replace(/\.mdx$/, '')
  },
  readingTime: {
    type: 'json',
    resolve: (doc) => readingTime(doc.body.raw)
  }
}

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/*.mdx`,
  bodyType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'string', required: true },
    summary: { type: 'string', required: true },
    thumbnail: { type: 'string', required: true },
    tags: { type: 'string' },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Project],
  mdx: {
    rehypePlugins: [
      rehypeHighlight,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor']
          },
          behavior: 'wrap'
        }
      ]
    ],
    remarkPlugins: [[remarkCodeHike, { theme }]]
  }
})