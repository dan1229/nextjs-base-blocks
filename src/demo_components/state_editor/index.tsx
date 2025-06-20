/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styles from './styles.module.scss';

/**
 * PROPS
 *
 * @param {object} stateObject - The state object of the component
 * @param {React.Dispatch<React.SetStateAction<any>>} setStateObject - The state setter of the component
 */
export interface IPropsStateEditor<T> {
  stateObject: T;
  setStateObject: React.Dispatch<React.SetStateAction<T>>;
}

/**
 * StateEditor
 * @param {object} stateObject - The state object of the component
 * @param {function} setStateObject - The state setter of the component
 * @returns {React.ReactElement} - The state editor component
 */
export default function StateEditor<T extends object>({ stateObject, setStateObject }: IPropsStateEditor<T>): React.ReactElement {
  const handleStateChange = (key: keyof T, value: T[keyof T]) => {
    setStateObject((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const renderValue = (key: keyof T, value: T[keyof T]) => {
    if (typeof value === 'boolean') {
      return <input type="checkbox" checked={value} onChange={(e) => handleStateChange(key, e.target.checked as T[keyof T])} />;
    }
    // For other primitive types, use a text input.
    return <input type="text" value={String(value)} onChange={(e) => handleStateChange(key, e.target.value as T[keyof T])} />;
  };

  return (
    <div className={styles.container}>
      {Object.keys(stateObject).map((key) => {
        // A simple blacklist for props that are complex objects or not meant to be edited here.
        if (key === 'children' || key === 'icon' || key === 'extraFooter' || key === 'control') return null;

        const value = stateObject[key as keyof T];
        return (
          <div key={key} className={styles.row}>
            <div className={styles.key}>{key}</div>
            <div className={styles.value}>{renderValue(key as keyof T, value)}</div>
          </div>
        );
      })}
    </div>
  );
}
