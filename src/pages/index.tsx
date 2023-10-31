import BBAlert, { IPropsBBAlert } from '@/bbalert';
import BBButton, { IPropsBBButton } from '@/bbbutton';
import BBText from '@/bbtext';
import DemoComponent from '@/demo_components/demo_component_wrapper';
import StateEditor from '@/demo_components/state_editor';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';

/**
 * DEMO PAGE
 */
const DemoPage = () => {
  //
  // REGULAR COMPONENTS
  //
  // BB ALERT
  const [stateBBAlert, setStateBBAlert] = useState<IPropsBBAlert>({
    children: 'Test',
    size: 'medium',
    variant: 'info',
    elevation: 'none',
    dismissible: true,
    textAlignment: 'left',
    className: '',
    onClick: () => alert('You clicked the alert!'),
  });
  // BB Button
  const [stateBBButton, setStateBBButton] = useState<IPropsBBButton>({
    text: 'Test',
    type: 'submit',
    size: 'md',
    variant: 'primary',
    elevation: 'none',
    disabled: false,
    hover: true,
    focus: false,
    showTextOnHover: false,
    icon: {
      icon: 'test',
      align: 'left',
    },
    idForm: '',
    className: '',
    onClick: () => alert('You clicked the button!'),
  });

  return (
    <div>
      <div>
        <BBText size="xxxlarge">NextJS Base Blocks</BBText>
        <BBText size="xlarge">Base blocks for NextJS projects.</BBText>

        {/* TODO write description of page */}
        {/* Add link to Github repo */}
      </div>
      <hr />
      <div>
        <BBText size="xxlarge">BB Components</BBText>
        <DemoComponent name="BBAlert" child={<BBAlert {...stateBBAlert} />} stateObject={stateBBAlert} setStateObject={setStateBBAlert} />
        <DemoComponent
          name="BBButton"
          child={<BBButton {...stateBBButton} />}
          stateObject={stateBBButton}
          setStateObject={setStateBBButton}
        />

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
