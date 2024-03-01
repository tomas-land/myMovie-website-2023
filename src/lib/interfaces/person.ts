export interface iPerson {
  id: number;
  personId?: number;
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  known_for_department: string;
  poster_path: string;
  name: string;
  place_of_birth: string;
  profile_path: string;
  popularity: number;
 
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