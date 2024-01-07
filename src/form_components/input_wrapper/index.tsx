import classnames from 'classnames';
import React, { useState } from 'react';
import type { IPropsBBBaseForm } from '../../types';

export const getLabel = (label: string | undefined, fieldName: string): string => {
  console.log('getLabel', label, fieldName);
  if (!!label && label.length) return label;
  const fieldNameRes = fieldName.includes('_') ? fieldName.replace('_', ' ') : fieldName;
  return fieldNameRes.charAt(0).toUpperCase() + fieldNameRes.slice(1);
};

/**
 * IProps
 *
 * @props {React.ReactNode} children - Children to render.
 */
export interface IPropsInputWrapper {
  children: React.ReactElement;
}

/**
 * INPUT WRAPPER
 */
export default function InputWrapper(props: IPropsInputWrapper & IPropsBBBaseForm): React.ReactElement {
  const { label, className, fieldName, showLabel = true } = props;
  const { children, ...childProps } = props;
  const [labelRes] = useState<string>(getLabel(label, fieldName));

  /**
   * RENDER
   */
  return (
    <div className={classnames('form-group', className)}>
      {showLabel && <label htmlFor={fieldName}>{labelRes}</label>}
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, childProps);
      })}
    </div>
  );
}
