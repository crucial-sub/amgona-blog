import PostContent from '@/components/PostContent'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { PostDetailType } from 'utils/types'

interface PathParams {
  slug: string
}

interface GetStaticPathsReturn {
  paths: Array<{ params: PathParams }>
  fallback: boolean
}

interface GetStaticPropsContext {
  params: PathParams
}

const Post = ({ frontmatter, content }: PostDetailType) => {
  return <PostContent frontmatter={frontmatter} content={content} />
}

export const getStaticPaths = async (): Promise<GetStaticPathsReturn> => {
  const files = fs.readdirSync(path.join('posts', 'dev'))

  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { slug } = params

  const markdownWithMeta = fs.readFileSync(
    path.join('posts', 'dev', slug + '.md'),
    'utf-8',
  )

  const { data: frontmatter, content } = matter(markdownWithMeta)

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  }
}

export default Post
