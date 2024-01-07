import React from 'react';
import InputWrapper from '../input_wrapper';
import type { IBBFieldDropdownOptions, IPropsBBBaseForm } from '../../types';

/**
 * PROPS
 *
 * @param {IBBFieldSelectMultipleOptions[]} options - Options to display.
 */
export interface IPropsBBFieldDropdown {
  options: IBBFieldDropdownOptions[];
}

/**
 * BBFIELD DROPDOWN
 */
export default function BBFieldDropdown(Props: IPropsBBFieldDropdown & IPropsBBBaseForm): React.ReactElement {
  const { showLabel, register, options, fieldName, required, autocomplete, onChange, className } = Props;

  const getAutoComplete = (): string => {
    if (autocomplete) return autocomplete;
    return fieldName;
  };

  /**
   * RENDER
   */
  return (
    <div className={classnames('form-group', className)}>
      {showLabel && <label htmlFor={fieldName}>{getLabel(label, fieldName)}</label>}
      <select
        className="form-control"
        id={fieldName}
        required={required}
        onChange={onChange}
        autoComplete={getAutoComplete()}
        {...register}
      >
        {options.map((val: IBBFieldDropdownOptions) => (
          <option key={val.value} value={val.value}>
            {val.label}
          </option>
        ))}
      </select>
    </div>
  );
}
