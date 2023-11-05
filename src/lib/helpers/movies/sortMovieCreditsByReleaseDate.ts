import { iPersonMovieCredit } from "@/lib/interfaces/person";

export function sortMovieCreditsByReleaseDate(credits: iPersonMovieCredit[]) {
    return credits.sort((a, b) => {
      const releaseDateA = new Date(a.release_date);
      const releaseDateB = new Date(b.release_date);
      return releaseDateB.getTime() - releaseDateA.getTime();
    });
  }