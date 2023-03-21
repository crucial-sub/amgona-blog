/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'
import { PostDetailType } from 'utils/types'

interface PostListProps {
  post: PostDetailType
  title: string
}

const PostList = ({ post, title }: PostListProps) => {
  const { slug, frontmatter } = post
  const [fileName, fileFormat] = frontmatter.thumbnail.split('.')

  return (
    <article>
      <Link
        className={'desktop:postList'}
        href={`/post/${title.toLowerCase()}/${slug}`}
      >
        <div
          className={
            'flex desktop:items-center desktop:flex-row mobile:flex-col'
          }
        >
          <div
            className={
              'relative desktop:w-48 desktop:h-48 mobile:w-full desktop:mb-0 desktop:mr-12 mobile:mb-5 shrink-0 overflow-hidden drop-shadow-md rounded-xl'
            }
          >
            {fileFormat.includes('webm' || 'mp4') ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className={
                  'desktop:w-48 desktop:h-48 desktop:aspect-square aspect-[700:400] mobile:w-full mobile:h-[205px] tablet:h-auto object-cover thumbnail'
                }
              >
                <source src={`${fileName}.webm`} type="video/webm" />
                <source src={`${fileName}.mp4`} type="video/mp4" />
              </video>
            ) : (
              <img
                className={
                  'desktop:w-48 desktop:h-48 desktop:aspect-square aspect-[700:400] mobile:w-full mobile:h-[205px] tablet:h-auto object-cover thumbnail'
                }
                src={frontmatter.thumbnail}
                alt="thumbnail"
              />
            )}
            <div className={'absolute top-0 left-0 w-full h-full overlay'} />
          </div>

          <div>
            <h3
              className={
                'max-h-16 mobile:mb-[10px] desktop:mb-4 desktop:text-3xl mobile:text-2xl font-bold text-ellipsis break-keep'
              }
            >
              {frontmatter.title}
            </h3>
            <p className={'max-h-24 mb-3 text-base text-gray'}>
              {frontmatter.excerpt}
            </p>
            <span className={'text-sm text-lightGray'}>
              {frontmatter.date.slice(0, 10)}
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default PostList
