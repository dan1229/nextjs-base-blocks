import React from 'react';
import BBFieldBase from '../bbfield_base';
import styles from './styles.module.scss';
import type { IPropsBBBaseForm, TBBFieldCheckboxColor } from '../../types';

/**
 * PROPS
 *
 * @param {TBBFieldCheckboxColor=} color - Color of the checkbox.
 */
export interface IPropsBBFieldCheckbox {
  colorCheckbox?: TBBFieldCheckboxColor;
}

/**
 * BBFIELD CHECKBOX
 */
export default function BBFieldCheckbox(Props: IPropsBBFieldCheckbox & IPropsBBBaseForm): React.ReactElement {
  const { colorCheckbox = 'secondary' } = Props;
  return <BBFieldBase {...Props} type="checkbox" className={styles[colorCheckbox]} />;
}
