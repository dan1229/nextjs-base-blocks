import BBAlert, { IPropsBBAlert } from '@/bbalert';
import DemoComponent from '@/demo_components/demo_component_wrapper';
import StateEditor from '@/demo_components/state_editor';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';

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

        <DemoComponent name="BBAlert" Component={BBAlert} stateObject={stateBBAlert} setStateObject={setStateBBAlert} />

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
