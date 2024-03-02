import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import BBCard from '../../bbcard';
import BBText from '../../bbtext';
import InputWrapper from '../input_wrapper';
import styles from './styles.module.scss';
import { IBBFieldSelectCardOptions } from 'src/types';

/**
 * PROPS
 *
 * @param {unknown} control - The control object from react-hook-form.
 * @param {IBBFieldSelectCardOptions[]} options - Options to display.
 * @param {string[] | undefined} selectedInitial - Initial selected options.
 */
export interface IPropsBBFieldSelectMultiple {
  control: unknown;
  options: IBBFieldSelectCardOptions[];
  selectedInitial: string[] | undefined;
}

/**
 * BBFIELD SELECT MULTIPLE
 */
export default function BBFieldSelectMultiple(Props: IPropsBBFieldSelectMultiple & Omit<IPropsBBBaseForm, 'register'>): React.ReactElement {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(selectedInitial || []);

  useEffect(() => {
    if (selectedInitial) {
      setSelectedOptions(selectedInitial);
    }
  }, [selectedInitial]);

  const onChange = (newValue: string[]) => {
    setSelectedOptions(newValue);
  };

  return (
    <InputWrapper fieldName={fieldName} className={className} required={required}>
      <Controller
        control={control}
        name={fieldName}
        defaultValue={selectedInitial || []}
        render={({ field }) => (
          <div className={classnames(styles.containerSelectMultiple, className)}>
            <div className={styles.containerSelectWindow}>
              <BBText bold>Options</BBText>
              {options.map((option) => (
                <CardOption
                  key={option.value}
                  option={option}
                  selected={selectedOptions.includes(option.value)}
                  onClick={() => {
                    const newValue = selectedOptions.includes(option.value)
                      ? selectedOptions.filter((value) => value !== option.value)
                      : [...selectedOptions, option.value];
                    field.onChange(newValue);
                    onChange(newValue);
                  }}
                />
              ))}
            </div>
            <div className={styles.containerSelectWindow}>
              <BBText bold>Selected</BBText>
              {selectedOptions.length ? (
                selectedOptions.map((optionValue) => {
                  const option = options.find((opt) => opt.value === optionValue);
                  return option ? <CardOption key={option.value} option={option} selected={true} onClick={() => {}} /> : null;
                })
              ) : (
                <BBText color="secondary">No options selected</BBText>
              )}
            </div>
          </div>
        )}
      />
    </InputWrapper>
  );
}

function CardOption({ option, selected, onClick }: { option: IBBFieldCardSelectOption; selected: boolean; onClick: () => void }) {
  return (
    <BBCard className={classnames(styles.cardOption, selected && styles.cardOptionSelected)} onClick={onClick}>
      <BBCard.Body>
        <BBText size="small">{option.label}</BBText>
      </BBCard.Body>
    </BBCard>
  );
}
