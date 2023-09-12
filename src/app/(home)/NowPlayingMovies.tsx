
import Slider from '@/components/shared/slider/Slider';
import s from '@/components/homepage/movies_display/movies_display.module.scss'
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

  return (
    <section className={s.movies_display}>
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
