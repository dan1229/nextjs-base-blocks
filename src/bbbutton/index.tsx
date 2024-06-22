'use client';

import classNames from 'classnames';
import React, { useState, useRef } from 'react';
import BBLink from '../bblink';
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
 */
interface IPropsBBButtonIcon {
  icon: React.ReactNode;
  align?: TBBButtonIconAlign;
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
 * @param {string=} helperTextOnHover - The helper text to display on hover
 * @param {string=} classNameHelperText - Extra class name for the helper text
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
  helperTextOnHover?: string;
  classNameHelperText?: string;
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
    icon,
    idForm,
    className,
    onClick,
    transparent = false,
    colorText = 'white',
    href,
    helperTextOnHover,
    classNameHelperText,
  } = Props;

  // set button disabling if appropriate
  const disabledRes = !onClick && type !== 'submit' && !href ? true : disabled;

  // if hover is disabled or button as a whole
  // id disabled , don't show hover
  const hoverRes = disabledRes || !hover ? false : hover;

  // icon alignment
  const [align] = useState<TBBButtonIconAlign>(icon?.align || 'left');

  // handle hover state
  const [isHovered] = useState(false);
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

  const renderIcon = (currSide: TBBButtonIconAlign, icon?: IPropsBBButtonIcon) => {
    if (!icon || !icon.icon) return null;
    const element = <div className={styles.containerIcon}>{icon.icon}</div>;
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
    <div
      className={classNames(
        styles.containerMain,
        align === 'above' || align === 'below' ? styles.contentVertical : null,
        isHovered && helperTextOnHover ? styles.showHelperText : null,
        classNameHelperText
      )}
      ref={mainWrapperRef}
    >
      {renderIcon('left', icon)}
      {!!text && (
        <div className={classNames(styles.containerText)}>
          <BBText color={colorText} size={getButtonSize()}>
            {text}
          </BBText>
        </div>
      )}
      {renderIcon('right', icon)}
      {helperTextOnHover && (
        <div className={classNames(styles.helperText, isHovered && styles.helperTextVisible)} ref={helperTextRef}>
          <div className={styles.helperTextContent}>
            <BBText color="white" size="small" className={styles.helperTextQuestionMark}>
              ?
            </BBText>
            <BBText size="small">{helperTextOnHover}</BBText>
          </div>
        </div>
      )}
    </div>
  );

  // class names for buttons
  let baseClassNames = classNames(
    styles.base,
    getClassVariant(),
    getClassElevation(),
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
      <BBLink href={href} className={baseClassNames} external underline={false} size={getButtonSize()} color={colorText}>
        {mainComponent}
      </BBLink>
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
