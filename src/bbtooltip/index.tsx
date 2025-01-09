'use client';

import classnames from 'classnames';
import React, { useState } from 'react';
import BBButton from '../bbbutton';
import BBText from '../bbtext';
import styles from './styles.module.scss';
import type { TBBButtonVariant } from '../types';

/**
 * PROPS
 *
 * @param {string=} text - Text to display in tooltip
 * @param {React.ReactNode=} children - Children to wrap with tooltip
 * @param {string=} content - Custom content to display in tooltip
 * @param {string=} className - Additional classes to apply to tooltip
 * @param {BBTooltipVariant=} variant - Variant of the tooltip
 */
export interface IPropsBBTooltip {
  text?: string;
  children?: React.ReactNode;
  content?: string;
  className?: string;
  variant?: TBBButtonVariant;
}

/**
 * BBTooltip
 */
export default function BBTooltip(Props: IPropsBBTooltip): React.ReactElement {
  const { text = '?', children, content, className, variant = 'primary' } = Props;
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={classnames(styles.tooltipContainer, className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {/* actual button displayed */}
      <BBButton variant={variant} text={text} />

      {/* tooltip content */}
      <div
        className={classnames(styles.tooltip, styles[variant], {
          [styles.visible]: isVisible,
        })}
      >
        <BBText color="white">{content}</BBText>
        {children}
      </div>
    </div>
  );
}
