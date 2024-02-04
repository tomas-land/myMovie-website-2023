import { iTvSeries } from '@/lib/interfaces/tv_series';
import { iMovie } from '../../interfaces/movie';

export function sortMoviesByVote(movies: iMovie[] | iTvSeries[]) {
  return movies.sort(function (a, b) {
    if (a.vote_average !== undefined && b.vote_average !== undefined) {
      return b.vote_average - a.vote_average;
    }
    return 0;
  });
}
