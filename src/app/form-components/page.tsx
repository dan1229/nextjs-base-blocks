'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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
  const { control } = useForm();

  // BB Field Text
  const [stateBBFieldText, setStateBBFieldText] = useState<IPropsBBFieldText & IPropsBBBaseForm>({
    fieldName: 'demo-text',
    control: control,
    required: false,
    label: 'Demo Text Input',
    type: 'text',
    size: 'md',
    placeholder: 'Enter text...',
    className: '',
    helperText: 'This is some helper text!',
    helperTextType: 'text',
  });

  // BB Field Checkbox
  const [stateBBFieldCheckbox, setStateBBFieldCheckbox] = useState<IPropsBBFieldCheckbox & IPropsBBBaseForm>({
    fieldName: 'demo-checkbox',
    control: control,
    required: false,
    label: 'Demo Checkbox',
    className: '',
    colorCheckbox: 'secondary',
    size: 'md',
  });

  // BB Field File
  const [stateBBFieldFile, setStateBBFieldFile] = useState<IPropsBBBaseForm>({
    fieldName: 'demo-file',
    control: control,
    required: false,
    label: 'Demo File Upload',
    className: '',
    size: 'md',
  });

  // BB Field Select Multiple
  const [stateBBFieldSelectMultiple, setStateBBFieldSelectMultiple] = useState<IPropsBBFieldSelectMultiple & IPropsBBBaseForm>({
    fieldName: 'demo-select-multiple',
    control: control,
    required: false,
    label: 'Demo Multi-Select',
    className: '',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
    value: ['1'],
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
          control={control}
        />

        <DemoComponent
          name="BBFieldText (Tooltip Helper)"
          child={<BBFieldText {...{ ...stateBBFieldText, helperTextType: 'tooltip', helperText: 'This helper text is a tooltip!' }} />}
          stateObject={{ ...stateBBFieldText, helperTextType: 'tooltip', helperText: 'This helper text is a tooltip!' }}
          setStateObject={setStateBBFieldText}
          control={control}
        />

        <DemoComponent
          name="BBFieldCheckbox"
          child={<BBFieldCheckbox {...stateBBFieldCheckbox} />}
          stateObject={stateBBFieldCheckbox}
          setStateObject={setStateBBFieldCheckbox}
          control={control}
        />

        <DemoComponent
          name="BBFieldFile"
          child={<BBFieldFile {...stateBBFieldFile} />}
          stateObject={stateBBFieldFile}
          setStateObject={setStateBBFieldFile}
          control={control}
        />

        <DemoComponent
          name="BBFieldSelectMultiple"
          child={<BBFieldSelectMultiple {...stateBBFieldSelectMultiple} />}
          stateObject={stateBBFieldSelectMultiple}
          setStateObject={setStateBBFieldSelectMultiple}
          control={control}
        />
      </div>
    </div>
  );
};

export default FormComponentsPage;
