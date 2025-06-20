'use client';
import React, { useState } from 'react';
import BBLink from '../../bblink';
import BBText from '../../bbtext';
import DemoComponent from '../../demo_components/demo_component';
import BBFieldCheckbox from '../../form_components/bbfield_checkbox';
import BBFieldFile from '../../form_components/bbfield_file';
import BBFieldText from '../../form_components/bbfield_text';
import type { IPropsBBFieldCheckbox } from '../../form_components/bbfield_checkbox';
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
    onChange: undefined,
    helperText: 'This is some helper text!',
    helperTextType: 'text',
  });

  // BB Field Checkbox
  const [stateBBFieldCheckbox, setStateBBFieldCheckbox] = useState<IPropsBBFieldCheckbox & IPropsBBBaseForm>({
    fieldName: 'demo-checkbox',
    required: false,
    label: 'Demo Checkbox',
    className: '',
    onChange: undefined,
    colorCheckbox: 'secondary',
    size: 'md',
  });

  // BB Field File
  const [stateBBFieldFile, setStateBBFieldFile] = useState<IPropsBBBaseForm>({
    fieldName: 'demo-file',
    required: false,
    label: 'Demo File Upload',
    className: '',
    onChange: undefined,
    size: 'md',
  });

  // BB Field Select Multiple
  // TODO add back
  //   const [stateBBFieldSelectMultiple, setStateBBFieldSelectMultiple] = useState<
  //     IPropsBBFieldSelectMultiple & Omit<IPropsBBBaseForm, 'register'>
  //   >({
  //     fieldName: 'demo-select-multiple',
  //     required: false,
  //     label: 'Demo Multi-Select',
  //     className: '',
  //     onChange: () => {},
  //     control: {},
  //     options: [
  //       { value: '1', label: 'Option 1' },
  //       { value: '2', label: 'Option 2' },
  //       { value: '3', label: 'Option 3' },
  //     ],
  //     selectedInitial: ['1'],
  //   });

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
        <BBText size="large">BB Components</BBText>
        <BBText>
          View{' '}
          <BBLink asSpan href="/">
            regular components
          </BBLink>{' '}
          for more demos!
        </BBText>
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
          name="BBFieldText (Tooltip Helper)"
          child={<BBFieldText {...{ ...stateBBFieldText, helperTextType: 'tooltip', helperText: 'This helper text is a tooltip!' }} />}
          stateObject={{ ...stateBBFieldText, helperTextType: 'tooltip', helperText: 'This helper text is a tooltip!' }}
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

        {/* TODO not working for some reason */}
        {/* <DemoComponent
          name="BBFieldSelectMultiple"
          child={<BBFieldSelectMultiple {...stateBBFieldSelectMultiple} />}
          stateObject={stateBBFieldSelectMultiple}
          setStateObject={setStateBBFieldSelectMultiple}
        /> */}
      </div>
    </div>
  );
};

export default FormComponentsPage;
