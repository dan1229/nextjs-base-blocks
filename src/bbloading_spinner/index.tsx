import React from 'react';
import styles from './styles.module.scss';

/**
 * BBLOADING SPINNER
 */
export default function BBLoadingSpinner(): React.ReactElement {
  /**
   * RENDER
   */
  return (
    <div className={styles.containerLoading}>
      <span className={styles.loader} />
    </div>
  );
}
