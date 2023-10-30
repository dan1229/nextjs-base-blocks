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
const StateEditor: FC<IPropsStateEditor> = ({ state, setState }) => {
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
};

/**
 * DEMO PAGE
 */
const DemoPage = () => {
  // state of components displayed
  const [stateBBAlert, setStateBBAlert] = useState<IPropsBBAlert>({
    children: 'Test',
    size: 'medium',
    variant: 'info',
    elevation: 'none',
    dismissible: true,
    textAlignment: 'left',
    onClick: () => {},
    className: '',
  });

  return (
    <div>
      <div>
        <h1>NextJS Base Blocks</h1>
        <p>Base blocks for NextJS projects.</p>
        {/* TODO fill out description */}
        {/* Add link to Github repo */}
        <p>
          <b>NOTE:</b> Ironically, this page does NOT use Base Blocks components as this page is primarily intended for testing said
          components so we use native HTML to ensure the page itself works as well as possible.
        </p>
        <p>Please reset the page to reset your props.</p>
      </div>
      <div>
        <h2>BB Components</h2>

        <div>
          <h3>BBAlert</h3>
          <div>
            <BBAlert {...stateBBAlert}>Test</BBAlert>
            <StateEditor state={stateBBAlert} setState={setStateBBAlert} />
          </div>
        </div>

        <div>
          <h3>BBButton</h3>
          <div>
            <p>TODO</p>
          </div>
        </div>

        <div>
          <h3>BBCard</h3>
          <div>
            <p>TODO</p>
          </div>
        </div>

        <div>
          <h3>BBLink</h3>
          <div>
            <p>TODO</p>
          </div>
        </div>

        <div>
          <h3>BBLoading Spinner</h3>
          <div>
            <p>TODO</p>
          </div>
        </div>

        <div>
          <h3>BBModal</h3>
          <div>
            <p>TODO</p>
          </div>
        </div>

        <div>
          <h3>BBNavbar</h3>
          <div>
            <p>TODO</p>
          </div>
        </div>

        <div>
          <h3>BBNavbar Item</h3>
          <div>
            <p>TODO</p>
          </div>
        </div>

        <div>
          <h3>BBText</h3>
          <div>
            <p>TODO</p>
          </div>
        </div>
      </div>
      <div>
        <h2>BB Form Components</h2>
        <p>TODO</p>
      </div>
    </div>
  );
};

export default DemoPage;
