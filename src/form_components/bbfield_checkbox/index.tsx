import React from 'react';
import BBFieldBase from '../bbfield_base';
import type { IPropsBBBaseForm, TBBFieldCheckboxColor } from '../../types';
import styles from './styles.module.scss';

/**
 * PROPS
 *
 * @param {TBBFieldCheckboxColor=} color - Color of the checkbox.
 */
export interface IPropsBBFieldCheckbox {
  color?: TBBFieldCheckboxColor;
}

/**
 * BBFIELD CHECKBOX
 */
export default function BBFieldCheckbox(Props: IPropsBBFieldCheckbox & IPropsBBBaseForm): React.ReactElement {
  const { color = 'primary' } = Props;
  return <BBFieldBase {...Props} type="checkbox" className={styles[color]} />;
}
