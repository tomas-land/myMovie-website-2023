import dayjs from 'dayjs';
import { iFavorite } from '../../interfaces/favorite';
import { last30days } from '../../dayJS';

export default function filterMovies(data: iFavorite[] | undefined, value: string, sortOrder?: string) {
    switch (value) {
        case 'recent':
            const recentMovies = data?.filter((movie) => dayjs(movie.createdAt).isAfter(last30days)) || [];
            return recentMovies.sort((a, b) => (sortOrder === 'asc' ? dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix() : dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix()));
        case 'popular':
            const popularMovies = data?.filter((movie) => movie.vote_average > 7) || [];
            return popularMovies.sort((a, b) => (sortOrder === 'asc' ? a.vote_average - b.vote_average : b.vote_average - a.vote_average));
        default:
            return data
    }
};
