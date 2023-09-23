import React from 'react'
import BBFieldBase from '../bbfield_base'
import type { IPropsBBBaseForm } from '../../types'

/**
 * BBFIELD CHECKBOX
 */
export default function BBFieldCheckbox (Props: IPropsBBBaseForm): React.ReactElement {
  return <BBFieldBase {...Props} type="checkbox" />
}
