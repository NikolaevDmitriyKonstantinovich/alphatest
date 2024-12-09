import React, { FC } from 'react';
import styles from './app-header.module.css';

import { TAppHeaderUIProps } from './type';
import { Link } from 'react-router-dom';
import Logo from '../../../utils/Logovectr';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <div className={styles.header_content}>
      <Link to='/' className={styles.link_logo}>
        <div className={styles.logo}>
          {/* <img
            className={styles.logo_img}
            src={require('/public/images/logovectr.tsx')}
            alt='logo'
          /> */}
          <Logo />
        </div>
      </Link>
    </div>
  </header>
);
