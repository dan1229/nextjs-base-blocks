import classNames from 'classnames';
import React from 'react';
import type { TBBButtonIconAlign, TBBButtonType, TBBButtonSize, TBBButtonElevation, TBBButtonVariant, TBBTextSize } from '../types';
import styles from './styles.module.scss';
import BBText from '../bbtext';

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
 */
interface IPropsBBButton {
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
}

/**
 * BBButton
 */
export default function BBButton(Props: IPropsBBButton): React.ReactElement {
  const {
    text,
    type = 'submit',
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
  } = Props;
  // if button doesn't do anything, disable it
  const disabledRes = !onClick && type != 'submit' ? true : disabled;
  const hoverRes = disabled || !hover ? false : hover;
  const align = icon?.align || 'left';

  const getClassVariant = () => {
    switch (variant) {
      case 'primary':
        return styles.primary;
      case 'secondary':
        return styles.secondary;
      case 'danger':
        return styles.danger;
      case 'success':
        return styles.success;
      case 'warning':
        return styles.warning;
      case 'info':
        return styles.info;
      case 'inverse-info':
        return styles.inverseInfo;
      case 'inverse-primary':
        return styles.inversePrimary;
      case 'inverse-secondary':
        return styles.inverseSecondary;
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
    }
  };

  const renderIcon = (currSide: TBBButtonIconAlign, icon?: IPropsBBButtonIcon) => {
    if (!icon || !icon.icon) return null;
    const element = <div className={styles.icon}>{icon.icon}</div>;
    if (align == 'left' && currSide == 'left') {
      return element;
    } else if (align == 'right' && currSide == 'right') {
      return element;
    } else if (align == 'above' && currSide == 'left') {
      return element;
    } else if (align == 'below' && currSide == 'right') {
      return element;
    } else if (align == 'space-between' && currSide == 'right') {
      return element;
    }
    return null;
  };

  /**
   * RENDER
   */
  return (
    <button
      className={classNames(
        className,
        styles.base,
        align == 'above' || align == 'below' ? styles.baseVertical : null,
        !!disabledRes && styles.disabled,
        !!hoverRes && styles.hover,
        !!focus && styles.focus,
        showTextOnHover && styles.showTextOnHover,
        getClassVariant(),
        getClassElevation()
      )}
      type={type}
      form={idForm}
      disabled={disabledRes}
      onClick={disabledRes ? undefined : onClick}
    >
      {renderIcon('left', icon)}
      {!!text && (
        <div className={classNames(styles.containerText, showTextOnHover && styles.noMargin)}>
          <BBText color="white" size={getButtonSize()}>
            {text}
          </BBText>
        </div>
      )}
      {renderIcon('right', icon)}
    </button>
  );
}
