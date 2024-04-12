import classNames from 'classnames';
import React from 'react';
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
import BBLink from 'src/bblink';

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
 * @param {boolean=} showTextOnHover - Whether to show the text on hover
 * @param {string=} idForm - The ID of the form to submit
 * @param {string=} className - Any class name to add
 * @param {() => void=} onClick - The function to call when the button is clicked
 * @param {boolean=} transparent - Whether the button is transparent
 * @param {TBBTextColor=} colorText - The color of the text. This doesn't really work with 'inverse-*' variants
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
  showTextOnHover?: boolean;
  idForm?: string;
  className?: string;
  onClick?: () => void;
  transparent?: boolean;
  colorText?: TBBTextColor;
  href?: string;
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
    showTextOnHover = false,
    icon,
    idForm,
    className,
    onClick,
    transparent = false,
    colorText = 'white',
    href,
  } = Props;
  // if button doesn't do anything, disable it
  // otherwise, rely on the disabled prop
  const disabledRes = !onClick && type != 'submit' ? true : disabled;
  const hoverRes = disabled || !hover ? false : hover;
  const align = icon?.align || 'left';

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
      case 'sm':
        return 'small';
      case 'md':
        return 'medium';
      case 'lg':
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

  // main shared component
  const mainComponent = (
    <>
      {renderIcon('left', icon)}
      {!!text && (
        <div className={classNames(styles.containerText, showTextOnHover && styles.noMargin)}>
          <BBText color={colorText} size={getButtonSize()}>
            {text}
          </BBText>
        </div>
      )}
      {renderIcon('right', icon)}
    </>
  );

  // if href is defined, use regular button and show it as disabled
  if (href && !disabledRes) {
    if (onClick) console.warn('BBButton: Both onClick and href are defined. onClick will be ignored.');
    return (
      <BBLink
        href={href}
        className={classNames(
          className,
          styles.base,
          align === 'above' || align === 'below' ? styles.baseVertical : null,
          disabledRes && styles.disabled,
          hoverRes && styles.hover,
          focus && styles.focus,
          showTextOnHover && styles.showTextOnHover,
          getClassVariant(),
          getClassElevation(),
          transparent && styles.transparent
        )}
        external
        underline={false}
        size={getButtonSize()}
        color={colorText}
      >
        {mainComponent}
      </BBLink>
    );
  }

  return (
    <button
      className={classNames(
        className,
        styles.base,
        align === 'above' || align === 'below' ? styles.baseVertical : null,
        disabledRes && styles.disabled,
        hoverRes && styles.hover,
        focus && styles.focus,
        showTextOnHover && styles.showTextOnHover,
        getClassVariant(),
        getClassElevation(),
        transparent && styles.transparent
      )}
      type={type}
      form={idForm}
      disabled={disabledRes}
      onClick={disabledRes ? undefined : onClick}
    >
      {mainComponent}
    </button>
  );
}
