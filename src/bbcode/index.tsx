import classNames from 'classnames';
import React from 'react';
import BBText from '../bbtext';
import styles from './styles.module.scss';
import type { IPropsBBBase, TBBTextSize, TBBTextColor } from '../types';

// Monospace stack with a CSS-variable hook so consumers can override the font
const FONT_FAMILY_MONO =
  "var(--font-family-mono, 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace)";

/**
 * PROPS
 *
 * @param {React.ReactNode} children - The code / command to display
 * @param {TBBTextSize=} size - the size of the code text (reuses the BBText scale)
 * @param {TBBTextColor=} color - the color of the code text (reuses the BBText scale)
 * @param {boolean=} block - render as a block (<pre><code>) instead of inline (<code>)
 * @param {string=} className - Any class name to add
 */
export interface IPropsBBCode extends IPropsBBBase {
  children: React.ReactNode;
  size?: TBBTextSize;
  color?: TBBTextColor;
  block?: boolean;
}

/**
 * BBCode
 *
 * Inline <code> (or block <pre><code> when `block`) for short code / CLI snippets.
 * Renders the monospace + chrome itself and reuses BBText's size/color tokens for the text.
 * For multi-line terminal mockups with their own syntax highlighting, use raw markup instead.
 */
export default function BBCode(Props: IPropsBBCode): React.ReactElement {
  const { children, size = 'small', color, block = false, className } = Props;

  const inner = (
    <BBText asSpan size={size} color={color} fontFamily={FONT_FAMILY_MONO}>
      {children}
    </BBText>
  );

  if (block) {
    return (
      <pre className={classNames(styles.pre, className)}>
        <code className={styles.codeBlock}>{inner}</code>
      </pre>
    );
  }

  return <code className={classNames(styles.code, className)}>{inner}</code>;
}
