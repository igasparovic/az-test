'use client'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MazeApi from '@/services/api';
import ShowDetails from "@/components/SeriesDetails/ShowDetails";
import {useNotification} from "@/context/NotificationContext";
import {start} from "repl";

const ShowDetailPage = () => {
  const { showNotification } = useNotification();
  const router = useRouter();
  const { id } = router.query;
  const [show, setShow] = useState(null);

  const fetchShow = async () => {
    const startTime = Date.now();
    await MazeApi.getShowById(parseInt(id as string)).then((response: any) => {
      setShow(response.data);
    });
    const elapsedTime = Date.now() - startTime;
    if (elapsedTime > 100) { // I put this to a very low value to test it easily
      showNotification('Slow network detected!', 'warning');
    }
  }

  useEffect(() => {
    if (id) {
      fetchShow()
    }
  }, [id]);

  if (!show) return <div>Loading...</div>;

  return(
      <ShowDetails show={show} />
  )

};

export default ShowDetailPage;
