import React, { FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../services/store';
import { selectCurrencyById } from '../../../../services/slices/currencySlice';
import styles from './info-currency.module.css';

const InfoCurrency: FC = () => {
  const { id } = useParams<{ id: string }>();

  const currencyInfo = useSelector((state: RootState) =>
    selectCurrencyById(state, id || '')
  );

  if (!id) {
    return (
      <div className={styles.error}>
        <p>Код валюты не указан в URL.</p>
      </div>
    );
  }

  if (!currencyInfo) {
    return (
      <div className={styles.error}>
        <p>Данные о валюте с кодом "{id}" не найдены.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link to='/' className={styles.goBackButton}>
        Назад на главную
      </Link>{' '}
      <h1>Информация о валюте</h1>
      <div className={styles.info}>
        <div className={styles.field}>
          <span className={styles.label}>Код валюты:</span>
          <span className={styles.value}>{currencyInfo.currency}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Курс к евро:</span>
          <span className={styles.value}>{currencyInfo.rate.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default InfoCurrency;
