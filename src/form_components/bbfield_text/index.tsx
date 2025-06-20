import classnames from 'classnames';
import React from 'react';
import { Controller } from 'react-hook-form';
import type { IPropsBBBaseForm, TBBFieldTextType } from '../../types';
import InputWrapper from '../input_wrapper';
import styles from '../styles.module.scss';

/**
 * PROPS
 *
 * @param {TBBFieldTextType=} type - Type of input. Think 'text' or 'textarea'
 * @param {React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined} onKeyDown - Optional keyboard event handler for input or textarea
 */
export interface IPropsBBFieldText {
  type?: TBBFieldTextType;
  onKeyDown?: React.KeyboardEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
}

/**
 * BBFIELD TEXT
 */
export default function BBFieldText(
  Props: IPropsBBFieldText & IPropsBBBaseForm
): React.ReactElement {
  const {
    control,
    fieldName,
    type = 'text',
    required = false,
    autocomplete,
    onChange,
    value,
    size = 'md',
    className,
    placeholder,
    onKeyDown
  } = Props;

  const getAutoComplete = (): string => {
    if (autocomplete) return autocomplete;
    return fieldName;
  };

  /**
   * RENDER
   */
  return (
    <InputWrapper {...Props}>
      <Controller
        name={fieldName}
        control={control}
        defaultValue={value || ''}
        render={({ field }) => {
          const sharedProps = {
            ...field,
            className: classnames(styles.form_control, styles[size], className),
            id: fieldName,
            autoComplete: getAutoComplete(),
            required: required,
            placeholder: placeholder,
            onKeyDown: onKeyDown
          };

          if (type === 'textarea') {
            return <textarea {...sharedProps} onChange={onChange} />;
          }
          return <input {...sharedProps} type={type} onChange={onChange} />;
        }}
      />
    </InputWrapper>
  );
}
