import classnames from 'classnames';
import React from 'react';
import { Controller } from 'react-hook-form';
import BBCard from '../../bbcard';
import BBText from '../../bbtext';
import type {
  IBBFieldSelectMultipleOptions,
  IPropsBBBaseForm
} from '../../types';
import InputWrapper from '../input_wrapper';
import styles from './styles.module.scss';

/**
 * PROPS
 * @param {IBBFieldSelectMultipleOptions[]} options - The options to display.
 */
export interface IPropsBBFieldSelectMultiple {
  options: IBBFieldSelectMultipleOptions[];
}

/**
 * BBFIELD SELECT MULTIPLE
 */
export default function BBFieldSelectMultiple(
  Props: IPropsBBFieldSelectMultiple & IPropsBBBaseForm
): React.ReactElement {
  const { control, options, fieldName, required, className, value } = Props;

  const onClickOption = (
    option: IBBFieldSelectMultipleOptions,
    onChange: (value: string[]) => void,
    currentValue: string[]
  ) => {
    const found = currentValue.find(
      (selectedOption) => selectedOption === option.value
    );
    const newList = found
      ? currentValue.filter((selectedOption) => selectedOption !== option.value)
      : [...currentValue, option.value];
    onChange(newList);
  };

  /**
   * RENDER
   */
  return (
    <InputWrapper {...Props}>
      <Controller
        name={fieldName}
        control={control}
        rules={{ required }}
        defaultValue={value || []}
        render={({ field: { onChange, ref, value: fieldValue } }) => {
          const currentValues = (fieldValue as string[] | undefined) || [];
          const selectedOptions = options.filter((option) =>
            currentValues.includes(option.value)
          );
          return (
            <div
              ref={ref}
              className={classnames(styles.containerSelectMultiple, className)}
            >
              {/* ALL OPTIONS */}
              <div className={styles.containerSelectWindow}>
                <BBText bold>Options</BBText>
                {options.map((option) => (
                  <CardOption
                    key={`${option.value}-option`}
                    option={option}
                    selected={currentValues.some(
                      (selectedOption) => selectedOption === option.value
                    )}
                    onClick={() =>
                      onClickOption(option, onChange, currentValues)
                    }
                  />
                ))}
              </div>
              {/* SELECTED OPTIONS */}
              <div className={styles.containerSelectWindow}>
                <BBText bold>Selected</BBText>
                {selectedOptions.length === 0 && (
                  <BBText>No options selected</BBText>
                )}
                {selectedOptions.map((option) => (
                  <CardOption
                    key={`${option.value}-selected`}
                    option={option}
                    selected={true}
                    onClick={() =>
                      onClickOption(option, onChange, currentValues)
                    }
                  />
                ))}
              </div>
            </div>
          );
        }}
      />
    </InputWrapper>
  );
}

interface ICardOptionProps {
  option: IBBFieldSelectMultipleOptions;
  selected: boolean;
  onClick: () => void;
}

function CardOption(Props: ICardOptionProps) {
  const { option, selected, onClick } = Props;

  return (
    <BBCard
      className={classnames(
        styles.option,
        selected ? styles.optionSelected : null
      )}
      onClick={onClick}
    >
      <BBText>{option.label}</BBText>
    </BBCard>
  );
}
