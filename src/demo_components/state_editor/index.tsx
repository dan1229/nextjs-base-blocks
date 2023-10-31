import BBAlert, { IPropsBBAlert } from '@/bbalert';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import styles from './styles.module.scss';

const BlacklistProps = ['onClick', 'idForm'];

/**
 * IPropsStateEditor
 * @param {Record<string, any>} state - The state to display
 * @param {Dispatch<SetStateAction<Record<string, any>>>} setState - The function to set the state
 */
interface IPropsStateEditor {
  state: Record<string, any> | undefined;
  setState: Dispatch<SetStateAction<any>>;
}

/**
 * StateEditor
 * A basic component to help edit state of a component
 * allows for simple CRUD of said props - no validation or anything
 */
export default function StateEditor(Props: IPropsStateEditor): React.ReactElement | null {
  const { state, setState } = Props;
  const handleChange = (key: string, value: any) => {
    console.log('subKey', key);
    setState((prevState: any) => ({ ...prevState, [key]: value }));
  };
  if (!state) return null;

  return (
    <div className={styles.containerStateEditor}>
      {Object.entries(state).map(([key, value]) => {
        if (BlacklistProps.includes(key)) return null;

        return (
          <div key={key} className={styles.containerField}>
            <label htmlFor={key} className={styles.containerLabel}>
              {key}
            </label>
            {typeof value === 'object' ? (
              <div className={styles.containerObjectInputs}>
                {Object.keys(value).map((subKey) => {
                  return (
                    <div className={styles.containerObjectFieldInput}>
                      <label htmlFor={subKey} className={styles.containerLabel}>
                        {subKey}
                      </label>
                      <input
                        id={subKey}
                        type="text"
                        value={value[subKey]}
                        onChange={(e) => handleChange(key, { ...value, [subKey]: e.target.value })}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <input id={key} type="text" value={value} onChange={(e) => handleChange(key, e.target.value)} />
            )}
          </div>
        );
      })}
    </div>
  );
}
