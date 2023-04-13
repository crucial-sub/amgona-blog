import { useRouter } from 'next/router'
import { memo, useEffect, useState } from 'react'
import { PostListType } from 'utils/types'
import CategoryButton from './CategoryButton'
import Pagination from './Pagination'
import PostList from './PostList'
import PostsNotFound from './PostsNotFound'

const POSTS_PER_PAGE = 5
const PAGINATION_RANGE = 5

const Posts = ({ title, posts, categories }: PostListType) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const router = useRouter()

  const filteredPosts =
    selectedCategory === 'All'
      ? posts
      : posts.filter(post => post.frontmatter.category === selectedCategory)

  const lastPageNumber = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const indexOfLastPost = currentPage * POSTS_PER_PAGE
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE

  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

  const currentPageGroup = Math.ceil(currentPage / PAGINATION_RANGE)
  const leftEdge = (currentPageGroup - 1) * PAGINATION_RANGE + 1
  const rightEdge = currentPageGroup * PAGINATION_RANGE

  const currentPageNumbers = []

  for (let i = leftEdge; i <= rightEdge && i <= lastPageNumber; i++) {
    currentPageNumbers.push(i)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sessionPath = sessionStorage.getItem('path') || 'dev'
      if (sessionPath === router.pathname) {
        const sessionCategory = sessionStorage.getItem('category') || 'All'
        const sessionPage = parseInt(sessionStorage.getItem('page') || '1')
        setSelectedCategory(sessionCategory)
        setCurrentPage(sessionPage)
      } else {
        sessionStorage.setItem('path', router.pathname)
        sessionStorage.setItem('category', 'All')
        sessionStorage.setItem('page', '1')
        setSelectedCategory('All')
        setCurrentPage(1)
      }
    }
  }, [])

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    sessionStorage.setItem('page', pageNumber.toString())
    window.scrollTo(0, 0)
  }

  const handleClickCategory = (category: string) => {
    setSelectedCategory(category)
    sessionStorage.setItem('category', category)
    sessionStorage.setItem('page', '1')
    setCurrentPage(1)
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

        <nav className={'flex overflow-x-auto scroll'}>
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
