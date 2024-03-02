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
 * @param {boolean=} showTitleOptions - Show title options.
 * @param {boolean=} showSelected - Show currently selected option.
 */
export interface IPropsBBFieldSelectCard {
  control: unknown;
  options: IBBFieldSelectCardOptions[];
  selectedInitial?: string;
  showTitleOptions?: boolean;
  showSelected?: boolean;
}

/**
 * BBFIELD SELECT CARD
 */
export default function BBFieldSelectCard(Props: IPropsBBFieldSelectCard & Omit<IPropsBBBaseForm, 'register'>): React.ReactElement {
  const { control, options, fieldName, selectedInitial, required, className, showTitleOptions = true, showSelected = true } = Props;
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
          <div className={styles.containerSelectWindow}>
            {showTitleOptions && <BBText size="small">Options</BBText>}
            <div className={styles.containerOptions}>
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
            {showSelected && <BBText size="small">Selected: {selectedOption.length ? selectedOption : 'Not selected'}</BBText>}
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
