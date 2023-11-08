import React from 'react';
import styles from './ShowDetails.module.scss';
import { TShow } from '@/types/show.type';
import Link from "next/link";

interface ShowDetailProps {
  show: TShow;
}

const ShowDetail: React.FC<ShowDetailProps> = ({ show }) => {
  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  return (
    <>
      <div className={styles.showDetailContainer}>
        <div className={styles.imageContainer}>
          <img
            src={show.image?.original || show.image?.medium || '/default-image.png'}
            alt={show.name}
          />
        </div>
        <div className={styles.detailsContainer}>
          <h1>{show.name}</h1>
          <div
            className={styles.summary}
            dangerouslySetInnerHTML={createMarkup(show.summary)}
          />
          <p>Network: {show.network?.name}</p>
          <p>Premiered: {show.premiered}</p>
          <p>Rating: {show.rating.average}</p>
          <p>Language: {show.language}</p>
          <p>Genres: {show.genres.join(', ')}</p>
          <p>Runtime: {show.runtime} minutes</p>
        </div>
        <Link className={styles.homeButton} href="/">
            <img src="/home-icon.svg" alt="Home" />
        </Link>
      </div>
    </>
  );
};

export default ShowDetail;
