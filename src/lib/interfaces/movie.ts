export interface iMovie {
  id: string;
  movieId?: string;
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  genres?: [{ id: number; name: string }] | undefined;
  budget?: number;
  runtime?: number;
  revenue?: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path: string;
  release_date?: string;
  title: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  blurDataURL?: string;
  imdb_id?: string;
  isFavorite?: boolean;
  media_id?: string;
}

export interface iMovieImage {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface iMovieVideo {
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

export interface iMovieGenre {
  id: number;
  name: string;
}