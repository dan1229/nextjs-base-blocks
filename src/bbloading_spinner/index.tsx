import classNames from 'classnames';
import React from 'react';
import styles from './styles.module.scss';

export type TBBLoadingSpinnerVariants = 'default' | 'double circle' | 'circle bounce' | 'spinning square';
export type TBBLoadingSpinnerSizes = 'sm' | 'md' | 'lg';

export interface IPropsBBLoadingSpinner {
  variant?: TBBLoadingSpinnerVariants;
  className?: string;
  size?: TBBLoadingSpinnerSizes;
}

export default function BBLoadingSpinner(Props: IPropsBBLoadingSpinner): React.ReactElement {
  const { variant = 'default', className, size = 'md' } = Props; // Added size destructuring

  const getLoadingSpinnerClassName = () => {
    switch (variant) {
      case 'double circle':
        return styles.loader_double_circle;
      case 'circle bounce':
        return styles.loader_circle_bounce;
      case 'spinning square':
        return styles.loader_spinning_square;
      case 'default':
      default:
        return classNames(styles.loader_default);
    }
  };

  const getLoadingSpinnerSizeClassName = () => {
    switch (size) {
      case 'sm':
        return styles.loader_sm;
      case 'md':
        return styles.loader_md;
      case 'lg':
        return styles.loader_lg;
    }
  };

  return (
    <div className={styles.containerLoading}>
      <span className={classNames(getLoadingSpinnerClassName(), getLoadingSpinnerSizeClassName(), className)} />
    </div>
  );
}
