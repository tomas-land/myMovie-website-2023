
import axios from 'axios';

import s from '@styles/components/now_playing.module.scss'

import iMovie from '@/lib/interfaces';

import Slider from './components/UI/Slider';


async function getNowPlaying() {
  const URL_TMDB = 'https://api.themoviedb.org/3/movie/now_playing';
  try {
    const response = await axios.get(`${URL_TMDB}?api_key=${process.env.API_KEY_TMDB}&language=en-US&page=1`);
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
}

const NowPlaying = async () => {
  const now_playing: iMovie[] = await getNowPlaying();

  return (
    <section className={s.now_playing}>
      <div className={s.header}>
        <h1 className={s.title}>In theatres</h1>
      </div>
      <div className={s.movies_slider}>
        <Slider movies={now_playing} />
      </div>
    </section >
  )
}

export default NowPlaying