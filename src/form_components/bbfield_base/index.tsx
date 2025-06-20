import classnames from 'classnames';
import React from 'react';
import { Controller, FieldError } from 'react-hook-form';
import InputWrapper from '../input_wrapper';
import styles from '../styles.module.scss';
import type { IPropsBBBaseForm, TBBFieldBaseSize, TBBFieldBaseTypes } from '../../types';

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
  const { control, fieldName, type, autocomplete, value, size = 'md', className } = Props;

  const getAutoComplete = (): string => {
    switch (autocomplete) {
      case 'on':
        return 'on';
      case 'off':
        return 'off';
      default:
        return fieldName;
    }
  };

  /**
   * RENDER
   */
  return (
    <InputWrapper {...Props}>
      <Controller
        id={fieldName}
        name={fieldName}
        control={control}
        defaultValue={typeof value === 'string' || typeof value === 'number' || Array.isArray(value) ? value : undefined}
        render={({ field }) => (
          <input
            {...field}
            className={classnames(styles.form_control, styles[size], className)}
            type={type}
            autoComplete={getAutoComplete()}
          />
        )}
      />
    </InputWrapper>
  );
}
