import classnames from 'classnames';
import React from 'react';
import styles from '../styles.module.scss';
import type { IPropsBBBaseForm } from '../../types';

export const getLabel = (label: string | undefined, fieldName: string): string => {
  if (!!label && label.length) return label;
  const fieldNameRes = fieldName.includes('_') ? fieldName.replace('_', ' ') : fieldName;
  return fieldNameRes.charAt(0).toUpperCase() + fieldNameRes.slice(1);
};

/**
 * IProps
 *
 * @props {React.ReactNode} children - Children to render.
 */
export interface IPropsInputWrapper {
  children: React.ReactElement;
}

/**
 * INPUT WRAPPER
 */
export default function InputWrapper(props: IPropsInputWrapper & IPropsBBBaseForm): React.ReactElement {
  const { label, className, fieldName, showLabel = true, children } = props;

  /**
   * RENDER
   */
  return (
    <div className={classnames(styles.form_group, className)}>
      {showLabel && <label htmlFor={fieldName}>{getLabel(label, fieldName)}</label>}
      {children}
    </div>
  );
}
