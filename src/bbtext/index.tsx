import classNames from 'classnames';
import React from 'react';
import styles from './styles.module.scss';
import type { TBBTextSize, TBBTextColor } from '../types';

/**
 * PROPS
 *
 * @param {React.ReactNode} children - The text to display
 * @param {TBBTextSize=} size - the size of text
 * @param {TBBTextColor=} color - the color of the text
 * @param {boolean=} bold - whether the text is bold
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
    italics = false,
    underline = false,
    hover = false,
    asSpan = false,
    className,
    onClick,
    fontFamily,
  } = Props;

  const getClassColor = (): string => {
    switch (color) {
      case 'grey_light':
        return styles.grey_light;
      case 'grey_dark':
        return styles.grey_dark;
      case 'black':
        return styles.black;
      case 'white':
        return styles.white;
      case 'primary':
        return styles.primary;
      case 'primary_dark':
        return styles.primary_dark;
      case 'primary_light':
        return styles.primary_light;
      case 'secondary':
        return styles.secondary;
      case 'secondary_dark':
        return styles.secondary_dark;
      case 'secondary_light':
        return styles.secondary_light;
      case 'accent':
        return styles.accent;
      case 'accent_dark':
        return styles.accent_dark;
      case 'accent_light':
        return styles.accent_light;
      case 'success':
        return styles.success;
      case 'warning':
        return styles.warning;
      case 'danger':
        return styles.danger;
      case 'info':
        return styles.info;
      default:
        return styles.color_default;
    }
  };

  const getClassSize = (): string => {
    switch (size) {
      case 'tiny':
        return styles.tiny;
      case 'small':
        return styles.small;
      case 'medium':
        return styles.medium;
      case 'large':
        return styles.large;
      case 'xlarge':
        return styles.xlarge;
      case 'xxlarge':
        return styles.xxlarge;
      case 'xxxlarge':
        return styles.xxxlarge;
    }
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
        bold && styles.bold,
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
