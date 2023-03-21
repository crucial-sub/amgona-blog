import '../styles/globals.css'
import '../styles/prism.css'

import type { AppProps } from 'next/app'

import Header from '@/components/public/Header'
import { NextSeo } from 'next-seo'
import Footer from '@/components/public/Footer'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <NextSeo title="암고나 블로그" description="Amgona Blog." />
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
