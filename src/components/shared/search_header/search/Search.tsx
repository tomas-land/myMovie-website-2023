'use client';
import s from './search.module.scss';
import { BsFillEmojiFrownFill } from 'react-icons/bs';
import { useState, useEffect, useRef, use } from 'react';
import SearchResultItem from '@/components/shared/search_header/search_result_item/SearchResultItem';
import LoadingSpinner from '@/components/shared/loading_spinner/LoadingSpinner';
import { useDebounce } from 'use-debounce';
import { useGlobalContext } from '@/context/GlobalContext';


const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResultsData, setSearchResultsData] = useState<any[]>([]);
  const [isResultsShown, setIsResultsShown] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [query] = useDebounce(searchQuery, 1000);
  const { isInputFocused, setIsSearchOpen, isSearchOpen } = useGlobalContext();

  useEffect(() => {
    if (isInputFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputFocused]);

  useEffect(() => {
    document.addEventListener('mousedown', handleResultsClose);
    if (!searchQuery) {
      setIsResultsShown(false);
    } else {
      fetchSearchResults();
      setIsResultsShown(true);
    }
    return () => {
      document.removeEventListener('mousedown', handleResultsClose);
    };
  }, [query]);

  const handleResultsClose = (e: MouseEvent) => {
    if (searchRef.current && e.target instanceof Node) {
      const isClickInsideResults = searchRef.current.contains(e.target as Node);
      const isClickInsideInput = inputRef.current?.contains(e.target as Node);
      // Check if the click occurred outside the results div and not inside the input
      if (!isClickInsideResults && !isClickInsideInput) {
        // setIsResultsShown(false);
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    }
  };

  const fetchSearchResults = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/search?query=${query}`);
      const { data } = await res.json();
      setSearchResultsData(data.results);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const renderResults = () => {
    if (isLoading) {
      return (
        <div className={s.loading}>
          <LoadingSpinner />
        </div>
      );
    } else if (searchResultsData.length === 0 && !isLoading && searchQuery !== '') {
      return (
        <div className={s.no_results}>
          No results found <BsFillEmojiFrownFill />
        </div>
      );
    } else {
      return searchResultsData.map((result) => <SearchResultItem key={result.id} result={result} />);
    }
  };

  return (
    <>
      {isSearchOpen && (
        <div className={`${s.search}`} ref={searchRef}>
          <input className={s.input} placeholder="Search for a movie, series, actors.." ref={inputRef} value={searchQuery} maxLength={40} onChange={(e) => setSearchQuery(e.target.value)} />
          {isResultsShown && (
            <div className={s.results} >
              {renderResults()}
            </div>
          )}
        </div>)
      }
    </>
  );
};

export default Search;
