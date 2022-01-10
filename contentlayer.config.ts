import { ComputedFields, defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeHighlight from "rehype-highlight";

const computedFields: ComputedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, '')
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
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Project],
  mdx: {
    rehypePlugins: [rehypeHighlight]
  }
})