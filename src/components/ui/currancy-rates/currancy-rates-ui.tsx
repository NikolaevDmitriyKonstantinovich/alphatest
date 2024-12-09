import React, { FC } from 'react';
import styles from './currancy-rates-ui.module.css';
import CurrencyItem from '../../../components/currency-item/currency-item';

interface CurrencyRatesUIProps {
  baseCurrency: string;
  rates: {
    id: string;
    currency: string;
    rate: number;
    isLiked: boolean;
  }[];
  loading: boolean;
  error: string | null;
  filter: 'all' | 'liked';
  currencyIcons: Record<string, string>;
  onFilterChange: (filter: 'all' | 'liked') => void;
  onRemove: (id: string) => void;
  onLikeToggle: (id: string) => void;
  onAddCurrency: () => void;
  onNavigateToCurrency: (id: string) => void;
}

const CurrencyRatesUI: FC<CurrencyRatesUIProps> = ({
  baseCurrency,
  rates,
  loading,
  error,
  filter,
  currencyIcons,
  onFilterChange,
  onRemove,
  onLikeToggle,
  onAddCurrency,
  onNavigateToCurrency
}) => {
  if (loading) return <div className={styles.loading}>Загрузка...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.currencyRates}>
      <div className={styles.header}>
        <h2>Курсы валют относительно {baseCurrency}</h2>
        <div className={styles.actions}>
          <select
            className={styles.filter}
            value={filter}
            onChange={(e) => onFilterChange(e.target.value as 'all' | 'liked')}
          >
            <option value='all'>Все</option>
            <option value='liked'>Понравившиеся</option>
          </select>
        </div>
      </div>
      <ul className={styles.currencyList}>
        {rates.map(({ id, currency, rate, isLiked }) => (
          <CurrencyItem
            key={id}
            id={id}
            currency={currency}
            rate={rate}
            isLiked={isLiked}
            onLikeToggle={() => onLikeToggle(id)}
            onRemove={() => onRemove(id)}
            onClick={() => onNavigateToCurrency(id)}
            iconUrl={currencyIcons[currency]}
          />
        ))}
      </ul>
      <div className={styles.addCard} onClick={onAddCurrency}>
        <span className={styles.addCardIcon}>+</span>
      </div>
    </div>
  );
};

export default CurrencyRatesUI;
