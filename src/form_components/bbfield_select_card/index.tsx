import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import BBCard from '../../bbcard';
import BBText from '../../bbtext';
import InputWrapper from '../input_wrapper';
import styles from './styles.module.scss';
import { IBBFieldSelectCardOptions, IPropsBBBaseForm } from 'src/types';

/**
 * PROPS
 *
 * @param {unknown} control - The control object from react-hook-form.
 * @param {IBBFieldSelectCardOptions[]} options - Options to display.
 * @param {string=} selectedInitial - Initial selected options.
 */
export interface IPropsBBFieldSelectCard {
  control: unknown;
  options: IBBFieldSelectCardOptions[];
  selectedInitial?: string;
}

/**
 * BBFIELD SELECT CARD
 */
export default function BBFieldSelectCard(Props: IPropsBBFieldSelectCard & Omit<IPropsBBBaseForm, 'register'>): React.ReactElement {
  const { control, options, fieldName, selectedInitial, required, className } = Props;
  const [selectedOption, setSelectedOption] = useState<string>(selectedInitial || '');

  useEffect(() => {
    if (selectedInitial) {
      setSelectedOption(selectedInitial);
    }
  }, [selectedInitial]);

  const onChange = (newValue: string) => {
    setSelectedOption(newValue);
  };

  return (
    <InputWrapper fieldName={fieldName} className={className} required={required}>
      <Controller
        control={control as Control<FieldValues>}
        name={fieldName}
        defaultValue={selectedInitial || []}
        render={({ field }) => (
          <div className={classnames(styles.containerSelectMultiple, className)}>
            <div className={styles.containerSelectWindow}>
              <BBText bold>Options</BBText>
              {options.map((option: IBBFieldSelectCardOptions) => (
                <CardOption
                  key={option.value}
                  option={option}
                  selected={selectedOption.includes(option.value)}
                  onClick={() => {
                    const newValue = selectedOption === option.value ? '' : option.value;
                    field.onChange(newValue);
                    onChange(newValue);
                  }}
                />
              ))}
            </div>
            <div className={styles.containerSelectWindow}>
              <BBText bold>Selected</BBText>
              {selectedOption.length ? (
                selectedOption === '' ? (
                  <BBText color="secondary">No options selected</BBText>
                ) : (
                  options
                    .filter((option) => selectedOption.includes(option.value))
                    .map((option) => <CardOption key={option.value} option={option} selected={true} onClick={() => {}} />)
                )
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

function CardOption({ option, selected, onClick }: { option: IBBFieldSelectCardOptions; selected: boolean; onClick: () => void }) {
  return (
    <BBCard className={classnames(styles.cardOption, selected && styles.cardOptionSelected)} onClick={onClick}>
      <BBCard.Body>
        <BBText size="small">{option.label}</BBText>
      </BBCard.Body>
    </BBCard>
  );
}
