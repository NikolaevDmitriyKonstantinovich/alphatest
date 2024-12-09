import React, { FC } from 'react';

interface TrashIconProps {
  className?: string;
}

const TrashIcon: FC<TrashIconProps> = ({ className }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    className={className}
  >
    <path d='M3 6h18M9 6v12m6-12v12m-9 0a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6H6Z' />
    <path d='M10 6V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2' />
  </svg>
);

export default TrashIcon;
