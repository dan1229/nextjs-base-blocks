import BBAlert, { IPropsBBAlert } from '@/bbalert';
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import StateEditor from '../state_editor';
import BBText from '@/bbtext';
import styles from './styles.module.scss';
import BBButton from '@/bbbutton';

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
  const [showComponent, setShowComponent] = useState<boolean>(true);
  const isBBModal = name === 'BBModal';

  useEffect(() => {
    // if modal, hide by default
    if (isBBModal) {
      setShowComponent(false);
    }
  }, [name]);

  return (
    <div className={styles.containerDemoComponent}>
      <BBText size="xlarge">{name}</BBText>
      <hr />
      <div>
        {showComponent && <div className={styles.containerComponent}>{child}</div>}
        {isBBModal && <BBButton onClick={() => setShowComponent(!showComponent)} text={showComponent ? 'Hide' : 'Show'} />}
        <hr />
        <StateEditor state={stateObject} setState={setStateObject} />
      </div>
    </div>
  );
}
