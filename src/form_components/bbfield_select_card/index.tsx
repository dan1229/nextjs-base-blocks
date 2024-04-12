import classnames from 'classnames';
import React from 'react';
import { Controller } from 'react-hook-form';
import BBCard from '../../bbcard';
import BBText from '../../bbtext';
import InputWrapper from '../input_wrapper';
import styles from './styles.module.scss';
import type { IBBFieldSelectCardOptions, IPropsBBBaseForm } from '../../types';
import type { Control, FieldValues } from 'react-hook-form';

export interface IPropsBBFieldSelectCard {
  control: unknown;
  options: IBBFieldSelectCardOptions[];
  selectedInitial?: string;
  showTitleOptions?: boolean;
  showSelected?: boolean;
}

export default function BBFieldSelectCard(Props: IPropsBBFieldSelectCard & Omit<IPropsBBBaseForm, 'register'>): React.ReactElement {
  const { control, options, fieldName, selectedInitial, required, className, showTitleOptions = true, showSelected = true } = Props;

  return (
    <InputWrapper fieldName={fieldName} className={className} required={required}>
      <Controller
        control={control as Control<FieldValues>}
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
            {showSelected && <BBText size="small">Selected: {options.find((option) => option.value === value)?.label}</BBText>}
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
