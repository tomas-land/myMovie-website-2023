export interface iTvSeries {
  id: string;
  seriesId?: string;
  media_id?: string;
  first_air_date?: string;
  last_air_date?: string;
  air_date?: string;
  episode_run_time?: number[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  created_by?: [{ name: string }];
  production_companies?: [{ name: string; id: number; logo_path: string; origin_country: string }];
  backdrop_path?: string;
  release_date?: string;
  genre_ids?: number[];
  genres?: [{ id: number; name: string }] | undefined;
  name?: string;
  title: string;
  origin_country?: string[];
  original_language?: string;
  original_name?: string;
  overview?: string;
  popularity?: number;
  poster_path: string;
  vote_average: number;
  vote_count?: number;
  imdb_id?: string;
  isFavorite?: boolean;
}

export interface iTvSeriesImage {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface iTvSeriesVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}







