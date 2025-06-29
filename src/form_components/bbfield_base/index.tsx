import classnames from 'classnames';
import React from 'react';
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

  /**
   * RENDER
   */
  return (
    <InputWrapper {...Props}>
      <input
        className={classnames(styles.form_control, styles[size], className)}
        id={fieldName}
        type={type}
        autoComplete={getAutoComplete()}
        required={required}
        // if register is not used, apply onChange and value props
        // if register is used, let react-hook-form handle all input state via register()
        {...(!register && onChange ? { onChange } : {})}
        {...(!register && value !== undefined ? { value } : {})}
        {...(register ? register(fieldName) : {})}
      />
    </InputWrapper>
  );
}
