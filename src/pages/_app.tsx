import "../styles/globals.css";

import type { AppProps } from "next/app";

import { NextSeo } from "next-seo";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <NextSeo title="암고나 블로그" description="Amgona Blog." />
      <div className={"flex flex-col min-w-[320px] min-h-screen"}>
        <main className={"flex-grow"}>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
};

export default MyApp;
