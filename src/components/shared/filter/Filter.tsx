"use client"
import { use, useState } from 'react';
import { last30days } from '@/lib/dayJS';
import dayjs from 'dayjs';
import { iFavorite } from '@/lib/interfaces/favorite';
import s from './filter.module.scss';
import filterMovies from '@/lib/helpers/movies/filterMovies';
import sortMovies from '@/lib/helpers/movies/sortMovies';

interface iProps {
    userFavorites: iFavorite[] | undefined;
    onResultChange: (result: iFavorite[]) => void;
}
const Filter = ({ userFavorites, onResultChange }: iProps) => {
    const [filterSelect, setFilterSelect] = useState<string>('select');
    const [sortSelect, setSortSelect] = useState<string>('select');


    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'filterSelect') {
            const resultData = filterMovies(userFavorites, value) || [];
            onResultChange(resultData);
            setFilterSelect(value);
            setSortSelect('select')
        } else if (name === 'sortSelect') {
            const resultData = sortMovies(userFavorites, value) || [];
            onResultChange(resultData);
            setSortSelect(value);
            setFilterSelect('select')
        }
    }

    return (
        <div className={s.filter}>
            <label className={s.label}>Filter by:</label>
                <select className={s.select} name="filterSelect" onChange={handleFilterChange} value={filterSelect}>
                    <option disabled >select</option>
                    <option value="all">all</option>
                    <option value="recent">recent</option>
                    <option value="less_than_5">rating lower than 5</option>
                </select>
            
            <label className={s.label}>Sort by:</label>
                <select className={s.select} name="sortSelect" onChange={handleFilterChange} value={sortSelect}>
                    <option disabled >select</option>
                    <option value="popularity">popularity</option>
                    <option value="date_added">date added</option>
                </select>
            
        </div>
    )
}

export default Filter