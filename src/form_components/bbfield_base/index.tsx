import React from 'react'
import { IPropsBBBaseForm, TBBFieldBaseTypes } from 'src/types'
import InputWrapper from '../input_wrapper'

/**
 * PROPS
 * 
 * @param {TBBFieldBaseTypes=} type - Type of input. Think 'text' or 'textarea'.
 */
export interface IPropsBBFieldBase extends IPropsBBBaseForm {
  type: TBBFieldBaseTypes;
}

/**
 * BBFIELD BASE
 */
export default function BBFieldBase (Props: IPropsBBFieldBase): React.ReactElement {
  const { register, fieldName, type, required = false } = Props

  /**
   * RENDER
   */
  return (
    <InputWrapper {...Props}>
      <input className="form-control" id={fieldName} type={type} autoComplete={fieldName} required={required} {...register} />
    </InputWrapper>
  )
}
