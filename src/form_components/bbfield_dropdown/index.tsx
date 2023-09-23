import React from 'react'
import InputWrapper from '../input_wrapper'
import type { IBBFieldDropdownOptions, IPropsBBBaseForm } from '../../types'

/**
 * PROPS
 *
 * @param {IBBFieldSelectMultipleOptions[]} options - Options to display.
 */
interface IPropsBBFieldDropdown {
  options: IBBFieldDropdownOptions[]
}

/**
 * BBFIELD DROPDOWN
 */
export default function BBFieldDropdown (Props: IPropsBBFieldDropdown & IPropsBBBaseForm): React.ReactElement {
  const { register, options, fieldName, required, autocomplete, onChange } = Props

  const getAutoComplete = (): string => {
    if (autocomplete) return autocomplete
    return fieldName
  }

  /**
   * RENDER
   */
  return (
    <InputWrapper {...Props}>
      <select className="form-control" id={fieldName} required={required} onChange={onChange} autoComplete={getAutoComplete()} {...register} >
        {options.map((val: IBBFieldDropdownOptions) => (
          <option key={val.value} value={val.value}>
            {val.label}
          </option>
        ))}
      </select>
    </InputWrapper>
  )
}
