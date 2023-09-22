import React from 'react'
import InputWrapper from '../input_wrapper'
import type { IPropsBBBaseForm, TBBFieldTextType } from 'src/types'


/**
 * PROPS
 *
 * @param {TBBFieldTextType=} type - Type of input. Think 'text' or 'textarea'.
 * @param {string=} placeholder - Placeholder text.
 */
interface IPropsBBFieldText extends IPropsBBBaseForm {
  type?: TBBFieldTextType
  placeholder?: string
}

/**
 * BBFIELD TEXT
 */
export default function BBFieldText (Props: IPropsBBFieldText): React.ReactElement {
  const { register, fieldName, required = false, type = 'text', placeholder } = Props

  /**
   * RENDER
   */
  return (
    <InputWrapper {...Props}>
      {type == 'textarea'
        ? (
        <textarea
          className="form-control"
          id={fieldName}
          autoComplete={fieldName}
          required={required}
          placeholder={placeholder}
          {...register}
        />
          )
        : (
        <input
          className="form-control"
          id={fieldName}
          type={type}
          autoComplete={fieldName}
          required={required}
          placeholder={placeholder}
          {...register}
        />
          )}
    </InputWrapper>
  )
}
