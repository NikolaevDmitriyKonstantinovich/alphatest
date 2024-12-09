import React, { FC } from 'react';

interface LikeIconProps {
  liked?: boolean;
  className?: string;
}

const LikeIcon: FC<LikeIconProps> = ({ liked = false, className }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill={liked ? 'red' : 'none'}
    stroke='currentColor'
    strokeWidth='2'
    className={className}
  >
    <path d='M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.04 3 12.54 3.81 13.5 4.97C14.46 3.81 15.96 3 17.5 3C20.58 3 23 5.42 23 8.5C23 13.5 15 21 15 21H12Z' />
  </svg>
);

export default LikeIcon;
