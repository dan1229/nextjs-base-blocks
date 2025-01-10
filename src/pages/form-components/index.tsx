import Link from 'next/link';
import React, { useState } from 'react';
import BBLink from '../../bblink';
import BBText from '../../bbtext';
import DemoComponent from '../../demo_components/demo_component';
import BBFieldCheckbox from '../../form_components/bbfield_checkbox';
import BBFieldFile from '../../form_components/bbfield_file';
import BBFieldSelectMultiple from '../../form_components/bbfield_select_multiple';
import BBFieldText from '../../form_components/bbfield_text';
import type { IPropsBBFieldCheckbox } from '../../form_components/bbfield_checkbox';
import type { IPropsBBFieldSelectMultiple } from '../../form_components/bbfield_select_multiple';
import type { IPropsBBFieldText } from '../../form_components/bbfield_text';
import type { IPropsBBBaseForm } from '../../types';

/**
 * FORM COMPONENTS DEMO PAGE
 */
const FormComponentsPage = () => {
  // BB Field Text
  const [stateBBFieldText, setStateBBFieldText] = useState<IPropsBBFieldText & IPropsBBBaseForm>({
    fieldName: 'demo-text',
    required: false,
    label: 'Demo Text Input',
    type: 'text',
    size: 'md',
    placeholder: 'Enter text...',
    className: '',
    onChange: () => {},
  });

  // BB Field Checkbox
  const [stateBBFieldCheckbox, setStateBBFieldCheckbox] = useState<IPropsBBFieldCheckbox & IPropsBBBaseForm>({
    fieldName: 'demo-checkbox',
    required: false,
    label: 'Demo Checkbox',
    className: '',
    onChange: () => {},
    colorCheckbox: 'secondary',
  });

  // BB Field File
  const [stateBBFieldFile, setStateBBFieldFile] = useState<IPropsBBBaseForm>({
    fieldName: 'demo-file',
    required: false,
    label: 'Demo File Upload',
    className: '',
    onChange: () => {},
  });

  // BB Field Select Multiple
  const [stateBBFieldSelectMultiple, setStateBBFieldSelectMultiple] = useState<
    IPropsBBFieldSelectMultiple & Omit<IPropsBBBaseForm, 'register'>
  >({
    fieldName: 'demo-select-multiple',
    required: false,
    label: 'Demo Multi-Select',
    className: '',
    onChange: () => {},
    control: {},
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
    selectedInitial: ['1'],
  });

  /**
   * RENDER
   */
  return (
    <div>
      <div>
        <BBLink href="https://github.com/dan1229/nextjs-base-blocks" size="xxxlarge" external underline={false}>
          NextJS Base Blocks - Form Components
        </BBLink>
      </div>
      <hr />
      <BBText size="xxlarge">Form Components Demo Page</BBText>
      <BBText>
        This page demonstrates the form components available in the Base Blocks library. Each component can be interacted with and its
        properties can be modified in real-time.
      </BBText>
      <div>
        <h3>BB Components</h3>
        <p>
          View <Link href="/">regular components</Link> for more demos!
        </p>
      </div>
      <hr />
      <div>
        <BBText size="xlarge">BB Form Components</BBText>

        <DemoComponent
          name="BBFieldText"
          child={<BBFieldText {...stateBBFieldText} />}
          stateObject={stateBBFieldText}
          setStateObject={setStateBBFieldText}
        />

        <DemoComponent
          name="BBFieldCheckbox"
          child={<BBFieldCheckbox {...stateBBFieldCheckbox} />}
          stateObject={stateBBFieldCheckbox}
          setStateObject={setStateBBFieldCheckbox}
        />

        <DemoComponent
          name="BBFieldFile"
          child={<BBFieldFile {...stateBBFieldFile} />}
          stateObject={stateBBFieldFile}
          setStateObject={setStateBBFieldFile}
        />

        <DemoComponent
          name="BBFieldSelectMultiple"
          child={<BBFieldSelectMultiple {...stateBBFieldSelectMultiple} />}
          stateObject={stateBBFieldSelectMultiple}
          setStateObject={setStateBBFieldSelectMultiple}
        />
      </div>
    </div>
  );
};

export default FormComponentsPage;
