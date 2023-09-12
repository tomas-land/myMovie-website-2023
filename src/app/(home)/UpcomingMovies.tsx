async function getUpcomingMovies() {
    const URL_TMDB = 'https://api.themoviedb.org/3/movie/upcoming';
    try {
      const response = await fetch(`${URL_TMDB}?api_key=${process.env.API_KEY_TMDB}&language=en-US&page=1`, { next: { revalidate: 120 } });
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error(error);
    }
  }

const UpcomingMovies =async () => {
    const upcomingMovies = await getUpcomingMovies();
    console.log('first')
  return (
    <div>
            {/* <section className={s.now_playing}>
      <div className={s.header}>
        <h1 className={s.title}>In Theatres</h1>
      </div>
      <div className={s.movies_slider}>
        <Slider movies={nowPlayingMovies} />
      </div>
    </section> */}
    </div>
  )
}

export default UpcomingMovies