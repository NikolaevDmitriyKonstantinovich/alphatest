import React, { FC } from 'react';
import styles from './app-navigate.module.css';
import { CardProps } from 'src/components/app-navigate/app-navigate';
import CurrencyRates from '../../rate-changes/rate-changes';

interface AppNavigateUIProps {
  baseCurrency: string;
}

export const AppNavigateUI: FC = () => (
  <nav className={styles.navigate}>
    <div className='cardList'>
      <div className='currencyList'>
        <CurrencyRates />
      </div>
    </div>
  </nav>
);
