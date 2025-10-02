import classNames from 'classnames';
import React, { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { createClassHelper } from '../utils/scss-class-functions';
import styles from './styles.module.scss';
import type { TBBAlertVariant, TBBAlertElevation, TBBAlertTextAlignment } from '../types';

// Create class helper with standardized patterns
const classHelper = createClassHelper(styles, {
  variant: { prefix: 'color_' },
  elevation: {
    prefix: 'elevation_',
    transform: (value: string) => value === 'medium' ? 'med' : value
  },
  textAlignment: { prefix: 'text_' },
});

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
        classHelper.variant(variant),
        classHelper.elevation(elevation),
        classHelper.textAlignment(textAlignment),
        onClick && styles.clickable
      )}
      onClick={onClick && onClickOverride}
    >
      <div>{children}</div>
      {dismissible && <AiOutlineCloseCircle className={classNames(styles.dismissButton, classNameIcon)} onClick={onClickDismiss} />}
    </div>
  );
}
