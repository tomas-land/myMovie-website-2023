"use client"
import { useState } from 'react';
import { iFavorite } from '@/lib/interfaces/favorite';
import s from './filter.module.scss';
import filterMovies from '@/lib/helpers/movies/filterMovies';
import sortMovies from '@/lib/helpers/movies/sortMovies';
import { BsSortDown, BsSortUp, BsSortAlphaDown, BsSortAlphaDownAlt } from 'react-icons/bs';
import Tooltip from '../tooltip/Tooltip';

interface iProps {
    userFavorites: iFavorite[] | undefined;
    onResultChange: (result: iFavorite[]) => void;
}

const Filter = ({ userFavorites, onResultChange }: iProps) => {
    const [filterSelect, setFilterSelect] = useState<string>('select');
    const [sortSelect, setSortSelect] = useState<string>('select');
    const [sortOrder, setSortOrder] = useState<string>('desc');
    const [selectName, setSelectName] = useState<string>(''); // for ascending/descending button

    const handleFilterSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
        setSortOrder('desc')
        setSelectName(name);
    }

    const toggleFilterSortOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
        const newOrder = sortOrder === 'desc' ? 'asc' : 'desc';
        setSortOrder(newOrder);
        if (selectName === 'filterSelect') {
            const resultData = filterMovies(userFavorites, filterSelect, newOrder) || [];
            onResultChange(resultData);
        } else if (selectName === 'sortSelect') {
            const resultData = sortMovies(userFavorites, sortSelect, newOrder) || [];
            onResultChange(resultData);
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
                        <option value="date_added">date added</option>{/* when added to favorites */}
                        <option value="alphabetical">alphabeticaly</option>
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

// todo: add filter by genre, my rating