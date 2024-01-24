import { iMovie } from "../interfaces/movie";
import { iTvSeries } from "../interfaces/tv_series";

export default function filterOutMoviesWithAverageAboveZero(movies: iMovie[] | iTvSeries[]) {
    return movies.filter((movie) => movie.vote_average !== undefined && movie.vote_average > 0);
}