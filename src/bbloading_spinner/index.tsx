import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

export type TBBLoadingSpinnerVariants = 'default' | 'double circle' | 'pulse' | 'circle bounce';
/**
 * PROPS
 *
 * @param {TBBLoadingSpinnerVariants=} variant - The variant of the loading spinner
 * @param {string=} className - The additional class name for the loading spinner container
 */
export interface IPropsBBLoadingSpinner {
  variant?: TBBLoadingSpinnerVariants;
  className?: string;
}

/**
 * BBLOADING SPINNER
 */
export default function BBLoadingSpinner(Props: IPropsBBLoadingSpinner): React.ReactElement {
  const { variant = 'default', className } = Props;

  const getLoadingSpinnerClassName = () => {
    switch (variant) {
      case 'double circle':
        return styles.loader_double_circle;
      case 'pulse':
        return styles.loader_pulse;
      case 'circle bounce':
        return styles.loader_circle_bounce;
      case 'default':
      default:
        return classNames(styles.loader_default);
    }
  };

  /**
   * RENDER
   */
  return (
    <div className={styles.containerLoading}>
      <span className={classNames(getLoadingSpinnerClassName(), className)} />
    </div>
  );
}
