import Posts from '@/components/Posts'
import fs from 'fs'
import matter from 'gray-matter'
import { NextSeo } from 'next-seo'
import path from 'path'
import { sortByDate } from 'utils'
import { PostListType } from 'utils/types'

const DevPage = ({ posts, categories }: PostListType) => {
  return (
    <>
      <NextSeo title="암고나 블로그" description="Amgona Blog." />
      <Posts title={'Dev'} posts={posts} categories={categories} />
    </>
  )
}

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('posts', 'dev'))

  const posts = files.map(filename => {
    const slug = filename.replace('.md', '')

    const markdownWithMeta = fs.readFileSync(
      path.join('posts', 'dev', filename),
      'utf-8',
    )

    const { data: frontmatter } = matter(markdownWithMeta)

    return {
      slug,
      frontmatter,
    }
  })

  const defaultCategory = posts.length ? ['All'] : null
  const categorySet = new Set(defaultCategory)

  posts.forEach(post => categorySet.add(post.frontmatter.category ?? null))

  return {
    props: {
      posts: posts.sort(sortByDate),
      categories: Array.from(categorySet),
    },
  }
}

export default DevPage
