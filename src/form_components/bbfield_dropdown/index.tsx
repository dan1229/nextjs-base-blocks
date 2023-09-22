import classnames from 'classnames'
import React from 'react'
import { IBBFieldDropdownOptions, IPropsBBBaseForm } from 'src/types'
import InputWrapper from '../input_wrapper'

/**
 * PROPS
 *
 * @param {IBBFieldSelectMultipleOptions[]} options - Options to display.
 */
interface IPropsBBFieldDropdown extends IPropsBBBaseForm {
  options: IBBFieldDropdownOptions[]
}

/**
 * BBFIELD DROPDOWN
 */
export default function BBFieldDropdown (Props: IPropsBBFieldDropdown): React.ReactElement {
  const { register, options, fieldName, required } = Props


  /**
   * RENDER
   */
  return (
    <InputWrapper {...Props}>
      <select className="form-control" id={fieldName} {...register} required={required}>
        {options.map((val: IBBFieldDropdownOptions) => (
          <option key={val.value} value={val.value}>
            {val.label}
          </option>
        ))}
      </select>
    </InputWrapper>
  )
}
