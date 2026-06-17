import classNames from 'classnames';
import React from 'react';
import BBText from '../bbtext';
import styles from './styles.module.scss';
import type { IPropsBBBase, TBBTextSize, TBBTextColor } from '../types';

/**
 * PROPS
 *
 * @param {React.ReactNode} children - The quote body
 * @param {React.ReactNode=} cite - The attribution (name / role); rendered in a <figcaption><cite>
 * @param {TBBTextSize=} size - the size of the quote body (default 'large')
 * @param {TBBTextColor=} color - the color of the quote body
 * @param {TBBTextColor=} citeColor - the color of the attribution
 * @param {boolean=} italics - whether the quote body is italic
 * @param {string=} className - Any class name to add to the <figure>
 */
export interface IPropsBBQuote extends IPropsBBBase {
  children: React.ReactNode;
  cite?: React.ReactNode;
  size?: TBBTextSize;
  color?: TBBTextColor;
  citeColor?: TBBTextColor;
  italics?: boolean;
}

/**
 * BBQuote
 *
 * Semantic pull quote: <figure> + <blockquote> with an optional <figcaption><cite> attribution.
 * The quote body and attribution use BBText so typography and theming stay consistent.
 */
export default function BBQuote(Props: IPropsBBQuote): React.ReactElement {
  const {
    children,
    cite,
    size = 'large',
    color,
    citeColor = 'grey_dark',
    italics = false,
    className,
  } = Props;

  return (
    <figure className={classNames(styles.figure, className)}>
      <blockquote className={styles.blockquote}>
        <BBText size={size} color={color} italics={italics}>
          {children}
        </BBText>
      </blockquote>
      {cite && (
        <figcaption className={styles.figcaption}>
          <cite className={styles.cite}>
            <BBText asSpan size="small" color={citeColor}>
              {cite}
            </BBText>
          </cite>
        </figcaption>
      )}
    </figure>
  );
}
