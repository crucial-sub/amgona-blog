import { memo, useEffect, useState } from 'react'
import { PostListType } from 'utils/types'
import PostList from './PostList'

const Posts = ({ title, posts }: PostListType) => {
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
      </section>

      <section className={'flex flex-col gap-14 mt-2'}>
        {posts.map(post => (
          <PostList key={post.slug} post={post} title={title} />
        ))}
      </section>
    </div>
  )
}

export default memo(Posts)
