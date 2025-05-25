import classnames from 'classnames';
import React from 'react';
import BBText from '../../bbtext';
import styles from '../styles.module.scss';
import type { IPropsBBBaseForm } from '../../types';
import type { FieldError } from 'react-hook-form';
import BBTooltip from '../../bbtooltip';

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
  error?: FieldError;
}

/**
 * INPUT WRAPPER
 */
export default function InputWrapper(props: IPropsInputWrapper & IPropsBBBaseForm): React.ReactElement {
  const {
    label,
    className,
    fieldName,
    showLabel = true,
    children,
    helperText,
    helperTextColor = 'secondary',
    error,
    helperTextType = 'text',
  } = props;

  /**
   * RENDER
   */
  return (
    <div className={classnames(styles.form_group, className)}>
      {showLabel && <label htmlFor={fieldName}>{getLabel(label, fieldName)}</label>}
      {children}
      {error && error.message && (
        <BBText size="small" color="danger">
          {error.message}
        </BBText>
      )}
      {helperText && helperTextType === 'text' && (
        <BBText size="small" color={helperTextColor}>
          {helperText}
        </BBText>
      )}
      {helperText && helperTextType === 'tooltip' && (
        <BBTooltip content={helperText}>
          <span style={{ marginLeft: 6, cursor: 'pointer' }}>?</span>
        </BBTooltip>
      )}
    </div>
  );
}
