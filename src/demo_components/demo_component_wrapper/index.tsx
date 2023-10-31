import BBAlert, { IPropsBBAlert } from '@/bbalert';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import StateEditor from '../state_editor';

/**
 * IPropsDemoComponent
 * @param {string} name - The name of the component
 * @param {React.ReactNode} child - The component to demo
 * @param {Record<string, any>} stateObject - The state of the component
 * @param {Dispatch<SetStateAction<Record<string, any>>>} setStateObject - The function to set the state of the component
 */
interface IPropsDemoComponent {
  name: string;
  child: React.ReactNode;
  stateObject: Record<string, any>;
  setStateObject: Dispatch<SetStateAction<any>>;
}

/**
 * DemoComponent
 * A basic component to help demo components
 */
export default function DemoComponent(Props: IPropsDemoComponent): React.ReactElement | null {
  const { name, child, stateObject, setStateObject } = Props;
  console.log('stateBBAlert', stateObject);

  return (
    <div>
      <h3>{name}</h3>
      <div>
        {child}
        <StateEditor state={stateObject} setState={setStateObject} />
      </div>
    </div>
  );
}
