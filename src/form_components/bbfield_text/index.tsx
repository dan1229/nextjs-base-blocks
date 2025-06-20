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
    type = 'text',
    required = false,
    autocomplete,
    onChange,
    value,
    size = 'md',
    className,
    placeholder,
    onKeyDown,
  } = Props;

  const getAutoComplete = (): string => {
    if (autocomplete) return autocomplete;
    return fieldName;
  };

  const sharedProps = {
    className: classnames(styles.form_control, styles[size], className),
    id: fieldName,
    autoComplete: getAutoComplete(),
    required: required,
    placeholder: placeholder,
    onChange: onChange,
    value: value,
    onKeyDown: onKeyDown,
  };

  /**
   * RENDER
   */
  return (
    <InputWrapper {...Props}>
      {type == 'textarea' ? <textarea {...sharedProps} {...register} /> : <input {...sharedProps} type={type} {...register} />}
    </InputWrapper>
  );
}
