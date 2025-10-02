import React from 'react';
import { getClassName } from '../../utils/scss-class-functions';
import BBFieldBase from '../bbfield_base';
import styles from './styles.module.scss';
import type { IPropsBBBaseForm, TBBFieldCheckboxColor, TBBFieldCheckboxSize } from '../../types';

/**
 * PROPS
 *
 * @param {TBBFieldCheckboxColor=} color - Color of the checkbox.
 * @param {TBBFieldCheckboxSize=} size - Size of the checkbox.
 */
export interface IPropsBBFieldCheckbox {
  colorCheckbox?: TBBFieldCheckboxColor;
  size?: TBBFieldCheckboxSize;
}

/**
 * BBFIELD CHECKBOX
 */
export default function BBFieldCheckbox(Props: IPropsBBFieldCheckbox & IPropsBBBaseForm): React.ReactElement {
  const { colorCheckbox = 'secondary', size = 'md' } = Props;
  return <BBFieldBase {...Props} type="checkbox" className={getClassName(styles, colorCheckbox)} size={size} />;
}
