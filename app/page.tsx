import '@styles/globals.scss'
import s from '@styles/pages/page.module.scss'

import Hero from './Hero'
import Trending from './NowPlaying'
import NowPlaying from './NowPlaying'

export default function Home() {
  return (
    <div className={s.home}>
      {/* <Hero /> */}
      {/* @ts-ignore */}
      <NowPlaying />
      {/* //Search */}
      {/* //Latest movies */}
    </div>
  )
}
