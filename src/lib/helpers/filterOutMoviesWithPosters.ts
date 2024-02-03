// import { iMovie } from "../interfaces/movie";
// import { iTvSeries } from "../interfaces/tv_series";

export default function filterOutMoviesWithPosters(movies: any) {
    return movies?.filter((movie: any) => movie.poster_path !== null);
}