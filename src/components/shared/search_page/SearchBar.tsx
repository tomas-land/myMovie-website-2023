'use client'
import React from 'react'
import s from './search_bar.module.scss'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { MdClose } from "react-icons/md";

interface iSearchBarProps {
    placeholder: string
}

const SearchBar = ({ placeholder }: iSearchBarProps) => {
    const searchParams = useSearchParams()
    const { replace } = useRouter()
    const pathname = usePathname()
    const [searchValue, setSearchValue] = useState<string>(searchParams.get('query') || '');


    const handleSearch = (searchValue: string) => {
        setSearchValue(searchValue);
        const params = new URLSearchParams(searchParams) // Create a new URLSearchParams object from the current searchParams

        if (searchValue) { // If searchValue is not empty, set the query parameter to the searchValue
            params.set('query', searchValue)
        } else {  // If searchValue is empty, delete the query parameter
            params.delete('query')
        }
        replace(`${pathname}?${params.toString()}`)  // Replace the current url with the new url containing the new search params
    }

    const handleClearSearch = () => {
        setSearchValue('')
        const params = new URLSearchParams(searchParams);
        params.delete('query');
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className={s.search_bar}>
            <div className={s.wrapper}>
                <input className={s.search_input}
                    type="text"
                    placeholder={placeholder}
                    onChange={e => handleSearch(e.target.value)}
                    value={searchValue}
                />
                {searchValue && <button className={s.clear_search_btn} onClick={handleClearSearch}><MdClose size={25} /></button>}
            </div>
        </div>
    )
}

export default SearchBar