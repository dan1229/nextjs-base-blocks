import React from 'react';
import { getBaseBlocksFramework } from './config';
import type { IPropsFrameworkImage } from '../types';

/**
 * Image for hosts without Next.js - the registered component, or a plain `<img>`.
 */
export default function Image(props: IPropsFrameworkImage): React.ReactElement {
  const { Image: HostImage } = getBaseBlocksFramework();
  if (HostImage) return <HostImage {...props} />;

  const { src, alt, height, width } = props;
  return <img src={src} alt={alt} height={height} width={width} />;
}
