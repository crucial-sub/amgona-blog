import Posts from '@/components/Posts'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { sortByDate } from 'utils'
import { PostListType } from 'utils/types'

const DevPage = ({ posts }: PostListType) => {
  return (
    <>
      <Posts title={'Dev'} posts={posts} />
    </>
  )
}

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('posts'))

  const posts = files.map(filename => {
    const slug = filename.replace('.md', '')

    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8',
    )

    const { data: frontmatter } = matter(markdownWithMeta)

    return {
      slug,
      frontmatter,
    }
  })

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  }
}

export default DevPage
