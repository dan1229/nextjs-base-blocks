import React, { useState } from 'react';
import StateEditor from '../state_editor';
import styles from './styles.module.scss';
import type { IPropsBBBase } from '../../types';

/**
 * PROPS
 *
 * @param {string} name - The name of the component
 * @param {React.ReactElement} child - The component to render
 * @param {T} stateObject - The state object of the component
 * @param {React.Dispatch<React.SetStateAction<T>>} setStateObject - The state setter of the component
 */
export interface IPropsDemoComponent<T> extends IPropsBBBase {
  name: string;
  child: React.ReactElement;
  stateObject: T;
  setStateObject: React.Dispatch<React.SetStateAction<T>>;
}

/**
 * DemoComponent
 * Renders a component with its state editor
 */
export default function DemoComponent<T extends object>({
  name,
  child,
  stateObject,
  setStateObject,
}: IPropsDemoComponent<T>): React.ReactElement {
  const [showState, setShowState] = useState(false);
  const isBBModal = name === 'BBModal';

  return (
    <div className={styles.container}>
      <div className={styles.containerTopRow}>
        <div className={styles.containerName}>{name}</div>
        <button onClick={() => setShowState(!showState)} className={styles.buttonShowState}>
          {showState ? 'Hide' : 'Show'} State
        </button>
      </div>
      <div className={styles.containerComponent}>
        {isBBModal
          ? React.cloneElement(child, {
              ...stateObject,
              onConfirm: () => alert('Confirmed!'),
              onDismiss: () => {
                const props = child.props as { onDismiss?: () => void };
                if (props.onDismiss && typeof props.onDismiss === 'function') {
                  props.onDismiss();
                }
              },
            })
          : child}
      </div>

      {showState && (
        <div className={styles.containerState}>
          <StateEditor stateObject={stateObject} setStateObject={setStateObject} />
        </div>
      )}
    </div>
  );
}
