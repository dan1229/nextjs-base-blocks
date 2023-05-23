import React from 'react'
import BBAlert from '../../../../bbalert'

/**
 * IProps
 *
 * @param {string[] | undefined} formSuccess - Form success messages to display
 */
interface IPropsAlertsFormSuccess {
  formSuccess: string[] | undefined
}

/**
 * ALERTS FORM SUCCESS
 */
export function AlertsFormSuccess (props: IPropsAlertsFormSuccess): React.ReactElement {
  const { formSuccess } = props
  if (!formSuccess || !formSuccess.length) {
    return <></>
  }
  return (
    <>
      {formSuccess.map((msg: string, i: number) => (
        <BBAlert key={i} variant="success">
          {msg}
        </BBAlert>
      ))}
    </>
  )
}
