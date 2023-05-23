import React from 'react';
import BBAlert from '../bbalert';

/**
 * IProps
 *
 * @param {string[] | undefined} formErrors - Form errors to display
 */
interface IPropsAlertsFormErrors {
  formErrors: string[] | undefined;
}

/**
 * ALERTS FORM ERRORS
 */
export function AlertsFormErrors(props: IPropsAlertsFormErrors) {
  const { formErrors } = props;
  if (!formErrors || !formErrors.length) {
    return null;
  }
  return (
    <>
      {formErrors.map((error: string, i: number) => {
        return (
          <BBAlert key={i} variant="danger">
            {error}
          </BBAlert>
        );
      })}
    </>
  );
}
