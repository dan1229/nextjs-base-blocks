import BBAlert, { IPropsBBAlert } from '@/bbalert';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';

/**
 * IPropsDemoComponentWrapper
 * @param {React.ReactNode} children - The children to display
 */
interface IPropsDemoComponentWrapper {
  children: React.ReactNode;
}

/**
 * DemoComponentWrapper
 * A basic component to help edit state of a component
 * Mainly handles styling and layout
 */
export default function DemoComponentWrapper(Props: IPropsDemoComponentWrapper): React.ReactElement | null {
  const { children } = Props;

  return <div>{children}</div>;
}
