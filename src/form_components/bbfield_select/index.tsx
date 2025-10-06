import classnames from 'classnames';
import React from 'react';
import { getClassName } from '../../utils/scss-class-functions';
import InputWrapper from '../input_wrapper';
import styles from '../styles.module.scss';
import type { IBBFieldSelectOptions, IPropsBBBaseForm, TBBFieldBaseSize } from '../../types';

/**
 * PROPS
 *
 * @param {IBBFieldSelectOptions[]} options - Options to display.
 * @param {string=} size - Size of the input. Think 'sm', 'md', or 'lg'.
 */
export interface IPropsBBFieldSelect {
  options: IBBFieldSelectOptions[];
  size?: TBBFieldBaseSize;
}

/**
 * BBFIELD SELECT
 */
export default function BBFieldSelect(Props: IPropsBBFieldSelect & IPropsBBBaseForm): React.ReactElement {
  const { register, options, fieldName, required, autocomplete, onChange, size = 'md' } = Props;

  const getAutoComplete = (): string => {
    if (autocomplete) return autocomplete;
    return fieldName;
  };

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    if (onChange && typeof onChange === 'function') {
      // If onChange is the simple value function, call it with the value
      if (onChange.length === 1) {
        (onChange as (value: string) => void)(event.target.value);
      } else {
        // If onChange is the event handler, call it with the event
        (onChange as React.ChangeEventHandler<HTMLSelectElement>)(event);
      }
    }
  };

  /**
   * RENDER
   */
  return (
    <InputWrapper {...Props}>
      <div className={styles.select_wrapper}>
        <select
          className={classnames(styles.form_control, getClassName(styles, size))}
          id={fieldName}
          required={required}
          onChange={handleChange}
          autoComplete={getAutoComplete()}
          {...register}
        >
          {options.map((val: IBBFieldSelectOptions) => (
            <option key={val.value} value={val.value}>
              {val.label}
            </option>
          ))}
        </select>
      </div>
    </InputWrapper>
  );
}
