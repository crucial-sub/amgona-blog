import { memo, useState } from 'react'
import { PostListType } from 'utils/types'
import CategoryButton from './CategoryButton'
import PostList from './PostList'

const Posts = ({ title, posts, categories }: PostListType) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const filteredPosts =
    selectedCategory === 'All'
      ? posts
      : posts.filter(post => post.frontmatter.category === selectedCategory)

  const handleClickCategory = (category: string) => {
    setSelectedCategory(category)
  }

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
        {filteredPosts.map(post => (
          <PostList key={post.slug} post={post} title={title} />
        ))}
      </section>
    </div>
  )
}

export default memo(Posts)
