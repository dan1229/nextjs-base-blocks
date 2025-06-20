import classnames from 'classnames';
import React from 'react';
import { Controller } from 'react-hook-form';
import BBCard from '../../bbcard';
import BBText from '../../bbtext';
import type { IBBFieldSelectCardOptions, IPropsBBBaseForm } from '../../types';
import InputWrapper from '../input_wrapper';
import styles from './styles.module.scss';

/**
 * PROPS
 *
 * @param {unknown} control - The control object from react-hook-form.
 * @param {IBBFieldSelectCardOptions[]} options - Options to display.
 * @param {string=} selectedInitial - Initial selected option.
 * @param {boolean=} showTitleOptions - Whether to show the title 'Options'.
 * @param {boolean=} showSelected - Whether to show the selected option.
 */
export interface IPropsBBFieldSelectCard {
  options: IBBFieldSelectCardOptions[];
  selectedInitial?: string;
  showTitleOptions?: boolean;
  showSelected?: boolean;
}

/**
 * BBFIELD SELECT CARD
 */
export default function BBFieldSelectCard(
  props: IPropsBBFieldSelectCard & IPropsBBBaseForm
): React.ReactElement {
  const {
    control,
    options,
    fieldName,
    selectedInitial,
    showTitleOptions = true,
    showSelected = true
  } = props;

  return (
    <InputWrapper {...props}>
      <Controller
        control={control}
        name={fieldName}
        defaultValue={selectedInitial || ''}
        render={({ field: { onChange, value } }) => (
          <div className={styles.containerSelectWindow}>
            {showTitleOptions && <BBText size="small">Options</BBText>}
            <div className={styles.containerOptions}>
              {options.map((option: IBBFieldSelectCardOptions) => (
                <CardOption
                  key={option.value}
                  option={option}
                  selected={option.value === value}
                  onClick={() => onChange(option.value)} // Update the form's value here
                />
              ))}
            </div>
            {showSelected && (
              <BBText size="small">
                Selected:{' '}
                {options.find((option) => option.value === value)?.label}
              </BBText>
            )}
          </div>
        )}
      />
    </InputWrapper>
  );
}

function CardOption({
  option,
  selected,
  onClick
}: {
  option: IBBFieldSelectCardOptions;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <BBCard
      className={classnames(
        styles.cardOption,
        selected && styles.cardOptionSelected
      )}
      onClick={onClick}
    >
      <BBCard.Body>
        <BBText size="small">{option.label}</BBText>
      </BBCard.Body>
    </BBCard>
  );
}
