import Link from 'next/link'
import React from 'react'
import { PostListType } from 'utils/types'

const Posts = ({ title, posts }: PostListType) => {
  return (
    <div>
      <div>{title}</div>
      <div>
        {posts.map(post => (
          <Link href={`post/${post.slug}`} key={post.slug}>
            <div>{post.slug}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Posts
