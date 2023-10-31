/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styles from './styles.module.scss';
import type { Dispatch, SetStateAction } from 'react';

const BlacklistProps = ['onClick', 'idForm', 'extraFooter', 'children'];

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
                  const combinedKey = `${key}.${subKey}`;
                  return (
                    <div key={combinedKey} className={styles.containerObjectFieldInput}>
                      <label htmlFor={subKey} className={styles.containerLabel}>
                        {subKey}
                      </label>
                      <input
                        id={combinedKey}
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
