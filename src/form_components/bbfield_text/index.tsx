import classnames from 'classnames';
import React, { useState } from 'react';
import { getClassName } from '../../utils/scss-class-functions';
import InputWrapper from '../input_wrapper';
import styles from '../styles.module.scss';
import type { IPropsBBBaseForm, TBBFieldTextType } from '../../types';

/**
 * PROPS
 *
 * @param {TBBFieldTextType=} type - Type of input. Think 'text' or 'textarea'
 * @param {React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined} onKeyDown - Optional keyboard event handler for input or textarea
 */
export interface IPropsBBFieldText {
  type?: TBBFieldTextType;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

/**
 * BBFIELD TEXT
 */
export default function BBFieldText(Props: IPropsBBFieldText & IPropsBBBaseForm): React.ReactElement {
  const {
    register,
    fieldName,
    required = false,
    type = 'text',
    placeholder,
    autocomplete,
    onChange,
    size = 'md',
    value,
    onKeyDown,
  } = Props;

  const [showPassword, setShowPassword] = useState(false);

  const getAutoComplete = (): string => {
    if (autocomplete) return autocomplete;
    return fieldName;
  };

  const getInputType = (): string => {
    if (type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return type;
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    if (onChange && typeof onChange === 'function') {
      // If onChange is the simple value function, call it with the value
      if (onChange.length === 1) {
        (onChange as (value: string) => void)(event.target.value);
      } else {
        // If onChange is the event handler, call it with the event
        (onChange as React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>)(event);
      }
    }
  };

  const getInputValue = (): string => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'boolean') return value ? 'true' : 'false';
    if (Array.isArray(value)) return value.join(',');
    return String(value);
  };

  const sharedProps = {
    className: classnames(styles.form_control, getClassName(styles, size)),
    id: fieldName,
    autoComplete: getAutoComplete(),
    required: required,
    placeholder: placeholder,
    onKeyDown: onKeyDown,
    // if register is not used, apply onChange and value props
    // if register is used, let react-hook-form handle all input state via register()
    ...(!register && onChange ? { onChange: handleChange } : {}),
    ...(!register && value !== undefined ? { value: getInputValue() } : {}),
  };

  /**
   * RENDER
   */
  return (
    <InputWrapper {...Props}>
      {type == 'textarea' ? (
        <textarea {...sharedProps} {...register} />
      ) : (
        <div className={type === 'password' ? styles.password_wrapper : undefined}>
          <input {...sharedProps} type={getInputType()} {...register} />
          {type === 'password' && (
            <button
              type="button"
              className={styles.password_toggle}
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          )}
        </div>
      )}
    </InputWrapper>
  );
}
