import React from 'react'
import BBFieldBase from '../bbfield_base'
import type { IPropsBBBaseForm } from 'src/types'

/**
 * BBFIELD NUMBER
 */
export default function BBFieldNumber (Props: IPropsBBBaseForm): React.ReactElement {
  return <BBFieldBase {...Props} type="number" />
}
