import classnames from 'classnames'
import React from 'react'
import { getLabel } from '../helpers/helpers'
import { IBBBaseFormProps } from 'src/types'


/**
 * BBFIELD BASE
 */
export default function BBFieldBase (Props: IBBBaseFormProps): React.ReactElement {
  const { register, fieldName, type, label, required = false, className } = Props

  /**
   * RENDER
   */
  return (
    <div className={classnames('form-group', className)}>
      <label htmlFor={fieldName}>{!!label?.length ? label : getLabel(fieldName)}</label>
      <input className="form-control" id={fieldName} type={type} autoComplete={fieldName} required={required} {...register} />
    </div>
  )
}
