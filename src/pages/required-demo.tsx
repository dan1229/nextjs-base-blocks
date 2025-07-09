import React from 'react';
import { useForm } from 'react-hook-form';
import BBText from '../bbtext';
import BBFieldCheckbox from '../form_components/bbfield_checkbox';
import BBFieldDropdown from '../form_components/bbfield_dropdown';
import BBFieldText from '../form_components/bbfield_text';

interface IFormData {
  requiredTextDirect: string;
  requiredTextRegister: string;
  optionalText: string;
  requiredCheckbox: boolean;
  requiredDropdown: string;
}

/**
 * REQUIRED FIELD INDICATOR DEMO PAGE
 */
const RequiredDemoPage = () => {
  const { register, handleSubmit } = useForm<IFormData>();

  const onSubmit = (data: IFormData) => {
    // eslint-disable-next-line no-console
    console.log('Form data:', data);
  };

  const dropdownOptions = [
    { value: '', label: 'Select an option...' },
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  /**
   * RENDER
   */
  return (
    <div style={{ padding: '2rem', maxWidth: '800px' }}>
      <BBText size="xxlarge">Required Field Indicator Demo</BBText>
      <BBText>
        This page demonstrates the required field indicator functionality. Notice the red asterisk (*) next to required field labels.
      </BBText>
      
      <hr style={{ margin: '2rem 0' }} />
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <BBText size="xlarge">Required via Prop</BBText>
        <BBText>These fields are marked as required using the `required` prop directly:</BBText>
        
        <BBFieldText
          fieldName="requiredTextDirect"
          label="Required Text Field (via prop)"
          required={true}
          placeholder="This field is required via prop"
        />
        
        <BBFieldCheckbox
          fieldName="requiredCheckboxDirect"
          label="Required Checkbox (via prop)"
          required={true}
        />
        
        <BBFieldDropdown
          fieldName="requiredDropdownDirect"
          label="Required Dropdown (via prop)"
          required={true}
          options={dropdownOptions}
        />
        
        <hr style={{ margin: '2rem 0' }} />
        
        <BBText size="xlarge">Required via React Hook Form Register</BBText>
        <BBText>These fields are marked as required using react-hook-form&apos;s register validation:</BBText>
        
        <BBFieldText
          fieldName="requiredTextRegister"
          label="Required Text Field (via register)"
          register={register('requiredTextRegister', { required: true })}
          placeholder="This field is required via register"
        />
        
        <hr style={{ margin: '2rem 0' }} />
        
        <BBText size="xlarge">Optional Fields</BBText>
        <BBText>These fields are optional and should NOT show the asterisk:</BBText>
        
        <BBFieldText
          fieldName="optionalText"
          label="Optional Text Field"
          placeholder="This field is optional"
        />
        
        <BBFieldCheckbox
          fieldName="optionalCheckbox"
          label="Optional Checkbox"
        />
        
        <BBFieldDropdown
          fieldName="optionalDropdown"
          label="Optional Dropdown"
          options={dropdownOptions}
        />
        
        <hr style={{ margin: '2rem 0' }} />
        
        <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default RequiredDemoPage;