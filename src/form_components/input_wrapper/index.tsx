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
  
  // Handle empty fieldName
  if (!fieldName) return '';
  
  // Replace all underscores with spaces and split into words
  const words = fieldName.replace(/_/g, ' ').split(' ');
  
  // Capitalize the first letter of each word (handle empty words)
  const capitalizedWords = words.map(word => {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  
  return capitalizedWords.join(' ');
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
    required,
    register,
  } = props;

  // Determine if the field is required from the required prop only
  const isRequired = required || register?.required;

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
