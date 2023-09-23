import classnames from 'classnames';
import React, { Children } from 'react';
import type { IPropsBBBaseForm } from '../../types';

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
  const { label, className, fieldName } = props;

  const getLabel = (): string => {
    if (!!label && label.length) return label;
    const fieldNameRes = fieldName.includes('_') ? fieldName.replace('_', ' ') : fieldName;
    return fieldNameRes.charAt(0).toUpperCase() + fieldNameRes.slice(1);
  };

  const { children, ...childProps } = props;

  /**
   * RENDER
   */
  return (
    <div className={classnames('form-group', className)}>
      <label htmlFor={fieldName}>{getLabel()}</label>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { props: childProps });
      })}
    </div>
  );
}
