import classnames from 'classnames';
import { useState } from 'react';
import { getLabel } from '../helpers/helpers';

export interface IBBFieldDropdownOptions {
  value: string;
  label: string;
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
  register: Object;
  options: IBBFieldDropdownOptions[];
  fieldName: string;
  className?: string;
}

/**
 * BBFIELD DROPDOWN
 */
export default function BBFieldDropdown(Props: IPropsBBFieldDropdown): React.ReactElement {
  const { register, options, fieldName, className } = Props;
  const [selectedOptions, setSelectedOptions] = useState<IBBFieldDropdownOptions[]>([]);

  const createListOnChange = (list: IBBFieldDropdownOptions[]) => {
    return list.map((option) => {
      return option.value;
    });
  };

  const onClickOption = (option: IBBFieldDropdownOptions, onChange: Function) => {
    const found = selectedOptions.find((selectedOption) => selectedOption.value === option.value);
    const newList = found
      ? selectedOptions.filter((selectedOption) => selectedOption.value !== option.value)
      : [...selectedOptions, option];
    setSelectedOptions(newList);
    onChange(createListOnChange(newList));
  };

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
  );
}
