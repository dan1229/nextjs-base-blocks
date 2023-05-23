import classNames from 'classnames';
import styles from '../bbalert/styles.module.scss';
import BBText, { TBBTextSize } from '../bbtext';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useState } from 'react';

export type TBBAlertVariant = 'success' | 'warning' | 'danger' | 'info';
export type TBBAlertElevation = 'none' | 'low' | 'medium' | 'high';
export type TBBAlertTextAlignment = 'left' | 'center' | 'right';

/**
 * PROPS
 *
 * @param {React.ReactNode} children - The text to display
 * @param {TBBTextSize=} size - the size of alert
 * @param {TBBAlertVariant=} variant - the variant of the alert
 * @param {TBBAlertElevation=} elevation - the elevation of the alert
 * @param {boolean=} dismissible - whether the alert is dismissible
 * @param {TBBAlertTextAlignment=} textAlignment - the text alignment of the alert
 * @param {string=} className - Any class name to add
 */
interface IPropsBBAlert {
  children: React.ReactNode;
  size?: TBBTextSize;
  variant?: TBBAlertVariant;
  elevation?: TBBAlertElevation;
  dismissible?: boolean;
  textAlignment?: TBBAlertTextAlignment;
  className?: string;
}

/**
 * BBAlert
 */
export default function BBAlert(Props: IPropsBBAlert): React.ReactElement {
  const { children, size = 'medium', variant = 'info', elevation = 'none', dismissible = true, textAlignment = 'left', className } = Props;
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

  const onClickDismiss = (): void => {
    setIsDismissed(true);
  };

  /**
   * RENDER
   */
  return (
    <div className={classNames(className, styles.base, getClassVariant(), getClassElevation(), getClassTextAlignment())}>
      <BBText size={size}>{children}</BBText>
      {dismissible && <AiOutlineCloseCircle className={styles.dismissButton} onClick={onClickDismiss} />}
    </div>
  );
}
