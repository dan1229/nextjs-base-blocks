import React from 'react';
import { useForm } from 'react-hook-form';
import BBFieldCheckbox from '../../src/form_components/bbfield_checkbox';
import BBFieldNumber from '../../src/form_components/bbfield_number';
import BBFieldSelect from '../../src/form_components/bbfield_select';
import BBFieldText from '../../src/form_components/bbfield_text';

const BLANK = 'Give the install a name.';

// The wiring a react-hook-form consumer writes: register + the field's error from formState
const ErrorForm: React.FC<{ kind: 'text' | 'textarea' | 'number' | 'checkbox' | 'select' }> = ({ kind }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>();
  const common = { fieldName: 'name', register: register('name', { required: BLANK }), error: errors.name };

  return (
    <form noValidate onSubmit={handleSubmit(() => undefined)}>
      {kind === 'text' && <BBFieldText {...common} />}
      {kind === 'textarea' && <BBFieldText {...common} type="textarea" />}
      {kind === 'number' && <BBFieldNumber {...common} />}
      {kind === 'checkbox' && <BBFieldCheckbox {...common} />}
      {kind === 'select' && <BBFieldSelect {...common} options={[{ value: '', label: 'None' }]} />}
      <button type="submit">Save</button>
    </form>
  );
};

describe('form field errors', () => {
  (['text', 'textarea', 'number', 'checkbox', 'select'] as const).forEach((kind) => {
    const control = kind === 'textarea' ? 'textarea' : kind === 'select' ? 'select' : 'input';

    it(`${kind}: shows the error text under the field and ties it to the control`, () => {
      cy.mount(<ErrorForm kind={kind} />);
      cy.get(control).should('not.have.attr', 'aria-invalid');
      cy.get('#name-error').should('not.exist');

      cy.contains('button', 'Save').click();

      cy.get('#name-error').should('be.visible').and('have.text', BLANK);
      cy.get(control).should('have.attr', 'aria-invalid', 'true').and('have.attr', 'aria-describedby', 'name-error');
    });
  });
});
