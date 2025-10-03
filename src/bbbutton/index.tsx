'use client';

import classNames from 'classnames';
import Link from 'next/link';
import React, { useState, useRef } from 'react';
import BBText from '../bbtext';
import { createClassHelper, toStandardSnakeCase } from '../utils/scss-class-functions';
import styles from './styles.module.scss';
import type {
  TBBButtonIconAlign,
  TBBButtonType,
  TBBButtonSize,
  TBBButtonElevation,
  TBBButtonVariant,
  TBBTextSize,
  TBBTextColor,
} from '../types';

/**
 * ICON PROPS
 *
 * @param {React.ReactNode} icon - Icon to display
 * @param {TBBButtonIconAlign} align - Alignment of icon
 * @param {TBBTextColor} color - Color of icon
 */
interface IPropsBBButtonIcon {
  icon: React.ReactNode;
  align?: TBBButtonIconAlign;
  color?: TBBTextColor;
}

/**
 * PROPS
 *
 * @param {string=} text - The text to display on the button
 * @param {TBBButtonType=} type - The type of button
 * @param {TBBButtonSize=} size - The size of the button
 * @param {TBButtonElevation=} elevation - The elevation of the button
 * @param {TBBButtonVariant=} variant - Variant of button to use
 * @param {boolean=} disabled - Whether the button is disabled
 * @param {boolean=} hover - Whether the button is hovered
 * @param {boolean=} focus - Whether the button is focused
 * @param {IPropsBBButtonIcon=} icon - The icon to display on the button
 * @param {string=} idForm - The ID of the form to submit
 * @param {string=} className - Any class name to add
 * @param {(event: React.MouseEvent<HTMLButtonElement>) => void=} onClick - The function to call when the button is clicked
 * @param {boolean=} transparent - Whether the button is transparent
 * @param {TBBTextColor=} colorText - The color of the text. This doesn't really work with 'inverse-*' variants
 * @param {string=} href - The href to navigate to
 * @param {boolean=} openInNewTab - Whether to open the link in a new tab
 * @param {string=} helperTextOnHover - The helper text to display on hover
 * @param {string=} classNameHelperText - Extra class name for the helper text
 * @param {boolean=} noBorder - Whether to remove the border of the button
 */
export interface IPropsBBButton {
  text?: string;
  type?: TBBButtonType;
  size?: TBBButtonSize;
  elevation?: TBBButtonElevation;
  variant?: TBBButtonVariant;
  disabled?: boolean;
  hover?: boolean;
  focus?: boolean;
  icon?: IPropsBBButtonIcon;
  idForm?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  transparent?: boolean;
  colorText?: TBBTextColor;
  href?: string;
  openInNewTab?: boolean;
  helperTextOnHover?: string;
  classNameHelperText?: string;
  noBorder?: boolean;
}

/**
 * BBButton
 */
export default function BBButton(Props: IPropsBBButton): React.ReactElement {
  const {
    text,
    type = 'button',
    size = 'md',
    variant = 'primary',
    elevation = 'none',
    disabled = false,
    hover = true,
    focus = false,
    icon = { icon: null, align: 'left', color: 'white' },
    idForm,
    className,
    onClick,
    transparent = false,
    colorText = 'white',
    href,
    openInNewTab = false,
    helperTextOnHover,
    classNameHelperText,
    noBorder = false,
  } = Props;

  // set button disabling if appropriate
  const disabledRes = !onClick && type !== 'submit' && !href ? true : disabled;

  // if hover is disabled or button as a whole
  // id disabled , don't show hover
  const hoverRes = disabledRes || !hover ? false : hover;

  // icon alignment
  const [align] = useState<TBBButtonIconAlign>(icon.align || 'left');

  // Create class helper with standardized patterns
  const classHelper = createClassHelper(styles, {
    variant: { transform: toStandardSnakeCase },
    elevation: { prefix: 'elevation_' },
    icon: { prefix: 'icon_', transform: toStandardSnakeCase },
  });

  // handle hover state
  const [isHovered, setIsHovered] = useState(false);
  const mainWrapperRef = useRef<HTMLDivElement>(null);
  const helperTextRef = useRef<HTMLDivElement>(null);


  const getButtonSize = (): TBBTextSize => {
    switch (size) {
      case 'xs':
        return 'tiny';
      case 'sm':
        return 'small';
      case 'md':
        return 'medium';
      case 'lg':
        return 'large';
      case 'xl':
        return 'xlarge';
      default:
        return 'medium';
    }
  };


  const getIconColor = (color?: TBBTextColor) => {
    const defaultIconColor = 'white';
    return color ? (classHelper.icon(color) || defaultIconColor) : defaultIconColor;
  };

  const renderIcon = (currSide: TBBButtonIconAlign, icon?: IPropsBBButtonIcon) => {
    if (!icon || !icon.icon) return null;
    const element = <span className={classNames(styles.container_icon, getIconColor(icon.color))}>{icon.icon}</span>;
    if (align === 'left' && currSide === 'left') {
      return element;
    } else if (align === 'right' && currSide === 'right') {
      return element;
    } else if (align === 'above' && currSide === 'left') {
      return element;
    } else if (align === 'below' && currSide === 'right') {
      return element;
    } else if (align === 'space-between' && currSide === 'right') {
      return element;
    }
    return null;
  };

  const mainComponent = (
    <span
      className={classNames(
        styles.container_main,
        align === 'above' || align === 'below' ? styles.content_vertical : null,
        align === 'space-between' ? styles.base_space_between : null,
        classNameHelperText
      )}
      ref={mainWrapperRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {renderIcon('left', icon)}
      {!!text && (
        <span className={classNames(styles.container_text)}>
          <BBText color={colorText} size={getButtonSize()}>
            {text}
          </BBText>
        </span>
      )}
      {renderIcon('right', icon)}
      {helperTextOnHover && (
        <span className={classNames(styles.helper_text, isHovered && styles.helper_text_visible)} ref={helperTextRef}>
          <span className={styles.helper_text_content}>
            <BBText color="white" size="small" className={styles.helper_text_question_mark}>
              ?
            </BBText>
            <BBText size="small">{helperTextOnHover}</BBText>
          </span>
        </span>
      )}
    </span>
  );

  // class names for buttons
  let baseClassNames = classNames(
    styles.base,
    classHelper.variant(variant),
    classHelper.elevation(elevation),
    // if no border, show no border
    noBorder ? styles.no_border : null,
    // if disabled, show disabled
    disabledRes ? styles.disabled : null,
    // if transparent, show transparent
    transparent ? styles.transparent : null,
    // if focused, show focus
    focus ? styles.focus : null,
    // extra class name
    className
  );

  // LINK COMPONENT
  // We support a 'link button' via the 'href' prop that will
  // render a BBLink component instead of a regular button
  // this allows us to do things like right click to open in new tab

  // if href is defined, use regular button and show it as disabled
  if (href && !disabledRes) {
    // add hover state for links
    if (hoverRes) {
      baseClassNames += ` ${styles.hover}`;
    }
    baseClassNames += ` ${styles.link}`;
    if (onClick) console.warn('BBButton: Both onClick and href are defined. onClick will be ignored.');
    return (
      <Link
        href={href}
        className={baseClassNames}
        target={openInNewTab ? '_blank' : '_self'}
        rel={openInNewTab ? 'noreferrer noopener' : undefined}
      >
        {mainComponent}
      </Link>
    );
  }

  // DEFAULT BUTTON COMPONENT
  // Just a regular old button

  // only 'regular buttons' support a disabled state
  if (disabledRes) {
    baseClassNames += ` ${styles.disabled}`;
  }

  // add hover state for buttons that are not disabled
  if (hoverRes && !disabledRes) {
    baseClassNames += ` ${styles.hover}`;
  }

  return (
    <button
      className={baseClassNames}
      type={type}
      form={idForm}
      disabled={disabledRes}
      onClick={disabledRes ? undefined : (event) => onClick?.(event)}
    >
      {mainComponent}
    </button>
  );
}
