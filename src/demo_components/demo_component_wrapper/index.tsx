import BBAlert, { IPropsBBAlert } from '@/bbalert';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import StateEditor from '../state_editor';

/**
 * IPropsDemoComponent
 * @param {React.ReactNode} children - The children to display
 */
interface IPropsDemoComponent {
  name: string;
  Component: FC<any>;
  stateObject: Record<string, any>;
  setStateObject: Dispatch<SetStateAction<any>>;
}

/**
 * DemoComponent
 * A basic component to help demo components
 */
export default function DemoComponent(Props: IPropsDemoComponent): React.ReactElement | null {
  const { name, Component, stateObject, setStateObject } = Props;

  return (
    <div>
      <h3>{name}</h3>
      <div>
        <Component {...stateObject}>Test</Component>
        <StateEditor state={stateObject} setState={setStateObject} />
      </div>
    </div>
  );
}
