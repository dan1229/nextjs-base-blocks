import React from 'react';
import InputWrapper from '../input_wrapper';
import type { IPropsBBBaseForm, TBBFieldTextType } from '../../types';

/**
 * PROPS
 *
 * @param {TBBFieldTextType=} type - Type of input. Think 'text' or 'textarea'
 */
export interface IPropsBBFieldText {
  type?: TBBFieldTextType;
}

/**
 * BBFIELD TEXT
 */
export default function BBFieldText(Props: IPropsBBFieldText & IPropsBBBaseForm): React.ReactElement {
  const { register, fieldName, required = false, type = 'text', placeholder, autocomplete, onChange } = Props;

  const getAutoComplete = (): string => {
    if (autocomplete) return autocomplete;
    return fieldName;
  };

  /**
   * RENDER
   */
  return (
    <InputWrapper {...Props}>
      {type == 'textarea' ? (
        <textarea
          className="form-control"
          id={fieldName}
          autoComplete={getAutoComplete()}
          required={required}
          placeholder={placeholder}
          onChange={onChange}
          {...register}
        />
      ) : (
        <input
          className="form-control"
          id={fieldName}
          type={type}
          autoComplete={getAutoComplete()}
          required={required}
          placeholder={placeholder}
          onChange={onChange}
          {...register}
        />
      )}
    </InputWrapper>
  );
}
