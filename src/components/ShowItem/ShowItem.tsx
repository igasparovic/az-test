import React from 'react';
import Link from 'next/link';
import styles from './ShowItem.module.scss';
import { TShow } from "@/types/show.type";

interface ShowItemProps {
  show: TShow;
}

const ShowItem: React.FC<ShowItemProps> = ({ show }) => {
  const showDetailLink = `show/${show.id}`;

  return (
    <Link className={styles.showItem} href={showDetailLink} passHref>
        <img
          src={show.image?.medium ||'/default-image.png'}
          alt={show.name}
          className={styles.thumbnail}
        />
        <h3 className={styles.title}>{show.name}</h3>
    </Link>
  );
};

export default ShowItem;
