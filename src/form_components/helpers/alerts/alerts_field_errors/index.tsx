import React from 'react';
import BBAlert from '../../../../bbalert';
import type { FieldError, FieldErrors, FieldErrorsImpl, Merge, Ref } from 'react-hook-form';

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

  const getErrorByType = (type: string | undefined, ref: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | Ref | undefined) => {
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
        try {
          finalMessage = `Error - ${type} '${(ref as Ref)?.name?.replace(/_/g, ' ').replace(/-/g, ' ')}'`;
        } catch (error) {
          console.error(error);
        }
        finalMessage = finalMessage?.length ? finalMessage : getErrorByType(type?.toString(), ref);

        return (
          <BBAlert key={`${keyFieldError}-${Date.now()}`} variant="danger">
            {finalMessage}
          </BBAlert>
        );
      })}
    </>
  );
}
