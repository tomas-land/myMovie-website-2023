// import { iMovie } from "../interfaces/movie";
// import { iTvSeries } from "../interfaces/tv_series";

export default function filterOutMoviesWithAverageAboveZero(movies:any) {
    return movies.filter((movie:any) => movie.vote_average !== undefined && movie.vote_average > 0);
}