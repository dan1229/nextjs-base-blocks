import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import BBCard from '../../bbcard';
import BBText from '../../bbtext';
import InputWrapper from '../input_wrapper';
import styles from './styles.module.scss';
import type { IBBFieldSelectCardOptions, IPropsBBBaseForm } from '../../types';
import type { Control, FieldValues } from 'react-hook-form';

/**
 * PROPS
 *
 * @param {unknown} control - The control object from react-hook-form.
 * @param {IBBFieldSelectCardOptions[]} options - Options to display.
 * @param {string=} selectedInitial - Initial selected options.
 * @param {boolean=} showTitleOptions - Show title options.
 * @param {boolean=} showSelected - Show currently selected option.
 * @param {string=} optionWidth - Width of the options.
 */
export interface IPropsBBFieldSelectCard {
  control: unknown;
  options: IBBFieldSelectCardOptions[];
  selectedInitial?: string;
  showTitleOptions?: boolean;
  showSelected?: boolean;
  optionWidth?: string;
}

/**
 * BBFIELD SELECT CARD
 */
export default function BBFieldSelectCard(Props: IPropsBBFieldSelectCard & Omit<IPropsBBBaseForm, 'register'>): React.ReactElement {
  const {
    control,
    options,
    fieldName,
    selectedInitial,
    required,
    className,
    showTitleOptions = true,
    showSelected = true,
    optionWidth = '30%',
  } = Props;
  const selectedInitialOption = selectedInitial ? options.find((option) => option.value === selectedInitial) : undefined;
  const [selectedOption, setSelectedOption] = useState<IBBFieldSelectCardOptions>(
    selectedInitialOption || ({} as IBBFieldSelectCardOptions)
  );

  useEffect(() => {
    if (selectedInitialOption) {
      setSelectedOption(selectedInitialOption);
    }
  }, [selectedInitialOption]);

  const onClickOption = (selectedOption: IBBFieldSelectCardOptions, onChange: Function) => {
    const found = options.find((option) => selectedOption.value === option.value);
    found && setSelectedOption(found);
    onChange(found);
  };

  return (
    <InputWrapper fieldName={fieldName} className={className} required={required}>
      <Controller
        control={control as Control<FieldValues>}
        name={fieldName}
        defaultValue={selectedInitial || []}
        render={() => (
          <div className={styles.containerSelectWindow} style={{ width: optionWidth }}>
            {showTitleOptions && <BBText size="small">Options</BBText>}
            <div className={styles.containerOptions}>
              {options.map((option: IBBFieldSelectCardOptions) => (
                <CardOption
                  key={option.value}
                  option={option}
                  selected={!!selectedOption.value && !!selectedOption.value.includes(option.value)}
                  onClick={onClickOption}
                />
              ))}
            </div>
            {showSelected && <BBText size="small">Selected: {selectedOption.label}</BBText>}
          </div>
        )}
      />
    </InputWrapper>
  );
}

function CardOption({ option, selected, onClick }: { option: IBBFieldSelectCardOptions; selected: boolean; onClick: Function }) {
  return (
    <BBCard className={classnames(styles.cardOption, selected && styles.cardOptionSelected)} onClick={() => onClick}>
      <BBCard.Body>
        <BBText size="small">{option.label}</BBText>
      </BBCard.Body>
    </BBCard>
  );
}
