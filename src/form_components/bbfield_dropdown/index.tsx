import classnames from 'classnames';
import React from 'react';
import InputWrapper from '../input_wrapper';
import styles from '../styles.module.scss';
import type { IBBFieldDropdownOptions, IPropsBBBaseForm, TBBFieldBaseSize } from '../../types';

/**
 * PROPS
 *
 * @param {IBBFieldSelectMultipleOptions[]} options - Options to display.
 * @param {string=} size - Size of the input. Think 'sm', 'md', or 'lg'.
 */
export interface IPropsBBFieldDropdown {
  options: IBBFieldDropdownOptions[];
  size?: TBBFieldBaseSize;
}

/**
 * BBFIELD DROPDOWN
 */
export default function BBFieldDropdown(Props: IPropsBBFieldDropdown & IPropsBBBaseForm): React.ReactElement {
  const { register, options, fieldName, required, autocomplete, onChange, size = 'md' } = Props;

  const getAutoComplete = (): string => {
    if (autocomplete) return autocomplete;
    return fieldName;
  };

  /**
   * RENDER
   */
  return (
    <InputWrapper {...Props}>
      <select
        className={classnames(styles.form_control, styles[size])}
        id={fieldName}
        autoComplete={getAutoComplete()}
        {...(register ? register(fieldName, { required, onChange }) : { required, onChange, name: fieldName })}
      >
        {options.map((val: IBBFieldDropdownOptions) => (
          <option key={val.value} value={val.value}>
            {val.label}
          </option>
        ))}
      </select>
    </InputWrapper>
  );
}
