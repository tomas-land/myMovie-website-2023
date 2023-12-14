import dayjs from 'dayjs';
import { iFavorite } from '../../interfaces/favorite';

export default function sortMovies(data: iFavorite[] | undefined, value: string) {
    switch (value) {
        case 'popularity':
            return data?.sort((a, b) => {
                return b.vote_average - a.vote_average;
            });
        case 'date_added':
            return data?.sort((a, b) => {
                return dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix();
            });
        default:
            return data;
    }
};
