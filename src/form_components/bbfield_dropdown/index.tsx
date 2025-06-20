import classnames from 'classnames';
import React from 'react';
import { Controller } from 'react-hook-form';
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
  const { options, fieldName, required, autocomplete, onChange, size = 'md', control, value } = Props;

  const getAutoComplete = (): string => {
    if (autocomplete) return autocomplete;
    return fieldName;
  };

  /**
   * RENDER
   */
  return (
    <InputWrapper {...Props}>
      <Controller
        name={fieldName}
        control={control}
        defaultValue={value || ''}
        render={({ field }) => (
          <select
            {...field}
            className={classnames(styles.form_control, styles[size])}
            id={fieldName}
            autoComplete={getAutoComplete()}
            required={required}
            onChange={(e) => {
              field.onChange(e);
              if (onChange) onChange(e);
            }}
          >
            {options.map((val: IBBFieldDropdownOptions) => (
              <option key={val.value} value={val.value}>
                {val.label}
              </option>
            ))}
          </select>
        )}
      />
    </InputWrapper>
  );
}
