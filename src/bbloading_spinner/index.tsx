import classNames from 'classnames';
import React from 'react';
import styles from './styles.module.scss';
import type { TBBLoadingSpinnerColor, TBBLoadingSpinnerSizes, TBBLoadingSpinnerVariants } from '../types';

export interface IPropsBBLoadingSpinner {
  variant?: TBBLoadingSpinnerVariants;
  size?: TBBLoadingSpinnerSizes;
  color?: TBBLoadingSpinnerColor;
  className?: string;
}

export default function BBLoadingSpinner(Props: IPropsBBLoadingSpinner): React.ReactElement {
  const { variant = 'default', className, size = 'md', color = 'primary' } = Props;

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

  const getColorClassName = () => {
    switch (color) {
      case 'primary':
        return styles.primary;
      case 'secondary':
        return styles.secondary;
      case 'accent':
        return styles.accent;
      case 'danger':
        return styles.danger;
      case 'success':
        return styles.success;
      case 'warning':
        return styles.warning;
      case 'info':
        return styles.info;
      case 'black':
        return styles.black;
      case 'white':
        return styles.white;
      default:
        return styles.primary;
    }
  };

  return (
    <div className={styles.containerLoading}>
      <span
        className={classNames(getLoadingSpinnerClassName(), getLoadingSpinnerSizeClassName(), getColorClassName(), className)}
      />
    </div>
  );
}
