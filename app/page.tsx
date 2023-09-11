import '@styles/globals.scss';
import s from '@styles/pages/page.module.scss';
import axios from 'axios';

import Hero from './Hero';
import NowPlayingMovies from './NowPlayingMovies';

export default function Home() {
  return (
    <div className={s.home}>
      <Hero />
      <NowPlayingMovies />
      {/* //Search */}
      {/* //Latest movies */}
    </div>
  );
}
