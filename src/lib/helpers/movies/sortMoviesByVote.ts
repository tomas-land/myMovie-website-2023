import { iMovie } from '../../interfaces/movie';

export function sortMoviesByVote(movies: iMovie[]) {
  return movies.sort(function (a, b) {
    return b.vote_average - a.vote_average;
  });
}
