'use client';
import s from './search.module.scss';
import ss from '@/components/shared/custom_input/input.module.scss';
import {BsFillEmojiFrownFill} from 'react-icons/bs';
import { useState, useEffect, useRef } from 'react';
import SearchResultItem from '@/components/homepage/search_result_item/SearchResultItem';
import LoadingSpinner from '@/components/shared/loading_spinner/LoadingSpinner';
import { useDebounce } from 'use-debounce';

////////////
// suspense
const Search = () => {
  const [isSearchFieldExtended, setIsSearchFieldExtended] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResultsData, setSearchResultsData] = useState<any[]>([]);
  const [isResultsShown, setIsResultsShown] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [query] = useDebounce(searchQuery, 1000);

  const handleSearchFieldExtension = () => {
    setIsSearchFieldExtended(true);
  };
  const handleResultsClose = (e: MouseEvent) => {
    if (resultsRef.current && e.target instanceof Node) {
      const isClickInsideResults = resultsRef.current.contains(e.target as Node);
      const isClickInsideInput = inputRef.current?.contains(e.target as Node);
      // Check if the click occurred outside the results div and not inside the input
      if (!isClickInsideResults && !isClickInsideInput) {
        setIsResultsShown(false);
        setSearchQuery('');
        setIsSearchFieldExtended(false);
      }
    }
  };
  const fetchSearchResults = async () => {
    try {
      const res = await fetch(`api/search?query=${query}`);
      const { data } = await res.json();
      setSearchResultsData(data.results);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleResultsClose);

    if (!searchQuery) {
      setIsResultsShown(false);
    } else {
      setIsResultsShown(true);
      setIsLoading(true);
      fetchSearchResults();
    }

    return () => {
      document.removeEventListener('mousedown', handleResultsClose);
    };
  }, [query]);

  const renderResults = () => {
    if (isLoading) {
      return (
        <div className={s.loading_wrapper}>
          <LoadingSpinner />
        </div>
      );
    } else if (searchResultsData.length === 0) {
      return <div className={s.no_results}>No results found <BsFillEmojiFrownFill/></div>;
    } else {
      return searchResultsData.map((result) => <SearchResultItem key={result.id} result={result} />);
    }
  };

  return (
    <div className={`${s.search} ${isSearchFieldExtended ? s.input_extended : ''}`}>
      <input className={ss.input} placeholder="Search for a movie, series, actors..." ref={inputRef} value={searchQuery} maxLength={40} onClick={handleSearchFieldExtension} onChange={(e) => setSearchQuery(e.target.value)} />
      {isResultsShown && (
        <div className={s.results} ref={resultsRef}>
          {renderResults()}
        </div>
      )}
    </div>
  );
};

export default Search;
