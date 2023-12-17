import dayjs from 'dayjs';
import { iFavorite } from '../../interfaces/favorite';

export default function sortMovies(data: iFavorite[] | undefined, value: string, sortOrder?: string) {
    const sortedData = data?.slice(); // Create a shallow copy to avoid mutating the original array

    switch (value) {
        case 'popularity':
            sortedData?.sort((a, b) => {
                return sortOrder === 'asc' ? a.vote_average - b.vote_average : b.vote_average - a.vote_average;
            });
            break;
        case 'date_added':
            sortedData?.sort((a, b) => {
                return sortOrder === 'asc' ? dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix() : dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix();
            });
            break;
        case 'alphabetical':
            sortedData?.sort((a, b) => {
                return sortOrder === 'asc' ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title);
            });
            break;
        default:
            // If the value is not recognized, return the original data
            return data;
    }

    return sortedData;
}

