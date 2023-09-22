import classnames from 'classnames'
import React from 'react'
import { useState } from 'react'
import { type Control, Controller, type FieldValues } from 'react-hook-form'
import BBCard from '../../bbcard'
import BBText from '../../bbtext'
import { getLabel } from '../helpers/helpers'
import styles from './styles.module.scss'
import InputWrapper from '../input_wrapper'
import { IPropsBBBaseForm } from 'src/types'

/**
 * PROPS
 *
 * @param {unknown} control - React hook form control.
 * @param {IBBFieldSelectMultipleOptions[]} options - Options to display.
 * @param {string} fieldName - Name of the field. Think 'email' or 'name'.
 * @param {string[] | undefined} selectedInitial - Initial selected options.
 * @param {string=} className - Any class name to add.
 */
interface IPropsBBFieldSelectMultiple extends IPropsBBBaseForm {
  control: unknown
  options: IBBFieldSelectMultipleOptions[]
  fieldName: string
  selectedInitial: string[] | undefined
  className?: string
}

/**
 * BBFIELD SELECT MULTIPLE
 */
export default function BBFieldSelectMultiple (Props: IPropsBBFieldSelectMultiple): React.ReactElement {
  const { control, options, fieldName, selectedInitial, className } = Props
  const [selectedOptions, setSelectedOptions] = useState<IBBFieldSelectMultipleOptions[]>([])

  const createListOnChange = (list: IBBFieldSelectMultipleOptions[]) => {
    return list.map((option) => {
      return option.value
    })
  }

  const onClickOption = (option: IBBFieldSelectMultipleOptions, onChange: Function) => {
    const found = selectedOptions.find((selectedOption) => selectedOption.value === option.value)
    const newList = found
      ? selectedOptions.filter((selectedOption) => selectedOption.value !== option.value)
      : [...selectedOptions, option]
    setSelectedOptions(newList)
    onChange(createListOnChange(newList))
  }

  /**
   * RENDER
   */
  return (
    <InputWrapper {...Props}>
      <Controller
        control={control as Control<FieldValues>}
        name={fieldName}
        defaultValue={selectedOptions}
        render={({ field: { onChange, ref } }) => {
            if (selectedInitial?.length) {
              const tmp = selectedInitial.map((value) => {
                const option = options.find((option) => option.value === value)
                if (!option) return
                return option
              })
              const filtered = tmp.filter((option) => !!option) as IBBFieldSelectMultipleOptions[]
              setSelectedOptions(filtered)
              onChange(createListOnChange(filtered))
            }

          return (
            <div ref={ref} className={classnames(styles.containerSelectMultiple, className)}>
              <div className={styles.containerSelectWindow}>
                <BBText bold>Options</BBText>
                {options.map((option) => (
                  <CardOption key={`${option.value}-option`} option={option} selected={false} onChange={onChange} onClick={onClickOption} />
                ))}
              </div>
              <div className={styles.containerSelectWindow}>
                <BBText bold>Selected</BBText>
                {selectedOptions.length
                  ? (
                      selectedOptions.map((option) => {
                        return (
                      <CardOption
                        key={`${option.value}-selected`}
                        option={option}
                        selected={true}
                        onChange={onChange}
                        onClick={onClickOption}
                      />
                        )
                      })
                    )
                  : (
                  <BBText color="secondary">No options selected</BBText>
                    )}
              </div>
            </div>
          )
        }}
      />
    </InputWrapper>
  )
}

function CardOption (props: { option: IBBFieldSelectMultipleOptions, selected: boolean, onChange: Function, onClick: Function }) {
  const { option, selected, onClick, onChange } = props
  return (
    <BBCard className={classnames(styles.cardOption, selected ? styles.cardOptionSelected : '')} onClick={() => onClick(option, onChange)}>
      <BBCard.Body>
        <BBText size="small">{option.label}</BBText>
      </BBCard.Body>
    </BBCard>
  )
}
