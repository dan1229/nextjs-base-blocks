'use client';

import classNames from 'classnames';
import Link from 'next/link';
import React, { useState, useRef } from 'react';
import BBText from '../bbtext';
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

  // handle hover state
  const [isHovered, setIsHovered] = useState(false);
  const mainWrapperRef = useRef<HTMLDivElement>(null);
  const helperTextRef = useRef<HTMLDivElement>(null);

  // GET CLASS VARIANTS
  //
  const getClassVariant = () => {
    switch (variant) {
      case 'primary':
        return styles.primary;
      case 'secondary':
        return styles.secondary;
      case 'accent':
        return styles.accent;
      case 'danger':
        return styles.danger;
      case 'success':
        return styles.success;
      case 'warning':
        return styles.warning;
      case 'info':
        return styles.info;
      case 'black':
        return styles.black;
      case 'white':
        return styles.white;
      case 'inverse-info':
        return styles.inverseInfo;
      case 'inverse-primary':
        return styles.inversePrimary;
      case 'inverse-secondary':
        return styles.inverseSecondary;
      case 'inverse-accent':
        return styles.inverseAccent;
      case 'inverse-danger':
        return styles.inverseDanger;
      case 'inverse-success':
        return styles.inverseSuccess;
      case 'inverse-warning':
        return styles.transparentPrimary;
      case 'transparent-primary':
        return styles.transparentPrimary;
      case 'transparent-secondary':
        return styles.transparentSecondary;
      case 'transparent-accent':
        return styles.transparentAccent;
      default:
        return '';
    }
  };

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

  const getClassElevation = () => {
    switch (elevation) {
      case 'none':
        return styles.elevationNone;
      case 'low':
        return styles.elevationLow;
      case 'medium':
        return styles.elevationMedium;
      case 'high':
        return styles.elevationHigh;
      default:
        return '';
    }
  };

  const getIconColor = (color?: TBBTextColor) => {
    switch (color) {
      case 'white':
        return styles.iconWhite;
      case 'black':
        return styles.iconBlack;
      case 'primary':
        return styles.iconPrimary;
      case 'primary_dark':
        return styles.iconPrimaryDark;
      case 'primary_light':
        return styles.iconPrimaryLight;
      case 'secondary':
        return styles.iconSecondary;
      case 'secondary_dark':
        return styles.iconSecondaryDark;
      case 'secondary_light':
        return styles.iconSecondaryLight;
      case 'accent':
        return styles.iconAccent;
      case 'accent_dark':
        return styles.iconAccentDark;
      case 'accent_light':
        return styles.iconAccentLight;
      case 'danger':
        return styles.iconDanger;
      case 'success':
        return styles.iconSuccess;
      case 'warning':
        return styles.iconWarning;
      case 'info':
        return styles.iconInfo;
      default:
        return 'white';
    }
  };

  const renderIcon = (currSide: TBBButtonIconAlign, icon?: IPropsBBButtonIcon) => {
    if (!icon || !icon.icon) return null;
    const element = <span className={classNames(styles.containerIcon, getIconColor(icon.color))}>{icon.icon}</span>;
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
        styles.containerMain,
        align === 'above' || align === 'below' ? styles.contentVertical : null,
        isHovered && helperTextOnHover ? styles.showHelperText : null,
        classNameHelperText
      )}
      ref={mainWrapperRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {renderIcon('left', icon)}
      {!!text && (
        <span className={classNames(styles.containerText)}>
          <BBText color={colorText} size={getButtonSize()}>
            {text}
          </BBText>
        </span>
      )}
      {renderIcon('right', icon)}
      {helperTextOnHover && (
        <span className={classNames(styles.helperText, isHovered && styles.helperTextVisible)} ref={helperTextRef}>
          <span className={styles.helperTextContent}>
            <BBText color="white" size="small" className={styles.helperTextQuestionMark}>
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
    getClassVariant(),
    getClassElevation(),
    // if no border, show no border
    noBorder ? styles.noBorder : null,
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
