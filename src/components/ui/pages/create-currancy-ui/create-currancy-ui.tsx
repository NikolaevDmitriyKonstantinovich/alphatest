import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './create-currency-ui.module.css';

interface CreateCurrencyUIProps {
  currencyCode: string;
  currencyRate: string;
  errors: { code?: string; rate?: string };
  onCodeChange: (code: string) => void;
  onRateChange: (rate: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onGoBack: () => void;
}

const CreateCurrencyUI: FC<CreateCurrencyUIProps> = ({
  currencyCode,
  currencyRate,
  errors,
  onCodeChange,
  onRateChange,
  onSubmit,
  onGoBack
}) => (
  <div className={styles.container}>
    <button className={styles.goBackButton} onClick={onGoBack}>
      Назад на главную
    </button>
    <h1>Создать валюту</h1>
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor='currencyCode'>Код валюты</label>
        <input
          id='currencyCode'
          type='text'
          value={currencyCode}
          onChange={(e) => onCodeChange(e.target.value.toUpperCase())}
          maxLength={3}
          placeholder='Например, USD'
          className={errors.code ? styles.errorInput : ''}
        />
        {errors.code && <div className={styles.errorText}>{errors.code}</div>}
      </div>
      <div className={styles.field}>
        <label htmlFor='currencyRate'>Курс к евро</label>
        <input
          id='currencyRate'
          type='text'
          value={currencyRate}
          onChange={(e) => onRateChange(e.target.value)}
          placeholder='Например, 54.0'
          className={errors.rate ? styles.errorInput : ''}
        />
        {errors.rate && <div className={styles.errorText}>{errors.rate}</div>}
      </div>
      <button type='submit' className={styles.submitButton}>
        Создать
      </button>
    </form>
  </div>
);

export default CreateCurrencyUI;
