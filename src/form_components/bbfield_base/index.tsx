import classnames from 'classnames';
import React from 'react';
import { getClassName } from '../../utils/scss-class-functions';
import InputWrapper from '../input_wrapper';
import styles from '../styles.module.scss';
import type { IPropsBBBaseForm, TBBFieldBaseSize, TBBFieldBaseTypes } from '../../types';
import type { FieldError } from 'react-hook-form';

/**
 * PROPS
 *
 * @param {TBBFieldBaseTypes=} type - Type of input. Think 'text' or 'textarea'.
 * @param {string=} size - Size of the input. Think 'sm', 'md', or 'lg'.
 */
export interface IPropsBBFieldBase {
  type: TBBFieldBaseTypes;
  size?: TBBFieldBaseSize;
  error?: FieldError;
}

/**
 * BBFIELD BASE
 */
export default function BBFieldBase(Props: IPropsBBFieldBase & IPropsBBBaseForm): React.ReactElement {
  const { register, fieldName, type, required = false, autocomplete, onChange, value, size = 'md', className } = Props;

  const getAutoComplete = (): string => {
    if (autocomplete) return autocomplete;
    return fieldName;
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (onChange && typeof onChange === 'function') {
      // If onChange is the simple value function, call it with the value
      if (onChange.length === 1) {
        (onChange as (value: string) => void)(event.target.value);
      } else {
        // If onChange is the event handler, call it with the event
        (onChange as React.ChangeEventHandler<HTMLInputElement>)(event);
      }
    }
  };

  const getInputValue = (): string => {
    if (value === undefined) return '';
    if (typeof value === 'boolean') return value ? 'true' : 'false';
    if (Array.isArray(value)) return value.join(',');
    return String(value);
  };

  /**
   * RENDER
   */
  return (
    <InputWrapper {...Props}>
      <input
        className={classnames(styles.form_control, getClassName(styles, size), className)}
        id={fieldName}
        type={type}
        autoComplete={getAutoComplete()}
        required={required}
        onChange={handleChange}
        value={getInputValue()}
        {...register}
      />
    </InputWrapper>
  );
}
