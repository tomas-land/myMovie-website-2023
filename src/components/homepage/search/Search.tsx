'use client';
import { useRouter } from 'next/navigation';
import s from './search.module.scss';
import ss from '@/components/shared/custom_input/input.module.scss';
import { useState, useEffect, useRef } from 'react';
import SearchResultItem from '@/components/homepage/search_result_item/SearchResultItem';
import LoadingSpinner from '@/components/shared/loading_spinner/LoadingSpinner';
////////////
// NOTE: // debounce
const Search = () => {
  const [isSeachFieldExtended, setIsSearchFieldExtended] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResultsData, setSearchResultsData] = useState<any[]>([]);
  const [isResultsShown, setIsResultsShown] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

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

  useEffect(() => {
    document.addEventListener('mousedown', handleResultsClose);
    if (!searchQuery) {
      setIsResultsShown(false);
      return;
    }
    setIsResultsShown(true);
    setIsLoading(true);
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(`api/search?query=${searchQuery}`);
        const { data } = await res.json();
        setSearchResultsData(data.results);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
      // const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY_TMDB}query=${searchQuery}&include_adult=false&language=en-US&page=1`);
      // const data = await res.json();
      // console.log(data);
    };
    // router.push(`/search/${searchQuery}`);
    fetchSearchResults();
    return () => {
      document.removeEventListener('mousedown', handleResultsClose);
    };
  }, [searchQuery]);

  return (
    <div className={`${s.search} ${isSeachFieldExtended ? s.input_extended : null}`}>
      <input className={ss.input} placeholder="Search for a movie, series, actors..." ref={inputRef} value={searchQuery} maxLength={40} onClick={handleSearchFieldExtension} onChange={(e) => setSearchQuery(e.target.value)} />
      {isResultsShown ? (
        <div className={s.results} ref={resultsRef}>
          {isLoading ? (
            <div className={s.loading_wrapper}>
              <LoadingSpinner />
            </div>
          ) : (
            searchResultsData.map((result) => <SearchResultItem key={result.id} result={result} />)
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Search;
