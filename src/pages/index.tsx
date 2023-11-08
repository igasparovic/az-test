'use client'
import {useCallback, useEffect, useState} from "react";
import SearchBar from "@/components/SearchBar/SearchBar";
import MazeApi from "@/services/api";
import SeriesList from "@/components/SeriesList/SeriesList";
import {TShow} from "@/types/show.type";
import {useNotification} from "@/context/NotificationContext";

export default function Index() {
  const { showNotification } = useNotification();
  const [shows, setShows] = useState<TShow[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  /**
   * Fetch a page of shows from the API
   */
  const loadShows = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const startTime = Date.now();
      const res = await MazeApi.getShows(page).then((res: any) => res);
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime > 100) { // I put this to a very low value to test it easily
        showNotification('Slow network detected!', 'warning');
      }
      setShows(prevShows => [...prevShows, ...res.data]);
      setPage(prevPage => prevPage + 1);
      setHasMore(res.data.length > 0);
    } catch (error) {
      showNotification('An error occurred while fetching shows!', 'error');
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  /**
   * Fetch the first page of shows on initial load
   */
  useEffect(() => {
    loadShows();
  }, []);

  /**
   * Fetch more shows when the user scrolls to the bottom of the page
   */
  useEffect(() => {
    const handleScroll = () => {
      const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5)
      loadShows();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadShows]);

  return (
    <>
      <SearchBar />
      <SeriesList shows={shows} />
    </>
  )
}
