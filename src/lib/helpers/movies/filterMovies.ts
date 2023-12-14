import dayjs from 'dayjs';
import { iFavorite } from '../../interfaces/favorite';
import { last30days } from '../../dayJS';

export default function filterMovies(data: iFavorite[] | undefined, value: string) {
    switch (value) {
        case 'recent':
            return data?.filter((movie) => {
                return dayjs(movie.createdAt).isAfter(last30days);
            });
            case 'less_than_5':
            return data?.filter((movie) => {
                return movie.vote_average < 5;
            });
        case 'all':
            return data;
        default:
            return data;
    }
};
