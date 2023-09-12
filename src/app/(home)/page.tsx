import '@/styles/globals.scss';

import Hero from '@/components/homepage/hero/Hero';
import NowPlayingMovies from './NowPlayingMovies';

export default function Home() {
  return (
    <div>
      <Hero />
      <NowPlayingMovies />
      {/* //Search */}
      {/* //Latest movies */}
    </div>
  );
}
