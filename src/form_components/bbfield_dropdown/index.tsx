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
      <div className={styles.dropdown_wrapper}>
        <select
          className={classnames(styles.form_control, styles[size])}
          id={fieldName}
          required={required}
          autoComplete={getAutoComplete()}
          // if register is not used, apply onChange prop
          // if register is used, let react-hook-form handle all input state via register()
          {...(!register && onChange ? { onChange } : {})}
          {...(register ? register(fieldName) : {})}
        >
          {options.map((val: IBBFieldDropdownOptions) => (
            <option key={val.value} value={val.value}>
              {val.label}
            </option>
          ))}
        </select>
      </div>
    </InputWrapper>
  );
}
