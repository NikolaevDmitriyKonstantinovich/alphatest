import { FC, useState } from 'react';
import styles from './app.module.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import InfoCurrency from '../ui/pages/info-currency/info-currency';
import CreateCurrency from '../../pages/create-currancy/create-currancy';
import { AppHeader } from '../app-header';
import { AppNavigate } from '../app-navigate';
import { AppFooter } from '../app-footer';
import { NotFound404 } from '../../pages/not-fount-404/not-found-404';

const App = () => {
  const location = useLocation();

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<AppNavigate />} />
        <Route path='/products/:id' element={<InfoCurrency />} />
        <Route path='/create-product' element={<CreateCurrency />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      <AppFooter />
    </div>
  );
};

export default App;
