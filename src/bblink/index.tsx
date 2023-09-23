import Link from 'next/link';
import React from 'react';
import type { TBBTextSize, TBBTextColor } from '../types';
import styles from './styles.module.scss';
import BBText from '../bbtext';

/**
 * PROPS
 *
 * @param {React.ReactNode} children - The text to display
 * @param {string} href = The link to go to
 * @param {TBBTextSize=} size - the size of text
 * @param {TBBTextColor=} color - the color of the text
 * @param {boolean} bold - whether the text is bold
 * @param {boolean} italics - whether the text is italic
 * @param {boolean} underline - whether the text is underlined
 * @param {boolean} asSpan - whether to render as a span or not
 * @param {boolean} external - whether the link is external or not. will open in new tab and handle seo.
 * @param {string=} className - Any class name to add
 */
interface IPropsBBLink {
  children: React.ReactNode;
  href: string;
  size?: TBBTextSize;
  color?: TBBTextColor;
  bold?: boolean;
  italics?: boolean;
  underline?: boolean;
  asSpan?: boolean;
  external?: boolean;
  className?: string;
}
/**
 * BBLink
 */
export default function BBLink(Props: IPropsBBLink): React.ReactElement {
  const {
    children,
    href,
    size = 'medium',
    color = 'secondary',
    bold = false,
    italics = false,
    underline = true,
    asSpan = false,
    external = false,
    className,
  } = Props;

  return (
    <Link
      href={href}
      target={external ? '_blank' : ''}
      rel={external ? 'noreferrer noopener' : ''}
      className={underline ? styles.underline : styles.no_underline}
    >
      <BBText
        size={size}
        color={color}
        bold={bold}
        italics={italics}
        underline={underline}
        hover={true}
        asSpan={asSpan}
        className={className}
      >
        {children}
      </BBText>
    </Link>
  );
}
