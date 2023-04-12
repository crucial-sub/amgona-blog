import '../styles/globals.css'
import '../styles/prism.css'

import type { AppProps } from 'next/app'

import Header from '@/components/public/Header'
import Footer from '@/components/public/Footer'
import BlogSEO from 'utils/seo'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <BlogSEO path="/" />
      <div className={'flex flex-col min-w-[280px] min-h-screen'}>
        <Header />
        <main className={'flex-grow'}>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default MyApp
