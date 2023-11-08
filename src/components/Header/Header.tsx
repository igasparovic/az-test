import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>
            <a>TV Series Info</a>
        </h1>
      </div>
    </header>
  );
};

export default Header;
