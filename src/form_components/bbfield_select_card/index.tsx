import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import BBCard from '../../bbcard';
import BBText from '../../bbtext';
import InputWrapper from '../input_wrapper';
import styles from './styles.module.scss';

export interface IBBFieldCardSelectOption {
  value: string;
  label: string;
}

export interface IPropsBBFieldCardSelect {
  control: any;
  options: IBBFieldCardSelectOption[];
  fieldName: string;
  selectedInitial?: string[];
  required?: boolean;
  className?: string;
}

export default function BBFieldCardSelect({
  control,
  options,
  fieldName,
  selectedInitial,
  required,
  className,
}: IPropsBBFieldCardSelect): React.ReactElement {
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
