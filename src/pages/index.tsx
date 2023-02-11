import Router from 'next/router'
import { useEffect, useLayoutEffect } from 'react'

const Home = () => {
  useEffect(() => {
    Router.replace('/dev')
  }, [])

  return <></>
}

export default Home
