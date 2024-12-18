import { FC, useState } from 'react';
import styles from './main-page.module.css';
import { AppNavigate } from 'src/components/app-navigate';

export const MainPageUI: FC = () => (
  <main className={styles.containerMain}>
    <div className={styles.main_hp}>
      <AppNavigate />
      <div className={styles.main} />
    </div>
  </main>
);
