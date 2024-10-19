'use client';

import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import {
  TBBDividerColor,
  TBBDividerOrientation,
  TBBDividerStyle,
  TBBDividerThickness,
  TBBDividerLength,
  TBBDividerMargin,
} from 'src/types';

/**
 * PROPS
 *
 * @param {TBBDividerColor=} color - The color of the divider
 * @param {TBBDividerThickness=} thickness - The thickness of the divider
 * @param {TBBDividerOrientation=} orientation - The orientation of the divider
 * @param {TBBDividerStyle=} styleType - The style of the divider
 * @param {string=} className - Additional class names to apply
 * @param {TBBDividerLength=} length - The length of the divider (width or height based on orientation)
 * @param {TBBDividerMargin=} margin - Margin around the divider
 */
export interface IPropsBBDivider {
  color?: TBBDividerColor;
  thickness?: TBBDividerThickness;
  orientation?: TBBDividerOrientation;
  styleType?: TBBDividerStyle;
  className?: string;
  length?: TBBDividerLength;
  margin?: TBBDividerMargin;
}

/**
 * BBDivider
 */
export default function BBDivider(Props: IPropsBBDivider): React.ReactElement {
  const {
    color = 'black',
    thickness = 'xs',
    orientation = 'horizontal',
    styleType = 'solid',
    className,
    length = 'full',
    margin = 'none',
  } = Props;

  const dividerClass = classNames(
    styles.divider,
    styles[orientation],
    styles[`style${capitalize(styleType)}`],
    styles[`thickness${capitalize(thickness)}`],
    styles[`length${capitalize(length)}`],
    styles[`margin${capitalize(margin)}`],
    styles[`color${capitalize(color)}`],
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
