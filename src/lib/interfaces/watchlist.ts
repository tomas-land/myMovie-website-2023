export interface iWatchlistItem {
    id: string;
    contentId?: string;
    movieId?: string;
    title: string;
    mediaType: "movies" | "tv_series";
    name?: string;
    overview?: string;
    release_date?: string;
    air_date?: string;
    first_air_date?: string;
    poster_path: string;
    vote_average: number;
    userId: string;
    media_id?: string;
    createdAt: Date;
    updatedAt: Date | null;
    blurDataURL?: string;
    episode_run_time?: number[];
    created_by?:[{name:string}];
    rating?: string;
}
