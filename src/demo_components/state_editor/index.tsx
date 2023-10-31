import BBAlert, { IPropsBBAlert } from '@/bbalert';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';

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
    console.log('handleChange', key, value);
    setState((prevState: any) => ({ ...prevState, [key]: value }));
  };
  if (!state) return null;

  return (
    <div>
      {Object.entries(state).map(([key, value]) => (
        <div key={key}>
          <label htmlFor={key}>{key}</label>
          <input id={key} type="text" value={value} onChange={(e) => handleChange(key, e.target.value)} />
        </div>
      ))}
    </div>
  );
}
