export interface iFavorite {
    id: string;
    title: string;
    poster_path: string;
    vote_average: number;
    userId: string;
    movieId?: string;
    seriesId?: string;
    createdAt: Date;
  }