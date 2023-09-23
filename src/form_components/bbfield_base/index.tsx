import React from 'react';
import InputWrapper from '../input_wrapper';
import type { IPropsBBBaseForm, TBBFieldBaseTypes } from '../../types';

/**
 * PROPS
 *
 * @param {TBBFieldBaseTypes=} type - Type of input. Think 'text' or 'textarea'.
 */
export interface IPropsBBFieldBase {
  type: TBBFieldBaseTypes;
}

/**
 * BBFIELD BASE
 */
export default function BBFieldBase(Props: IPropsBBFieldBase & IPropsBBBaseForm): React.ReactElement {
  const { register, fieldName, type, required = false, autocomplete, onChange, value } = Props;

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
        className="form-control"
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
