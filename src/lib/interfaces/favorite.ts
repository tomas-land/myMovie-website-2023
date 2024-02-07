export interface iFavorite {
  id: string ;
  title: string;
  name?: string;
  overview?: string;
  release_date?: string;
  air_date?: string;
  first_air_date?: string;
  poster_path: string;
  vote_average: number;
  userId: string;
  movieId?: string;
  seriesId?: string;
  createdAt: Date;
  updatedAt: Date | null;
  blurDataURL?: string;
  mediaType: 'movies' | 'tv_series';
  contentId?: string;
  isFavorite?: boolean;
  media_id?: string;
  episode_run_time?: number[];
  created_by?:[{name:string}];
  rating?: string;
}


