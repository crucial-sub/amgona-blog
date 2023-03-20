/* eslint-disable @next/next/no-img-element */
import Badge from '@/components/public/Badge'
import { NextSeo } from 'next-seo'
import React, { useLayoutEffect } from 'react'

const About = () => {
  useLayoutEffect(() => {
    const body = document.querySelector('body')

    if (!body) return

    body.classList.add('white')

    return () => {
      body.classList.remove('white')
    }
  }, [])

  return (
    <>
      <NextSeo title="암고나 블로그" description="Amgona Blog." />
      <div
        className={
          'flex flex-col justify-center desktop:max-w-[980px] mobile:w-screen mobile:px-6 mb-16 desktop:m-auto desktop:pb-14 mobile:pb-0'
        }
      >
        <h2
          className={
            'desktop:my-16 mobile:mt-12 mobile:mb-10 text-navy text-3xl font-bold'
          }
        >
          About Me
        </h2>

        <section
          className={
            'flex desktop:flex-row mobile:flex-col justify-between p-6 rounded-3xl bg-white shadow-lg my-6'
          }
        >
          <img
            className={
              'desktop:w-52 mobile:w-full h-52 rounded-xl shadow-md aspect-square object-cover mr-7 desktop:mb-0 mobile:mb-6'
            }
            src={'/images/profile.webp'}
            alt="profile-image"
          />

          <article className={'flex flex-col justify-center basis-full'}>
            <h4 className={'text-navy text-base font-medium mb-3'}>박중섭</h4>
            <h4 className={'text-navy text-2xl font-bold mb-3'}>
              Frontend Engineer
            </h4>
            <p className={'text-navy mobile:text-justify'}>
              내가 작성한 코드를 통해 아이디어가 직관적으로 가시화된다는 점에
              매력을 느껴 프론트엔드 개발자의 길을 선택하였습니다. 프론트엔드
              개발자로서 “사용자 중심”의 개발을 지향하며, 더 나은 사용자 경험을
              위해 끊임없이 고민하고 노력합니다. 이해될 때까지 파고드는 집념
              있는 개발자입니다.
            </p>
          </article>
        </section>

        <section
          className={
            'flex desktop:flex-row mobile:p-6 mobile:flex-col desktop:items-center desktop:p-12 rounded-3xl bg-white shadow-lg my-7'
          }
        >
          <h3 className={'w-44 mobile:mb-5 text-black text-2xl font-extrabold'}>
            Profile
          </h3>

          <article>
            <p className={'text-navy text-base font-medium mb-3'}>
              - 단국대학교 화학공학과 졸업
            </p>
            <p className={'text-navy text-base font-medium mb-3'}>
              - 원티드 프리온보딩 프론트엔드 코스 수료
            </p>
          </article>
        </section>

        <section
          className={
            'flex desktop:flex-row mobile:p-6 mobile:flex-col desktop:items-center desktop:p-12 rounded-3xl bg-white shadow-lg my-7'
          }
        >
          <h3 className={'w-44 mobile:mb-5 text-black text-2xl font-extrabold'}>
            Skills
          </h3>

          <article className={'flex flex-wrap gap-3'}>
            <Badge title="NextJS" image="/images/nextjs-icon.svg" />
            <Badge title="React" image="/images/react-icon.svg" />
            <Badge title="JavaScript" image="/images/javascript-icon.svg" />
            <Badge title="TypeScript" image="/images/typescript-icon.svg" />
            <Badge title="Redux" image="/images/redux-icon.svg" />
          </article>
        </section>

        <section
          className={
            'relative flex desktop:flex-row mobile:flex-col items-center justify-between p-12 rounded-3xl shadow-lg my-7 bg-no-repeat bg-cover'
          }
          style={{ backgroundImage: 'url(/images/green.webp)' }}
        >
          <div
            className={
              'absolute w-full h-full bg-black top-0 left-0 rounded-3xl opacity-25'
            }
          />

          <div className={'flex flex-col z-10'}>
            <h3 className={'text-white text-4xl font-extrabold mb-2'}>
              Need more information?
            </h3>
            <p className={'text-lg font-medium mobile:mb-7 desktop:mb-0'}>
              Feel free to visit my Github!
            </p>
          </div>

          <div className={'flex basis-1/4 justify-center z-10'}>
            <a
              href="https://github.com/crucial-sub"
              className={
                'w-40 shadow-md flex items-center py-3 px-5 bg-white text-xl font-semibold rounded-full text-center text-navy hover:scale-105 transition-transform'
              }
            >
              <img
                className={'mr-2'}
                src={'/images/github-icon.svg'}
                alt="github"
                width={35}
                height={35}
              />
              Github
            </a>
          </div>
        </section>
      </div>
    </>
  )
}

export default About
