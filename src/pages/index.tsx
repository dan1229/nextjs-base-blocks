import BBAlert, { IPropsBBAlert } from '@/bbalert';
import React, { useState } from 'react';

// TODO make a component that takes a state and setState
// renders each key of the state as well as it's value
// allows for quick and simple updates - no validation yet at least

const DemoPage = () => {
  // state of components displayed
  const [stateBBAlert, setStateBBAlert] = useState<IPropsBBAlert>();

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
