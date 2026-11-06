import classNames from 'classnames';
import React from 'react';
import BBText from '../bbtext';
import styles from './styles.module.scss';
import type { TBBTextSize, TBBTextColor } from '../types';

/**
 * PROPS
 *
 * @param {React.ReactNode} children - The label text
 * @param {TBBTextSize=} size - the size of the label (default 'tiny')
 * @param {TBBTextColor=} color - an explicit color; omit for the default muted label ink
 * @param {string=} className - Any class name to add
 */
export interface IPropsBBLabel {
  children: React.ReactNode;
  size?: TBBTextSize;
  color?: TBBTextColor;
  className?: string;
}

/**
 * BBLabel
 *
 * Small uppercase, letter-spaced eyebrow / kicker label, in the main font
 * (`--font-family-main`, through BBText). Composes BBText for size / weight / color
 * and adds the label treatment. Renders as a <span>.
 */
export default function BBLabel(Props: IPropsBBLabel): React.ReactElement {
  const { children, size = 'tiny', color, className } = Props;

  return (
    <BBText
      asSpan
      size={size}
      weight="medium"
      color={color}
      className={classNames(styles.label, !color && styles.muted, className)}
    >
      {children}
    </BBText>
  );
}
