import React from 'react';
import BBFieldBase from '../bbfield_base';
import type { IPropsBBBaseForm } from '../../types';

/**
 * BBFIELD FILE
 */
export default function BBFieldFile(Props: IPropsBBBaseForm): React.ReactElement {
  return <BBFieldBase {...Props} type="file" />;
}
