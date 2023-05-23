import React from 'react';
import BBFieldBase, { IPropsBBFieldBase } from '../bbfield_base';

/**
 * BBFIELD FILE
 */
export default function BBFieldFile(Props: Omit<IPropsBBFieldBase, 'type'>): React.ReactElement {
  return <BBFieldBase {...Props} type="file" />;
}
