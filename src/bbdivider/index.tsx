'use client';

import classNames from 'classnames';
import React from 'react';
import styles from './styles.module.scss';
import type {
  TBBDividerColor,
  TBBDividerOrientation,
  TBBDividerStyle,
  TBBDividerThickness,
  TBBDividerLength,
  TBBDividerMargin,
} from '../types';

/**
 * PROPS
 *
 * @param {TBBDividerColor=} color - The color of the divider
 * @param {TBBDividerThickness=} thickness - The thickness of the divider
 * @param {TBBDividerOrientation=} orientation - The orientation of the divider
 * @param {TBBDividerStyle=} styleType - The style of the divider
 * @param {TBBDividerLength=} length - The length of the divider (width or height based on orientation)
 * @param {TBBDividerMargin=} margin - Margin around the divider
 * @param {string=} className - Additional class names to apply
 */
export interface IPropsBBDivider {
  color?: TBBDividerColor;
  thickness?: TBBDividerThickness;
  orientation?: TBBDividerOrientation;
  styleType?: TBBDividerStyle;
  length?: TBBDividerLength;
  margin?: TBBDividerMargin;
  className?: string;
}

/**
 * BBDivider
 */
export default function BBDivider(Props: IPropsBBDivider): React.ReactElement {
  const {
    color = 'default',
    thickness = 'xs',
    orientation = 'horizontal',
    styleType = 'solid',
    length = 'full',
    margin = 's',
    className,
  } = Props;

  const dividerClass = classNames(
    styles.divider,
    styles[orientation],
    styles[`style${capitalize(styleType)}`],
    styles[`thickness${thickness}`],
    styles[`length${length}`],
    styles[`margin${margin}`],
    styles[`color${color}`],
    className
  );

  return <div className={dividerClass} />;
}

/**
 * Capitalizes the first letter of a string.
 */
function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
