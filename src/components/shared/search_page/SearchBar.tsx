'use client'

import React from 'react'
import s from './search_bar.module.scss'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

const SearchBar = () => {
    const searchParams = useSearchParams()
    const {replace} = useRouter()
    const pathname = usePathname()
    
    const handleSearch = (searchValue: string) => {
        const params = new URLSearchParams(searchParams)

        if (searchValue) {
            params.set('query', searchValue)
        } else {
            params.delete('query')
        }
        replace(`${pathname}?${params.toString()}`)
    }


    return (
        <div className={s.search_bar}>
            <input className={s.search_input} 
            type="text" 
            placeholder="Search for a movie..." 
            onChange={e => handleSearch(e.target.value)} 
            defaultValue={searchParams.get('query')?.toString()}
            />
        </div>
    )
}

export default SearchBar