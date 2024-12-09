import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCurrency } from '../../services/slices/currencySlice';
import CreateCurrencyUI from '../../components/ui/pages/create-currancy-ui/create-currancy-ui';

const CreateCurrency: React.FC = () => {
  const [currencyCode, setCurrencyCode] = useState<string>('');
  const [currencyRate, setCurrencyRate] = useState<string>('');
  const [errors, setErrors] = useState<{ code?: string; rate?: string }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCodeChange = (code: string) => {
    setCurrencyCode(code);

    if (!/^[A-Z]*$/.test(code)) {
      setErrors((prev) => ({
        ...prev,
        code: 'Код валюты должен содержать только буквы.'
      }));
    } else if (code.length !== 3) {
      setErrors((prev) => ({
        ...prev,
        code: 'Код валюты должен состоять из 3 букв.'
      }));
    } else {
      setErrors((prev) => ({ ...prev, code: undefined }));
    }
  };

  const handleRateChange = (rate: string) => {
    setCurrencyRate(rate);

    if (!/^\d*\.?\d*$/.test(rate)) {
      setErrors((prev) => ({ ...prev, rate: 'Курс должен быть числом.' }));
    } else {
      setErrors((prev) => ({ ...prev, rate: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { code?: string; rate?: string } = {};
    if (!currencyCode) newErrors.code = 'Код валюты обязателен.';
    if (!currencyRate) newErrors.rate = 'Курс обязателен.';
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    dispatch(
      addCurrency({ currency: currencyCode, rate: parseFloat(currencyRate) })
    );

    navigate('/');
  };

  return (
    <CreateCurrencyUI
      currencyCode={currencyCode}
      currencyRate={currencyRate}
      errors={errors}
      onCodeChange={handleCodeChange}
      onRateChange={handleRateChange}
      onSubmit={handleSubmit}
      onGoBack={() => navigate('/')}
    />
  );
};

export default CreateCurrency;
