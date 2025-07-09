import classnames from 'classnames';
import React from 'react';
import BBAlert from '../../bbalert';
import BBText from '../../bbtext';
import BBTooltip from '../../bbtooltip';
import styles from '../styles.module.scss';
import type { IPropsBBBaseForm } from '../../types';
import type { FieldError } from 'react-hook-form';

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
    inputRef,
    required = false,
    register,
  } = props;

  // Check if field is required either through prop or register validation
  const isRequired = required || (register && register.required);

  /**
   * RENDER
   */
  return (
    <div className={classnames(styles.form_group, className)} ref={inputRef}>
      {showLabel && (
        <label htmlFor={fieldName}>
          {getLabel(label, fieldName)}
          {isRequired && <span className={styles.required_indicator}>*</span>}
        </label>
      )}
      {children}
      {error && error.message && <BBAlert variant="danger">{error.message}</BBAlert>}
      {helperText && helperTextType === 'text' && (
        <BBText size="small" color={helperTextColor}>
          {helperText}
        </BBText>
      )}
      {helperText && helperTextType === 'tooltip' && <BBTooltip content={helperText} />}
    </div>
  );
}
