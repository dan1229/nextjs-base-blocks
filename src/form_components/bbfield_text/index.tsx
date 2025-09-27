import classnames from 'classnames';
import React, { useState } from 'react';
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

  const sharedProps = {
    className: classnames(styles.form_control, styles[size]),
    id: fieldName,
    autoComplete: getAutoComplete(),
    required: required,
    placeholder: placeholder,
    onKeyDown: onKeyDown,
    // if register is not used, apply onChange and value props
    // if register is used, let react-hook-form handle all input state via register()
    ...(!register && onChange ? { onChange } : {}),
    ...(!register && value !== undefined ? { value } : {}),
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
