import React from 'react'
import BBFieldBase, { type IPropsBBFieldBase } from '../bbfield_base'
import { IPropsBBBaseForm } from 'src/types'

/**
 * BBFIELD FILE
 */
export default function BBFieldFile (Props: IPropsBBBaseForm): React.ReactElement {
  return <BBFieldBase {...Props} type="file" />
}
