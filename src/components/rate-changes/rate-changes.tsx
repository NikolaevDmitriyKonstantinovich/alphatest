import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchCurrencyRates,
  toggleLike,
  removeCurrency
} from '../../services/slices/currencySlice';
import { RootState, AppDispatch } from '../../services/store';
import CurrencyRatesUI from '../ui/currancy-rates/currancy-rates-ui';

const currencyIcons: Record<string, string> = {
  USD: 'https://flagcdn.com/h40/us.png',
  EUR: 'https://flagcdn.com/h40/eu.png',
  GBP: 'https://flagcdn.com/h40/gb.png',
  JPY: 'https://flagcdn.com/h40/jp.png',
  CAD: 'https://flagcdn.com/h40/ca.png',
  AUD: 'https://flagcdn.com/h40/au.png',
  CHF: 'https://flagcdn.com/h40/ch.png',
  CNY: 'https://flagcdn.com/h40/cn.png',
  SEK: 'https://flagcdn.com/h40/se.png',
  NZD: 'https://flagcdn.com/h40/nz.png'
};

const targetCurrencies = [
  'USD',
  'GBP',
  'JPY',
  'AUD',
  'CAD',
  'CHF',
  'CNY',
  'SEK',
  'NZD'
];
const baseCurrency = 'EUR';

const CurrencyRates: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { rates, loading, error } = useSelector(
    (state: RootState) => state.currency
  );
  const [filter, setFilter] = useState<'all' | 'liked'>('all');

  useEffect(() => {
    if (rates.length === 0) {
      dispatch(fetchCurrencyRates({ baseCurrency, targetCurrencies }));
    }
  }, [baseCurrency, targetCurrencies, dispatch, rates.length]);

  const handleRemove = (id: string) => {
    dispatch(removeCurrency(id));
  };

  const handleLikeToggle = (id: string) => {
    dispatch(toggleLike(id));
  };

  const handleAddCurrency = () => {
    navigate('/create-product');
  };

  const handleNavigateToCurrency = (id: string) => {
    navigate(`/products/${id}`);
  };

  const filteredRates = rates.filter(
    (rate) => filter === 'all' || rate.isLiked
  );

  return (
    <CurrencyRatesUI
      baseCurrency={baseCurrency}
      rates={filteredRates}
      loading={loading}
      error={error}
      filter={filter}
      currencyIcons={currencyIcons}
      onFilterChange={setFilter}
      onRemove={handleRemove}
      onLikeToggle={handleLikeToggle}
      onAddCurrency={handleAddCurrency}
      onNavigateToCurrency={handleNavigateToCurrency}
    />
  );
};

export default CurrencyRates;
