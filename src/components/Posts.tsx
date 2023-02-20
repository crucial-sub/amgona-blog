import { memo, useEffect, useState } from 'react'
import { PostListType } from 'utils/types'
import CategoryButton from './CategoryButton'
import Pagination from './Pagination'
import PostList from './PostList'
import PostsNotFound from './PostsNotFound'

const POSTS_PER_PAGE = 5

const Posts = ({ title, posts, categories }: PostListType) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const filteredPosts =
    selectedCategory === 'All'
      ? posts
      : posts.filter(post => post.frontmatter.category === selectedCategory)

  const lastPageNumber = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const indexOfLastPost = currentPage * POSTS_PER_PAGE
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE

  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

  const remainder = currentPage % POSTS_PER_PAGE
  let leftEdge = !remainder ? currentPage - 4 : currentPage - remainder + 1
  let rightEdge = !remainder
    ? currentPage
    : currentPage - remainder + POSTS_PER_PAGE

  const pageNumbers = []

  for (let i = 1; i <= lastPageNumber; i++) {
    pageNumbers.push(i)
  }

  const currentPageNumbers = pageNumbers.filter(
    number => number >= leftEdge && number <= rightEdge,
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory])

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo(0, 0)
  }

  const handleClickCategory = (category: string) => {
    setSelectedCategory(category)
  }

  if (!posts.length) return <PostsNotFound />

  return (
    <div
      className={
        'flex flex-col justify-center desktop:max-w-[980px] mobile:w-screen mobile:px-6 desktop:mb-24 mobile:mb-16 desktop:m-auto'
      }
    >
      <section
        className={'flex flex-col desktop:my-16 mobile:mt-10 mobile:mb-8'}
      >
        <h2 className={'desktop:mb-12 mobile:mb-6 text-3xl font-bold'}>
          {title}
        </h2>

        <nav className={'flex'}>
          {categories.map(category => (
            <CategoryButton
              key={category}
              title={category}
              isSelected={category === selectedCategory}
              onClick={handleClickCategory}
            />
          ))}
        </nav>
      </section>

      <section className={'flex flex-col gap-14 mt-2'}>
        {currentPosts.map(post => (
          <PostList key={post.slug} post={post} title={title} />
        ))}
      </section>

      <Pagination
        currentPage={currentPage}
        paginate={paginate}
        lastPageNumber={lastPageNumber}
        currentPageNumbers={currentPageNumbers}
      />
    </div>
  )
}

export default memo(Posts)
