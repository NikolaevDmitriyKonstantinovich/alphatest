import React, { FC } from 'react';
import styles from './currency-item.module.css';
import LikeIcon from '../../../public/images/LikeIcon';
import TrashIcon from '../../../public/images/TrashIcon';

interface CurrencyItemProps {
  id: string;
  currency: string;
  rate: number;
  isLiked: boolean;
  onLikeToggle: () => void;
  onRemove: () => void;
  onClick: () => void;
  iconUrl?: string;
}

const CurrencyItem: FC<CurrencyItemProps> = ({
  id,
  currency,
  rate,
  isLiked,
  onLikeToggle,
  onRemove,
  onClick,
  iconUrl
}) => (
  <li className={styles.currencyItem} onClick={onClick}>
    <div className={styles.currencyInfo}>
      {iconUrl && (
        <img
          src={iconUrl}
          alt={`Flag of ${currency}`}
          className={styles.icon}
        />
      )}
      <div>
        <strong>{currency}</strong>: {rate.toFixed(2)}
      </div>
    </div>
    <div className={styles.actions}>
      <button
        className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onLikeToggle();
        }}
        aria-label='Like'
      >
        <LikeIcon liked={isLiked} className={styles.iconLike} />
      </button>
      <button
        className={styles.removeButton}
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        aria-label='Remove'
      >
        <TrashIcon className={styles.iconTrash} />
      </button>
    </div>
  </li>
);

export default CurrencyItem;
