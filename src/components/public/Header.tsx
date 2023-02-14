/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useRef } from 'react'

const Header = () => {
  const navListBox = useRef<HTMLDivElement>(null)

  const handleClickHamburger = () => {
    if (!navListBox.current) return

    if (navListBox.current.classList.contains('opened')) {
      navListBox.current.classList.remove('opened')
    } else {
      navListBox.current.classList.add('opened')
    }
  }

  return (
    <header
      className={
        'min-h-16 min-h-[64px] w-screen flex items-center justify-center sticky top-0 z-20 bg-black90 backdrop-blur-sm'
      }
    >
      <nav
        className={
          'max-w-6xl min-h-[64px] flex desktop:flex-row items-center mobile:flex-col tablet:flex-col justify-between desktop:w-[932px] mobile:w-[90%]'
        }
      >
        <h1>
          <Link
            className={
              'flex items-center font-bold text-xl mobile:w-full flex-grow min-h-[64px]'
            }
            href={'/dev'}
          >
            암고나 블로그
          </Link>
        </h1>

        <div className="desktop:hidden absolute right-[5%] top-[32px] -translate-y-1/2">
          <button
            className={'rounded-lg p-2 hover:bg-gray-700 '}
            onClick={handleClickHamburger}
          >
            <img
              src={'/images/hamburger-white.svg'}
              alt="hamburger"
              width={18}
              height={18}
            />
          </button>
        </div>

        <div
          ref={navListBox}
          className={`desktop:max-h-20 desktop:w-fit overflow-y-hidden mobile:w-full accordion shrink-0`}
        >
          <ul
            className={
              'flex items-center desktop:flex-row mobile:flex-col mobile:w-full mobile:overflow-y-hidden mobile:flex-grow'
            }
          >
            <li className={'font-semibold text-base mobile:w-full flex'}>
              <Link
                className={
                  'desktop:px-2 hover:text-blue desktop:w-20 transition mobile:px-3 mobile:py-4 text-center'
                }
                href={'/dev'}
              >
                Dev
              </Link>
            </li>
            <li className={'font-semibold text-base mobile:w-full flex'}>
              <Link
                className={
                  'desktop:px-2 hover:text-blue desktop:w-20 transition mobile:px-3 mobile:py-4 text-center'
                }
                href={'/about'}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
