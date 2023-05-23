import React from 'react';
import BBAlert from '@/src/bbalert';
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
export function AlertsFieldErrors(props: IPropsAlertsFieldErrors) {
  const { fieldErrors } = props;
  if (!fieldErrors) {
    return null;
  }

  const keysFieldErrors = Object.keys(fieldErrors);
  if (!keysFieldErrors.length) {
    return null;
  }

  return (
    <>
      {keysFieldErrors.map((keyFieldError: string) => {
        const fieldError = fieldErrors[keyFieldError];
        if (!fieldError) {
          return null;
        }

        const { message, type, ref } = fieldError;
        const finalMessage = message
          ? message.toString()
          : `Error - ${type} '${(ref as Ref)['name'].replace(/_/g, ' ').replace(/-/g, ' ')}'`;

        return (
          <BBAlert key={`${keyFieldError}-${Date.now()}`} variant="danger">
            {finalMessage}
          </BBAlert>
        );
      })}
    </>
  );
}
