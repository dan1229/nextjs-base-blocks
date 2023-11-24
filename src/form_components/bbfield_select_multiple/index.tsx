import classnames from 'classnames';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { type Control, Controller, type FieldValues } from 'react-hook-form';
import BBCard from '../../bbcard';
import BBText from '../../bbtext';
import InputWrapper from '../input_wrapper';
import styles from './styles.module.scss';
import type { IBBFieldSelectMultipleOptions, IPropsBBBaseForm } from '../../types';

/**
 * PROPS
 *
 * @param {IBBFieldSelectMultipleOptions[]} options - Options to display.
 * @param {string} fieldName - Name of the field. Think 'email' or 'name'.
 * @param {string[] | undefined} selectedInitial - Initial selected options.
 */
export interface IPropsBBFieldSelectMultiple {
  control: unknown;
  options: IBBFieldSelectMultipleOptions[];
  selectedInitial: string[] | undefined;
}

/**
 * BBFIELD SELECT MULTIPLE
 */
export default function BBFieldSelectMultiple(Props: IPropsBBFieldSelectMultiple & Omit<IPropsBBBaseForm, 'register'>): React.ReactElement {
  const { control, options, fieldName, selectedInitial, required, className } = Props;
  const [selectedOptions, setSelectedOptions] = useState<IBBFieldSelectMultipleOptions[]>([]);

  // handle initial selected options
  useEffect(() => {
    if (selectedInitial?.length) {
      const tmp = selectedInitial.map((value) => {
        const option = options.find((option) => option.value === value);
        if (!option) return;
        return option;
      });
      const filtered = tmp.filter((option) => !!option) as IBBFieldSelectMultipleOptions[];
      setSelectedOptions(filtered);
    }
    // disable so we only run once to handle initial selected options
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createListOnChange = (list: IBBFieldSelectMultipleOptions[]) => {
    return list.map((option) => {
      return option.value;
    });
  };

  const onClickOption = (option: IBBFieldSelectMultipleOptions, onChange: Function) => {
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
    <InputWrapper {...Props}>
      <Controller
        control={control as Control<FieldValues>}
        name={fieldName}
        defaultValue={selectedInitial}
        rules={{ required: required, validate: (value) => (value && value.length > 0) || 'Please select at least one option' }}
        render={({ field: { onChange, ref, value } }) => {
          return (
            <div ref={ref} className={classnames(styles.containerSelectMultiple, className)}>
              {/* ALL OPTIONS */}
              <div className={styles.containerSelectWindow}>
                <BBText bold>Options</BBText>
                {options.map((option) => (
                  <CardOption
                    key={`${option.value}-option`}
                    option={option}
                    selected={selectedOptions.some((selectedOption) => selectedOption.value === option.value)}
                    value={value}
                    onChange={onChange}
                    onClick={onClickOption}
                  />
                ))}
              </div>
              {/* SELECTED */}
              <div className={styles.containerSelectWindow}>
                <BBText bold>Selected</BBText>
                {selectedOptions.length ? (
                  selectedOptions.map((option) => {
                    return (
                      <CardOption
                        key={`${option.value}-selected`}
                        option={option}
                        selected={true}
                        value={value}
                        onChange={onChange}
                        onClick={onClickOption}
                      />
                    );
                  })
                ) : (
                  <BBText color="secondary">No options selected</BBText>
                )}
              </div>
            </div>
          );
        }}
      />
    </InputWrapper>
  );
}

function CardOption(props: {
  option: IBBFieldSelectMultipleOptions;
  selected: boolean;
  value: unknown;
  onChange: Function;
  onClick: Function;
}) {
  const { option, selected, onClick, value, onChange } = props;

  return (
    <BBCard className={classnames(styles.cardOption, selected ? styles.cardOptionSelected : '')} onClick={() => onClick(option, onChange)}>
      <BBCard.Body>
        <BBText size="small">{option.label}</BBText>
      </BBCard.Body>
    </BBCard>
  );
}
