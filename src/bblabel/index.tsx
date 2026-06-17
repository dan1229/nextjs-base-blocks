import classNames from 'classnames';
import React from 'react';
import BBText from '../bbtext';
import styles from './styles.module.scss';
import type { TBBTextSize, TBBTextColor } from '../types';

// Mono stack with a CSS-variable hook so consumers can override the font
const FONT_FAMILY_MONO = "var(--font-family-mono, monospace)";

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
 * Small uppercase, letter-spaced monospace eyebrow / kicker label. Composes BBText for
 * size / weight / color and adds the mono-label treatment. Renders as a <span>.
 */
export default function BBLabel(Props: IPropsBBLabel): React.ReactElement {
  const { children, size = 'tiny', color, className } = Props;

  return (
    <BBText
      asSpan
      size={size}
      weight="medium"
      color={color}
      fontFamily={FONT_FAMILY_MONO}
      className={classNames(styles.label, !color && styles.muted, className)}
    >
      {children}
    </BBText>
  );
}
