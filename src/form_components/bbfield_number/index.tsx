import React from 'react'
import BBFieldBase from '../bbfield_base'
import type { IPropsBBBaseForm } from '../../types'

/**
 * BBFIELD NUMBER
 */
export default function BBFieldNumber (Props: IPropsBBBaseForm): React.ReactElement {
  return <BBFieldBase {...Props} type="number" />
}
