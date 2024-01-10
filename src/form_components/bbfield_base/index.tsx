import React from 'react';
import InputWrapper from '../input_wrapper';
import type { IPropsBBBaseForm, TBBFieldBaseSize, TBBFieldBaseTypes } from '../../types';
import styles from './styles.module.scss';

/**
 * PROPS
 *
 * @param {TBBFieldBaseTypes=} type - Type of input. Think 'text' or 'textarea'.
 * @param {string=} size - Size of the input. Think 'sm', 'md', or 'lg'.
 */
export interface IPropsBBFieldBase {
  type: TBBFieldBaseTypes;
  size?: TBBFieldBaseSize;
}

/**
 * BBFIELD BASE
 */
export default function BBFieldBase(Props: IPropsBBFieldBase & IPropsBBBaseForm): React.ReactElement {
  const { register, fieldName, type, required = false, autocomplete, onChange, value, size = 'md' } = Props;

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
        className={`${styles.form_control} ${size ? styles[size] : ''}`}
        id={fieldName}
        type={type}
        autoComplete={getAutoComplete()}
        required={required}
        onChange={onChange}
        value={value}
        {...register}
      />
    </InputWrapper>
  );
}
