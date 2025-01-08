'use client';

import React, { useState } from 'react';
import classnames from 'classnames';
import BBText from '../bbtext';
import styles from './styles.module.scss';

/**
 * PROPS
 *
 * @param {string=} text - Text to display in tooltip
 * @param {React.ReactNode=} children - Children to wrap with tooltip
 * @param {React.ReactNode=} content - Custom content to display in tooltip
 * @param {string=} className - Additional classes to apply to tooltip
 * @param {'top'|'bottom'|'left'|'right'=} position - Position of tooltip
 */
export interface IPropsBBTooltip {
  text?: string;
  children?: React.ReactNode;
  content?: React.ReactNode;
  className?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

/**
 * BBTOOLTIP
 */
export default function BBTooltip(Props: IPropsBBTooltip): React.ReactElement {
  const { text, children, content, className, position = 'top' } = Props;
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={classnames(styles.tooltipContainer, className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <div
        className={classnames(styles.tooltip, styles[position], {
          [styles.visible]: isVisible,
        })}
      >
        {content || (text && <BBText>{text}</BBText>)}
      </div>
    </div>
  );
}
