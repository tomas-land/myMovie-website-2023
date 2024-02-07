"use client"
import { useState } from 'react';
import { iFavorite } from '@/lib/interfaces/favorite';
import s from './filter.module.scss';
import filterMovies from '@/lib/helpers/movies/filterMovies';
import sortMovies from '@/lib/helpers/movies/sortMovies';
import { BsSortDown, BsSortUp, BsSortAlphaDown, BsSortAlphaDownAlt } from 'react-icons/bs';
import Tooltip from '../tooltip/Tooltip';
import { iWatchlistItem } from '@/lib/interfaces/watchlist';
import { iRatedItem } from '@/lib/interfaces/rated';

interface iProps {
    data: iFavorite[] | iRatedItem[] | iWatchlistItem[] | undefined;
    handleResultChange: (result: iFavorite[] | iWatchlistItem[] | iRatedItem[]) => void;
}

const Filter = ({ data, handleResultChange }: iProps) => {
    const [filterSelect, setFilterSelect] = useState<string>('select');
    const [sortSelect, setSortSelect] = useState<string>('select');
    const [sortOrder, setSortOrder] = useState<string>('desc');
    const [selectName, setSelectName] = useState<string>(''); // for ascending/descending button

    const handleFilterSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'filterSelect') {
            const resultData = filterMovies(data, value) || [];
            console.log(resultData)
            handleResultChange(resultData);
            setFilterSelect(value);
            setSortSelect('select')
        } else if (name === 'sortSelect') {
            const resultData = sortMovies(data, value) || [];
            handleResultChange(resultData);
            setSortSelect(value);
            setFilterSelect('select')
        }
        setSortOrder('desc')
        setSelectName(name);
    }

    const toggleFilterSortOrder = () => {
        const newOrder = sortOrder === 'desc' ? 'asc' : 'desc';
        setSortOrder(newOrder);
        if (selectName === 'filterSelect') {
            const resultData = filterMovies(data, filterSelect, newOrder) || [];
            handleResultChange(resultData);
        } else if (selectName === 'sortSelect') {
            const resultData = sortMovies(data, sortSelect, newOrder) || [];
            handleResultChange(resultData);
        }
    }

    return (
        <div className={s.filter}>
            <div className={s.wrapper}>
                <div className={s.select_wrapper}>
                    <span className={s.label}>Filter by:</span>
                    <select className={s.select} name="filterSelect" onChange={handleFilterSortChange} value={filterSelect}>
                        <option defaultValue={'select'} disabled>select</option>
                        <option value="recent">recent (30 days)</option> {/* recent (date added less than 1 month) */}
                        <option value="popular">popular (higher than 7)</option> {/* popular (popularity more than 7) */}
                    </select>
                </div>
                <div className={s.select_wrapper}>
                    <span className={s.label}>Sort by:</span>
                    <select className={s.select} name="sortSelect" onChange={handleFilterSortChange} value={sortSelect}>
                        <option disabled >select</option>
                        <option value="popularity">popularity</option>
                        <option value="date_added">date added</option>{/* date when added to favorites */}
                        <option value="alphabetical">alphabeticaly</option>
                        { (data as iRatedItem[])?.[0]?.rating ? <option value="rating">rating</option> : null}
                    </select>
                </div>
                <Tooltip tooltipText="Order: Ascending / Descending">
                    <button className={s.order_btn} onClick={toggleFilterSortOrder}>
                        {sortSelect === 'alphabetical' ? (sortOrder === 'desc' ? <BsSortAlphaDown size={25} /> : <BsSortAlphaDownAlt size={25} />) :
                            (sortOrder === 'desc' ? <BsSortDown size={25} /> : <BsSortUp size={25} />)}
                    </button>
                </Tooltip>
            </div>
        </div>
    )
}

export default Filter

// todo: 