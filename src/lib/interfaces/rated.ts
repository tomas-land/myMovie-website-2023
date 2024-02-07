export interface iRatedItem {
  id: string;
  media_id: string;
  rating: string;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
  mediaType: "movies" | "tv_series";
  createdAt: Date;
  updatedAt: Date | null;
  userId: string;
  episode_run_time: number[];
  created_by:[{name:string}];
}
