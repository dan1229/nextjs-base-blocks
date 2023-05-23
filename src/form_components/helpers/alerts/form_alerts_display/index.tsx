import React from 'react'
import { AlertsFieldErrors } from '../alerts_field_errors'
import { AlertsFormErrors } from '../alerts_form_errors'
import { AlertsFormSuccess } from '../alerts_form_success'
import type { FieldErrors } from 'react-hook-form'

/**
 * IPropsAlert
 *
 * @param {Array<string>=} formSuccess - Form success messages
 * @param {FieldErrors=} fieldErrors - Form errors to display
 * @param {Array<string>=} formErrors - Form errors to display
 */
interface IPropsAlert {
  formSuccess?: string[]
  fieldErrors?: FieldErrors
  formErrors?: string[]
}

/**
 * FORM ALERTS DISPLAY
 */
export default function FormAlertsDisplay (Props: IPropsAlert): React.ReactElement {
  const { formSuccess, fieldErrors, formErrors } = Props

  /**
   * RENDER
   */
  return (
    <>
      {/* SUCCESS MESSAGES */}
      <AlertsFormSuccess formSuccess={formSuccess} />
      {/* FORM ERRORS */}
      <AlertsFormErrors formErrors={formErrors} />
      {/* FIELD ERRORS */}
      <AlertsFieldErrors fieldErrors={fieldErrors} />
    </>
  )
}
