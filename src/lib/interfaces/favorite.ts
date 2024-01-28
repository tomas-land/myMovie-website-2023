export interface iFavorite {
    id: string;
    title: string;
    name?: string;
    overview?: string;
    release_date?: string;
    first_air_date?: string;
    poster_path: string;
    vote_average: number;
    userId: string;
    movieId?: string;
    seriesId?: string;
    createdAt: Date;
    blurDataURL?: string;
  }