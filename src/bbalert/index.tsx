import classNames from 'classnames';
import React, { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styles from './styles.module.scss';
import type { TBBAlertVariant, TBBAlertElevation, TBBAlertTextAlignment } from '../types';

/**
 * PROPS
 *
 * @param {React.ReactNode} children - The text to display
 * @param {TBBAlertVariant=} variant - the variant of the alert
 * @param {TBBAlertElevation=} elevation - the elevation of the alert
 * @param {boolean=} dismissible - whether the alert is dismissible
 * @param {TBBAlertTextAlignment=} textAlignment - the text alignment of the alert
 * @param {() => void=} onClick - the function to call when the alert is clicked
 * @param {string=} className - Any class name to add
 * @param {string=} classNameIcon - Any class name to add to the icon
 */
export interface IPropsBBAlert {
  children: React.ReactNode;
  variant?: TBBAlertVariant;
  elevation?: TBBAlertElevation;
  dismissible?: boolean;
  textAlignment?: TBBAlertTextAlignment;
  onClick?: () => void;
  className?: string;
  classNameIcon?: string;
}

/**
 * BBAlert
 */
export default function BBAlert(Props: IPropsBBAlert): React.ReactElement {
  const {
    children,
    variant = 'info',
    elevation = 'none',
    dismissible = true,
    textAlignment = 'left',
    onClick,
    className,
    classNameIcon,
  } = Props;
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  if (isDismissed) {
    return <></>;
  }

  const getClassVariant = (): string => {
    switch (variant) {
      case 'success':
        return styles.color_success;
      case 'warning':
        return styles.color_warning;
      case 'danger':
        return styles.color_danger;
      case 'info':
        return styles.color_info;
    }
  };

  const getClassElevation = (): string => {
    switch (elevation) {
      case 'none':
        return styles.elevation_none;
      case 'low':
        return styles.elevation_low;
      case 'medium':
        return styles.elevation_med;
      case 'high':
        return styles.elevation_high;
    }
  };

  const getClassTextAlignment = (): string => {
    switch (textAlignment) {
      case 'left':
        return styles.text_left;
      case 'center':
        return styles.text_center;
      case 'right':
        return styles.text_right;
    }
  };

  const onClickDismiss = (e: React.MouseEvent<SVGSVGElement>): void => {
    setIsDismissed(true);
    e.stopPropagation();
  };

  const onClickOverride = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    onClick && onClick();
  };

  /**
   * RENDER
   */
  return (
    <div
      className={classNames(
        className,
        styles.base,
        getClassVariant(),
        getClassElevation(),
        getClassTextAlignment(),
        onClick && styles.clickable
      )}
      onClick={onClick && onClickOverride}
    >
      <div>{children}</div>
      {dismissible && <AiOutlineCloseCircle className={classNames(styles.dismissButton, classNameIcon)} onClick={onClickDismiss} />}
    </div>
  );
}
