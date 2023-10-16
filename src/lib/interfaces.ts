export interface iMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  genres?: [{ id: number; name: string }] | undefined;
  id: number;
  budget: number;
  runtime: number;
  revenue: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface iMovieImages {
  backdrops: [aspect_ratio: number, height: number, width: number, file_path: any, vote_average: number, vote_count: number];
}
