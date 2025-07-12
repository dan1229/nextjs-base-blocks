import React, { useState } from 'react';
import BBLink from '../../bblink';
import BBText from '../../bbtext';
import DemoComponent from '../../demo_components/demo_component';
import BBFieldCheckbox from '../../form_components/bbfield_checkbox';
import BBFieldFile from '../../form_components/bbfield_file';
import BBFieldSelect from '../../form_components/bbfield_select';
import BBFieldText from '../../form_components/bbfield_text';
import type { IPropsBBFieldCheckbox } from '../../form_components/bbfield_checkbox';
import type { IPropsBBFieldSelect } from '../../form_components/bbfield_select';
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
    helperText: 'This is some helper text!',
    helperTextType: 'text',
  });

  // BB Field Checkbox
  const [stateBBFieldCheckbox, setStateBBFieldCheckbox] = useState<IPropsBBFieldCheckbox & IPropsBBBaseForm>({
    fieldName: 'demo-checkbox',
    required: false,
    label: 'Demo Checkbox',
    className: '',
    onChange: () => {},
    colorCheckbox: 'secondary',
    size: 'md',
  });

  // BB Field File
  const [stateBBFieldFile, setStateBBFieldFile] = useState<IPropsBBBaseForm>({
    fieldName: 'demo-file',
    required: false,
    label: 'Demo File Upload',
    className: '',
    onChange: () => {},
    size: 'md',
  });

  // BB Field Select
  const [stateBBFieldSelect, setStateBBFieldSelect] = useState<IPropsBBFieldSelect & IPropsBBBaseForm>({
    fieldName: 'demo-select',
    required: false,
    label: 'Demo Select',
    className: '',
    onChange: (event) => {
      const selectedValue = event.target.value;
      setStateBBFieldSelect((prevState) => ({
        ...prevState,
        value: selectedValue,
      }));
    },
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
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
          name="BBFieldText (Required)"
          child={
            <BBFieldText {...{ ...stateBBFieldText, fieldName: 'demo-text-required', required: true, label: 'Required Text Input' }} />
          }
          stateObject={{ ...stateBBFieldText, fieldName: 'demo-text-required', required: true, label: 'Required Text Input' }}
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
          name="BBFieldCheckbox (Required)"
          child={
            <BBFieldCheckbox
              {...{ ...stateBBFieldCheckbox, fieldName: 'demo-checkbox-required', required: true, label: 'Required Checkbox' }}
            />
          }
          stateObject={{ ...stateBBFieldCheckbox, fieldName: 'demo-checkbox-required', required: true, label: 'Required Checkbox' }}
          setStateObject={setStateBBFieldCheckbox}
        />

        <DemoComponent
          name="BBFieldFile"
          child={<BBFieldFile {...stateBBFieldFile} />}
          stateObject={stateBBFieldFile}
          setStateObject={setStateBBFieldFile}
        />

        <DemoComponent
          name="BBFieldFile (Required)"
          child={
            <BBFieldFile {...{ ...stateBBFieldFile, fieldName: 'demo-file-required', required: true, label: 'Required File Upload' }} />
          }
          stateObject={{ ...stateBBFieldFile, fieldName: 'demo-file-required', required: true, label: 'Required File Upload' }}
          setStateObject={setStateBBFieldFile}
        />

        <DemoComponent
          name="BBFieldSelect"
          child={<BBFieldSelect {...stateBBFieldSelect} />}
          stateObject={stateBBFieldSelect}
          setStateObject={setStateBBFieldSelect}
        />

        <DemoComponent
          name="BBFieldSelect (Required)"
          child={
            <BBFieldSelect {...{ ...stateBBFieldSelect, fieldName: 'demo-select-required', required: true, label: 'Required Select' }} />
          }
          stateObject={{ ...stateBBFieldSelect, fieldName: 'demo-select-required', required: true, label: 'Required Select' }}
          setStateObject={setStateBBFieldSelect}
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
