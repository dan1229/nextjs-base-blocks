import React from 'react';
import { useForm } from 'react-hook-form';
import { getLabel } from '../../src/form_components/input_wrapper';
import BBFieldSelectMultiple from '../../src/form_components/bbfield_select_multiple';
import BBFieldText from '../../src/form_components/bbfield_text';
import BBFieldSelect from '../../src/form_components/bbfield_select';
import BBFieldCheckbox from '../../src/form_components/bbfield_checkbox';

// Test component that uses various form fields to test label generation
const FormTestComponent: React.FC<{ fieldName: string; fieldType?: string; customLabel?: string }> = ({ 
  fieldName, 
  fieldType = 'text', 
  customLabel 
}) => {
  const { control, register } = useForm();

  const renderField = () => {
    const commonProps = {
      fieldName,
      control,
      register,
      label: customLabel,
    };

    switch (fieldType) {
      case 'select-multiple':
        return (
          <BBFieldSelectMultiple
            {...commonProps}
            options={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' },
            ]}
            selectedInitial={[]}
          />
        );
      case 'select':
        return (
          <BBFieldSelect
            {...commonProps}
            options={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' },
            ]}
          />
        );
      case 'checkbox':
        return (
          <BBFieldCheckbox
            {...commonProps}
          />
        );
      default:
        return (
          <BBFieldText
            {...commonProps}
          />
        );
    }
  };

  return (
    <form data-testid="test-form" style={{ padding: '20px' }}>
      {renderField()}
    </form>
  );
};

// Component specifically for testing the getLabel function in isolation
const GetLabelTestComponent: React.FC<{ 
  testCases: Array<{ label?: string; fieldName: string; expected: string }> 
}> = ({ testCases }) => {
  return (
    <div data-testid="get-label-results" style={{ padding: '20px' }}>
      {testCases.map((testCase, index) => (
        <div key={index} data-testid={`test-case-${index}`}>
          <div data-testid={`input-${index}`}>
            Field: "{testCase.fieldName}", Label: "{testCase.label || 'undefined'}"
          </div>
          <div data-testid={`result-${index}`}>
            Result: "{getLabel(testCase.label, testCase.fieldName)}"
          </div>
          <div data-testid={`expected-${index}`}>
            Expected: "{testCase.expected}"
          </div>
        </div>
      ))}
    </div>
  );
};

describe('Field Label Generation Tests', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  describe('getLabel Function - Unit Tests', () => {
    it('should handle basic field names correctly', () => {
      const testCases = [
        { fieldName: 'name', expected: 'Name' },
        { fieldName: 'email', expected: 'Email' },
        { fieldName: 'phone', expected: 'Phone' },
        { fieldName: 'address', expected: 'Address' },
      ];

      cy.mount(<GetLabelTestComponent testCases={testCases} />);

      testCases.forEach((testCase, index) => {
        cy.get(`[data-testid="result-${index}"]`).should('contain', `Result: "${testCase.expected}"`);
      });
    });

    it('should handle single underscore field names correctly', () => {
      const testCases = [
        { fieldName: 'first_name', expected: 'First Name' },
        { fieldName: 'last_name', expected: 'Last Name' },
        { fieldName: 'user_email', expected: 'User Email' },
        { fieldName: 'phone_number', expected: 'Phone Number' },
      ];

      cy.mount(<GetLabelTestComponent testCases={testCases} />);

      testCases.forEach((testCase, index) => {
        cy.get(`[data-testid="result-${index}"]`).should('contain', `Result: "${testCase.expected}"`);
      });
    });

    it('should handle multiple underscore field names correctly (bug fix)', () => {
      const testCases = [
        { fieldName: 'location_preference_names', expected: 'Location Preference Names' },
        { fieldName: 'user_profile_picture_url', expected: 'User Profile Picture Url' },
        { fieldName: 'contact_emergency_phone_number', expected: 'Contact Emergency Phone Number' },
        { fieldName: 'billing_address_street_name', expected: 'Billing Address Street Name' },
        { fieldName: 'security_two_factor_auth_enabled', expected: 'Security Two Factor Auth Enabled' },
      ];

      cy.mount(<GetLabelTestComponent testCases={testCases} />);

      testCases.forEach((testCase, index) => {
        cy.get(`[data-testid="result-${index}"]`).should('contain', `Result: "${testCase.expected}"`);
      });
    });

    it('should handle edge cases correctly', () => {
      const testCases = [
        { fieldName: '', expected: '' },
        { fieldName: '_', expected: ' ' },
        { fieldName: '__', expected: '  ' },
        { fieldName: 'a', expected: 'A' },
        { fieldName: '_field', expected: ' Field' },
        { fieldName: 'field_', expected: 'Field ' },
        { fieldName: '__middle__', expected: '  Middle  ' },
      ];

      cy.mount(<GetLabelTestComponent testCases={testCases} />);

      testCases.forEach((testCase, index) => {
        cy.get(`[data-testid="result-${index}"]`).should('contain', `Result: "${testCase.expected}"`);
      });
    });

    it('should handle mixed case field names correctly', () => {
      const testCases = [
        { fieldName: 'firstName', expected: 'Firstname' },
        { fieldName: 'lastName', expected: 'Lastname' },
        { fieldName: 'PHONE_NUMBER', expected: 'Phone Number' },
        { fieldName: 'User_Profile_SETTINGS', expected: 'User Profile Settings' },
      ];

      cy.mount(<GetLabelTestComponent testCases={testCases} />);

      testCases.forEach((testCase, index) => {
        cy.get(`[data-testid="result-${index}"]`).should('contain', `Result: "${testCase.expected}"`);
      });
    });

    it('should prioritize custom label over field name', () => {
      const testCases = [
        { fieldName: 'location_preference_names', label: 'Custom Location Preferences', expected: 'Custom Location Preferences' },
        { fieldName: 'user_profile_settings', label: 'My Settings', expected: 'My Settings' },
        { fieldName: 'complex_field_name', label: 'Simple Label', expected: 'Simple Label' },
      ];

      cy.mount(<GetLabelTestComponent testCases={testCases} />);

      testCases.forEach((testCase, index) => {
        cy.get(`[data-testid="result-${index}"]`).should('contain', `Result: "${testCase.expected}"`);
      });
    });

    it('should handle empty label strings correctly', () => {
      const testCases = [
        { fieldName: 'location_preference_names', label: '', expected: 'Location Preference Names' },
        { fieldName: 'user_settings', label: '', expected: 'User Settings' },
      ];

      cy.mount(<GetLabelTestComponent testCases={testCases} />);

      testCases.forEach((testCase, index) => {
        cy.get(`[data-testid="result-${index}"]`).should('contain', `Result: "${testCase.expected}"`);
      });
    });
  });

  describe('Form Field Integration Tests', () => {
    it('should generate correct labels for BBFieldText', () => {
      cy.mount(<FormTestComponent fieldName="location_preference_names" fieldType="text" />);
      
      cy.get('label').should('contain', 'Location Preference Names');
    });

    it('should generate correct labels for BBFieldSelectMultiple', () => {
      cy.mount(<FormTestComponent fieldName="location_preference_names" fieldType="select-multiple" />);
      
      cy.get('label').should('contain', 'Location Preference Names');
    });

    it('should generate correct labels for BBFieldSelect', () => {
      cy.mount(<FormTestComponent fieldName="user_profile_settings" fieldType="select" />);
      
      cy.get('label').should('contain', 'User Profile Settings');
    });

    it('should generate correct labels for BBFieldCheckbox', () => {
      cy.mount(<FormTestComponent fieldName="terms_and_conditions_accepted" fieldType="checkbox" />);
      
      cy.get('label').should('contain', 'Terms And Conditions Accepted');
    });

    it('should use custom labels when provided', () => {
      cy.mount(
        <FormTestComponent 
          fieldName="location_preference_names" 
          fieldType="select-multiple" 
          customLabel="Preferred Locations"
        />
      );
      
      cy.get('label').should('contain', 'Preferred Locations');
      cy.get('label').should('not.contain', 'Location Preference Names');
    });
  });

  describe('Real-world Examples', () => {
    const realWorldCases = [
      { fieldName: 'location_preference_names', expected: 'Location Preference Names' },
      { fieldName: 'emergency_contact_phone_number', expected: 'Emergency Contact Phone Number' },
      { fieldName: 'billing_address_street_name', expected: 'Billing Address Street Name' },
      { fieldName: 'security_settings_two_factor_enabled', expected: 'Security Settings Two Factor Enabled' },
      { fieldName: 'user_profile_social_media_links', expected: 'User Profile Social Media Links' },
      { fieldName: 'project_management_task_assignment_rules', expected: 'Project Management Task Assignment Rules' },
    ];

    realWorldCases.forEach((testCase) => {
      it(`should correctly generate label for "${testCase.fieldName}"`, () => {
        cy.mount(<FormTestComponent fieldName={testCase.fieldName} fieldType="text" />);
        
        cy.get('label').should('contain', testCase.expected);
      });
    });
  });

  describe('Performance and Edge Cases', () => {
    it('should handle very long field names', () => {
      const longFieldName = 'very_long_field_name_with_many_underscores_and_words_that_should_be_properly_capitalized_and_formatted';
      const expectedLabel = 'Very Long Field Name With Many Underscores And Words That Should Be Properly Capitalized And Formatted';
      
      cy.mount(<FormTestComponent fieldName={longFieldName} fieldType="text" />);
      
      cy.get('label').should('contain', expectedLabel);
    });

    it('should handle special characters gracefully', () => {
      const testCases = [
        { fieldName: 'field-with-dashes', expected: 'Field-with-dashes' },
        { fieldName: 'field.with.dots', expected: 'Field.with.dots' },
        { fieldName: 'field with spaces', expected: 'Field With Spaces' },
      ];

      testCases.forEach((testCase, index) => {
        cy.mount(<FormTestComponent fieldName={testCase.fieldName} fieldType="text" />);
        
        cy.get('label').should('contain', testCase.expected);
        
        // Reset for next test
        if (index < testCases.length - 1) {
          cy.get('body').then(() => {
            // Clean up before next test
          });
        }
      });
    });

    it('should handle consecutive underscores', () => {
      const testCases = [
        { fieldName: 'field__with__double__underscores', expected: 'Field  With  Double  Underscores' },
        { fieldName: 'field___with___triple___underscores', expected: 'Field   With   Triple   Underscores' },
      ];

      testCases.forEach((testCase, index) => {
        cy.mount(<FormTestComponent fieldName={testCase.fieldName} fieldType="text" />);
        
        cy.get('label').should('contain', testCase.expected);
        
        // Reset for next test
        if (index < testCases.length - 1) {
          cy.get('body').then(() => {
            // Clean up before next test
          });
        }
      });
    });
  });

  describe('Responsive Behavior', () => {
    it('should generate labels correctly across different viewport sizes', () => {
      const viewports = [
        { width: 375, height: 667, name: 'mobile' },
        { width: 768, height: 1024, name: 'tablet' },
        { width: 1280, height: 720, name: 'desktop' },
      ];

      viewports.forEach((viewport) => {
        cy.viewport(viewport.width, viewport.height);
        cy.mount(<FormTestComponent fieldName="location_preference_names" fieldType="select-multiple" />);

        // Test functionality works on this viewport
        cy.get('label').should('contain', 'Location Preference Names');
      });
    });
  });

  describe('Regression Tests', () => {
    it('should fix the original reported bug', () => {
      // This is the exact case reported in the bug
      cy.mount(<FormTestComponent fieldName="location_preference_names" fieldType="select-multiple" />);
      
      // Should NOT contain the old incorrect format
      cy.get('label').should('not.contain', 'Location preference_names');
      
      // Should contain the correct format
      cy.get('label').should('contain', 'Location Preference Names');
    });

    it('should maintain backward compatibility for simple field names', () => {
      const simpleCases = [
        'name',
        'email', 
        'phone',
        'address',
        'password',
      ];

      simpleCases.forEach((fieldName, index) => {
        const expectedLabel = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
        
        cy.mount(<FormTestComponent fieldName={fieldName} fieldType="text" />);
        
        cy.get('label').should('contain', expectedLabel);
        
        // Reset for next test
        if (index < simpleCases.length - 1) {
          cy.get('body').then(() => {
            // Clean up before next test
          });
        }
      });
    });
  });
});