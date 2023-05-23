import classnames from 'classnames'
import React from 'react'
import { getLabel } from '../helpers/helpers'

type TBBFieldBaseTypes = 'file' | 'checkbox'

/**
 * PROPS
 *
 * @param {any} register - React hook form register function.
 * @param {string} fieldName - Name of the field. Think 'email' or 'name'.
 * @param {TBBFieldBaseTypes} type - Type of input to use
 * @param {string=} fieldLabel - Label for field.
 * @param {boolean=} required - Whether the field is required.
 * @param {string=} className - Any class name to add.
 */
export interface IPropsBBFieldBase {
  register: Object
  fieldName: string
  type: TBBFieldBaseTypes
  fieldLabel?: string
  required?: boolean
  className?: string
}

/**
 * BBFIELD BASE
 */
export default function BBFieldBase (Props: IPropsBBFieldBase): React.ReactElement {
  const { register, fieldName, type, fieldLabel, required = false, className } = Props

  /**
   * RENDER
   */
  return (
    <div className={classnames('form-group', className)}>
      <label htmlFor={fieldName}>{fieldLabel?.length ? fieldName : getLabel(fieldName)}</label>
      <input className="form-control" id={fieldName} type={type} autoComplete={fieldName} required={required} {...register} />
    </div>
  )
}
