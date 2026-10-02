import React from 'react';
import { getBaseBlocksFramework } from './config';
import type { IPropsFrameworkLink } from '../types';

/**
 * Link for hosts without Next.js - the registered component, or a plain anchor (a full page
 * load) when nothing is registered.
 */
export default function Link(props: IPropsFrameworkLink): React.ReactElement {
  const { Link: HostLink } = getBaseBlocksFramework();
  if (HostLink) return <HostLink {...props} />;

  const { href, children, className, target, rel, onClick } = props;
  return (
    <a href={href} className={className} target={target || undefined} rel={rel || undefined} onClick={onClick}>
      {children}
    </a>
  );
}
