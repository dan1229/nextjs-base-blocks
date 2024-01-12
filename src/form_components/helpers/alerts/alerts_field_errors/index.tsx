import React from 'react';
import BBAlert from '../../../../bbalert';
import type { FieldErrors, Ref } from 'react-hook-form';

/**
 * IProps
 *
 * @param {FieldErrors | undefined} formErrors - Form errors to display
 */
interface IPropsAlertsFieldErrors {
  fieldErrors: FieldErrors | undefined;
}

/**
 * ALERTS FIELD ERRORS
 */
export function AlertsFieldErrors(props: IPropsAlertsFieldErrors): React.ReactElement {
  const { fieldErrors } = props;
  if (!fieldErrors) {
    return <></>;
  }

  const keysFieldErrors = Object.keys(fieldErrors);
  if (!keysFieldErrors.length) {
    return <></>;
  }

  const getErrorByType = (type: string | undefined) => {
    if (!type) {
      return 'Invalid';
    }
    if (type === 'required') {
      return `Field is required`;
    }
    if (type === 'minLength') {
      return `Field must have a minimum length`;
    }
    if (type === 'maxLength') {
      return `Field must have a maximum length`;
    }
    return `Invalid - ${type}`;
  };

  return (
    <>
      {keysFieldErrors.map((keyFieldError: string) => {
        const fieldError = fieldErrors[keyFieldError];
        if (!fieldError) {
          return null;
        }

        const { message, type, ref } = fieldError;
        let finalMessage = message?.toString();

        if (!finalMessage) {
          try {
            finalMessage = `Error - ${type} '${(ref as Ref).name.replace(/_/g, ' ').replace(/-/g, ' ')}'`;
          } catch (error) {
            console.error(error);
          }
          finalMessage = finalMessage?.length ? finalMessage : getErrorByType(type?.toString());
        }

        return (
          <BBAlert key={`${keyFieldError}-${Date.now()}`} variant="danger">
            {finalMessage}
          </BBAlert>
        );
      })}
    </>
  );
}
