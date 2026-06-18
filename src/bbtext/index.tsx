import classNames from 'classnames';
import React from 'react';
import { createClassHelper } from '../utils/scss-class-functions';
import styles from './styles.module.scss';
import type { TBBTextSize, TBBTextColor, TBBTextWeight } from '../types';

// Create class helper with standardized patterns
const classHelper = createClassHelper(styles, {
  color: {},  // Direct mapping for most colors
  size: {},   // Direct mapping for sizes
  weight: { prefix: 'weight_' },  // weight_light, weight_medium, etc.
});

/**
 * PROPS
 *
 * @param {React.ReactNode} children - The text to display
 * @param {TBBTextSize=} size - the size of text
 * @param {TBBTextColor=} color - the color of the text
 * @param {boolean=} bold - whether the text is bold (shorthand for weight="bold")
 * @param {TBBTextWeight=} weight - the font weight; takes precedence over bold when set
 * @param {boolean=} italics - whether the text is italic
 * @param {boolean=} underline - whether the text is underlined
 * @param {boolean=} hover - Whether the text has a hover effect
 * @param {boolean=} asSpan - whether to render as a span or not
 * @param {string=} className - Any class name to add
 * @param {() => void=} onClick - Function to call when clicked
 * @param {string=} fontFamily - The font family to use
 */
export interface IPropsBBText {
  children: React.ReactNode;
  size?: TBBTextSize;
  color?: TBBTextColor;
  bold?: boolean;
  weight?: TBBTextWeight;
  italics?: boolean;
  underline?: boolean;
  hover?: boolean;
  asSpan?: boolean;
  className?: string;
  onClick?: () => void;
  fontFamily?: string;
}

/**
 * BBText
 */
export default function BBText(Props: IPropsBBText): React.ReactElement {
  const {
    children,
    size = 'medium',
    color,
    bold = false,
    weight,
    italics = false,
    underline = false,
    hover = false,
    asSpan = false,
    className,
    onClick,
    fontFamily,
  } = Props;

  const getClassColor = (): string => {
    return classHelper.color(color) || styles.color_default;
  };

  const getClassSize = (): string => {
    return classHelper.size(size) || '';
  };

  // weight takes precedence; fall back to the bold shorthand when weight is unset
  const getClassWeight = (): string => {
    if (weight) return classHelper.weight(weight) || '';
    if (bold) return styles.bold;
    return '';
  };

  const getHtmlTag = (): string => {
    if (asSpan) return 'span';
    switch (size) {
      case 'tiny':
        return 'p';
      case 'small':
        return 'p';
      case 'medium':
        return 'p';
      case 'large':
        return 'h4';
      case 'xlarge':
        return 'h3';
      case 'xxlarge':
        return 'h2';
      case 'xxxlarge':
        return 'h1';
      default:
        return 'p';
    }
  };

  // eslint-disable-next-line no-undef
  const Tag = getHtmlTag() as keyof JSX.IntrinsicElements;

  /**
   * RENDER
   */
  return (
    <Tag
      onClick={onClick}
      className={classNames(
        className,
        styles.base,
        getClassColor(),
        getClassSize(),
        getClassWeight(),
        italics && styles.italics,
        underline && styles.underline,
        hover && styles.hover
      )}
      style={{ fontFamily: fontFamily }}
    >
      {children}
    </Tag>
  );
}
