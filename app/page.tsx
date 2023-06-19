import '@styles/globals.scss'
import s from '@styles/pages/page.module.scss'

import Hero from './Hero'
import Trending from './NowPlaying'

export default function Home() {
  return (
    <div className={s.home}>
      <Hero />
      {/* @ts-ignore */}
      <Trending />
      {/* //Search */}
      {/* //Latest movies */}
    </div>
  )
}
