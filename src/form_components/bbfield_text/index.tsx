import classnames from 'classnames';
import React from 'react';
import { getLabel } from '../helpers/helpers';

type TBBFieldTextType = 'text' | 'textarea' | 'number' | 'password';

/**
 * PROPS
 *
 * @param {any} register - React hook form register function.
 * @param {string} fieldName - Name of the field. Think 'email' or 'name'.
 * @param {string=} fieldLabel - Label for field.
 * @param {boolean=} required - Whether the field is required.
 * @param {TBBFieldTextType=} type - Type of input. Think 'text' or 'textarea'.
 * @param {string=} placeholder - Placeholder text.
 * @param {string=} className - Any class name to add.
 */
interface IPropsBBFieldText {
  register: Object;
  fieldName: string;
  fieldLabel?: string;
  required?: boolean;
  type?: TBBFieldTextType;
  placeholder?: string;
  className?: string;
}

/**
 * BBFIELD TEXT
 */
export default function BBFieldText(Props: IPropsBBFieldText): React.ReactElement {
  const { register, fieldName, fieldLabel, required = false, type = 'text', placeholder, className } = Props;

  /**
   * RENDER
   */
  return (
    <div className={classnames('form-group', className)}>
      <label htmlFor={fieldName}>{!!fieldLabel?.length ? fieldLabel : getLabel(fieldName)}</label>
      {type == 'textarea' ? (
        <textarea
          className="form-control"
          id={fieldName}
          autoComplete={fieldName}
          required={required}
          placeholder={placeholder}
          {...register}
        />
      ) : (
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
    </div>
  );
}
