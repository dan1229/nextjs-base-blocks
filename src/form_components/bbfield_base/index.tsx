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
  type?: TBBFieldBaseTypes;
  autocomplete?: string;
  value?: string | number | string[] | HTMLInputElement | undefined;
  size?: TBBFieldBaseSize;
  error?: FieldError;
}

/**
 * BBFIELD BASE
 */
export default function BBFieldBase(Props: IPropsBBFieldBase & IPropsBBBaseForm): React.ReactElement {
  const { register, fieldName, type, required = false, autocomplete, onChange, value, size = 'md', className } = Props;

  const getAutoComplete = (): string => {
    switch (autocomplete) {
      case 'on':
        return 'on';
      case 'off':
        return 'off';
      default:
        return 'off';
    }
  };

  /**
   * RENDER
   */
  return (
    <InputWrapper {...Props}>
      <input
        className={classnames(styles.form_control, styles[size], className)}
        type={type}
        autoComplete={getAutoComplete()}
        defaultValue={typeof value === 'string' || typeof value === 'number' || Array.isArray(value) ? value : undefined}
        {...(register && register(fieldName, { required, onChange }))}
      />
    </InputWrapper>
  );
}
