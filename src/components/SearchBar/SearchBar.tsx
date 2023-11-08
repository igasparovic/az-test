import React, { useState } from 'react';
import styles from './SearchBar.module.scss';
import MazeApi from '@/services/api';
import {TShowSearch} from "@/types/show.type";
import Link from "next/link";
import {useNotification} from "@/context/NotificationContext";

const SearchBar = () => {
  const { showNotification } = useNotification();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<TShowSearch[]>([]);

  const handleSearchChange = async (event: any) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length > 1) { // Only search if the user has typed at least 2 characters
      const startTime = Date.now();
      await MazeApi.searchShows(query).then((res: any) => {
        setSearchResults(res.data)
      });
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime > 100) { // I put this to a very low value to test it easily
        showNotification('Slow network detected!', 'warning');
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search for a TV show..."
        className={styles.searchInput}
      />
      {searchResults.length > 0 && (
        <ul className={styles.dropdown}>
          {searchResults.map((result) => (
            <Link href={`/show/${result.show.id}`} key={result.show.id}>
              <li key={result.show.id} className={styles.dropdownItem}>
                <img src={result.show.image ? result.show.image.medium : '/default-image.png'} alt={result.show.name} className={styles.thumbnail} />
                <span className={styles.title}>{result.show.name}</span>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
