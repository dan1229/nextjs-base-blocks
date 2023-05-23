import React from 'react'
import BBFieldBase, { type IPropsBBFieldBase } from '../bbfield_base'

/**
 * BBFIELD CHECKBOX
 */
export default function BBFieldCheckbox (Props: Omit<IPropsBBFieldBase, 'type'>): React.ReactElement {
  return <BBFieldBase {...Props} type="checkbox" />
}
