import React, { useEffect, useState } from 'react';
import BBButton from '../../bbbutton';
import BBText from '../../bbtext';
import StateEditor from '../state_editor';
import styles from './styles.module.scss';
import type { Dispatch, SetStateAction } from 'react';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stateObject: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  }, [name, isBBModal]);

  return (
    <div className={styles.containerDemoComponent}>
      <BBText size="large">{name}</BBText>
      <div>
        {showComponent &&
          (isBBModal ? (
            React.cloneElement(
              child as React.ReactElement,
              {
                ...stateObject,
                onConfirm: () => setShowComponent(false),
                onDismiss: () => setShowComponent(false),
              },
              <BBText>Test</BBText>
            )
          ) : (
            <div className={styles.containerComponent}>{child}</div>
          ))}
        {isBBModal && (
          <BBButton
            onClick={() => {
              setShowComponent(!showComponent);
            }}
            text={showComponent ? 'Hide' : 'Show'}
          />
        )}
        <hr />
        <StateEditor state={stateObject} setState={setStateObject} />
      </div>
    </div>
  );
}
