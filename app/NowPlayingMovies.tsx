import axios from 'axios';
import s from '@styles/components/now_playing.module.scss';
import iMovie from '@/lib/interfaces';
import Slider from './components/UI/Slider';

export const revalidate = 5;

async function getNowPlayingMovies() {
  const URL_TMDB = 'https://api.themoviedb.org/3/movie/now_playing';
  try {
    // const response = await axios.get(`${URL_TMDB}?api_key=${process.env.API_KEY_TMDB}&language=en-US&page=1`);
    // return response.data.results;
    const response = await fetch(`${URL_TMDB}?api_key=${process.env.API_KEY_TMDB}&language=en-US&page=1`, { next: { revalidate: 120 } });
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
  }
}

const NowPlayingMovies = async () => {
  const nowPlayingMovies = await getNowPlayingMovies();
  //   console.log(nowPlayingMovies);

  return (
    <section className={s.now_playing}>
      <div className={s.header}>
        <h1 className={s.title}>In Theatres</h1>
      </div>
      <div className={s.movies_slider}>
        <Slider movies={nowPlayingMovies} />
      </div>
    </section>
  );
};

export default NowPlayingMovies;
