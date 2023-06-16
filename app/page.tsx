import '@styles/globals.scss'
import s from '@styles/pages/page.module.scss'

import Hero from './Hero'
import Trending from './Trending'

export default function Home() {
  return (
    <div className={s.home}>
      {/* <Hero /> */}
      <Trending />
      {/* //Banner */}
      {/* //Search */}
      {/* //Latest movies */}
    </div>
  )
}
