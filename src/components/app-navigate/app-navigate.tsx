import React, { FC, memo, useEffect } from 'react';
import { AppNavigateUI } from '../ui/app-navigate';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store';

export interface CardProps {
  _id: number;
  content: string;
  to: string;
}

interface AppNavigateProps {
  onCardSelect: (id: string) => void;
}

export const AppNavigate: FC = memo(() => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div>
      <AppNavigateUI />
    </div>
  );
});
