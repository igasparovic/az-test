import React from 'react';
import ShowItem from '../ShowItem/ShowItem';
import styles from './SeriesList.module.scss';
import {TShow} from "@/types/show.type";

interface ListProps {
  shows: Array<TShow>;
}

const SeriesList: React.FC<ListProps> = ({ shows }) => {
  return (
    <div className={styles.list}>
      {shows.map((show, index) => (
        <ShowItem key={index} show={show} />
      ))}
    </div>
  );
};

export default SeriesList;
