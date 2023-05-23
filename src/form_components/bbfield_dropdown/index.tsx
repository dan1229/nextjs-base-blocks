import classnames from 'classnames'
import React from 'react'
import { getLabel } from '../helpers/helpers'

export interface IBBFieldDropdownOptions {
  value: string
  label: string
}

/**
 * PROPS
 *
 * @param {any} register - React hook form register function.
 * @param {IBBFieldSelectMultipleOptions[]} options - Options to display.
 * @param {string} fieldName - Name of the field. Think 'email' or 'name'.
 * @param {string=} className - Any class name to add.
 */
interface IPropsBBFieldDropdown {
  register: Object
  options: IBBFieldDropdownOptions[]
  fieldName: string
  className?: string
}

/**
 * BBFIELD DROPDOWN
 */
export default function BBFieldDropdown (Props: IPropsBBFieldDropdown): React.ReactElement {
  const { register, options, fieldName, className } = Props


  /**
   * RENDER
   */
  return (
    <div className={classnames('form-group', className)}>
      <label htmlFor={fieldName}>{getLabel(fieldName)}</label>
      <select className="form-control" id={fieldName} {...register}>
        {options.map((val: IBBFieldDropdownOptions) => (
          <option key={val.value} value={val.value}>
            {val.label}
          </option>
        ))}
      </select>
    </div>
  )
}
