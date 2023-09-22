import React from 'react'
import { IPropsBBBaseForm } from 'src/types'
import BBFieldBase from '../bbfield_base'

/**
 * BBFIELD CHECKBOX
 */
export default function BBFieldCheckbox (Props: IPropsBBBaseForm): React.ReactElement {
  return <BBFieldBase {...Props} type="checkbox" />
}
