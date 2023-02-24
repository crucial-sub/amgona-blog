/* eslint-disable @next/next/no-img-element */
import useLazyLoad from 'hooks/useLazyLoad'
import { marked } from 'marked'
import { useLayoutEffect } from 'react'
import { PostDetailType } from 'utils/types'
import Prism from '../../utils/prism'

const renderer = {
  image(href: string, title: string, text: string) {
    return `
      <img class="lazyImage" src="/images/loading-white.svg" alt=${title} data-src=${href} />
    `
  },
}

const PostContent = ({ frontmatter, content }: PostDetailType) => {
  const { title, date, thumbnail } = frontmatter

  useLayoutEffect(() => {
    Prism.highlightAll()
  }, [])

  marked.use({ renderer })
  useLazyLoad()

  return (
    <>
      <div
        className={
          'post w-full flex justify-center desktop:my-9 mobile:mt-3 mobile:mb-12 mobile:px-4'
        }
      >
        <div className={'desktop:w-[700px] mobile:w-full'}>
          <img
            className={
              'w-full desktop:h-[400px] aspect-[400:700] object-cover rounded-xl mb-8'
            }
            src={thumbnail}
            alt="thumbnail-image"
            width={700}
            height={400}
          />
          <h1 className={'mb-3 desktop:text-4xl mobile:text-3xl font-bold'}>
            {title}
          </h1>
          <div className={'mb-8 text-gray'}>{date.slice(0, 10)}</div>

          <div>
            <article dangerouslySetInnerHTML={{ __html: marked(content) }} />
          </div>
        </div>
      </div>
    </>
  )
}

export default PostContent
