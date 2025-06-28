import classnames from 'classnames';
import React from 'react';
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

  const getAutoComplete = (): string => {
    if (autocomplete) return autocomplete;
    return fieldName;
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
        <textarea {...sharedProps} {...(register ? register(fieldName) : {})} />
      ) : (
        <input {...sharedProps} type={type} {...(register ? register(fieldName) : {})} />
      )}
    </InputWrapper>
  );
}
