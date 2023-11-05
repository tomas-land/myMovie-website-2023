export interface iPerson {
  biography: string;
  birthday: string;
  deathday?: string | null;
  gender?: number;
  homepage?: string | null;
  id: number;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}

export interface iPersonMovieCredit {
  id: number;
  genre_ids: [];
  poster_path: string;
  release_date: string;
  title: string;
  credit_id: string;
  department: string;
  character: string;
  job: string;
}
