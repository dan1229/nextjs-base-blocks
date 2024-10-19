'use client';

import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { TBBDividerColor, TBBDividerOrientation, TBBDividerStyle, TBBDividerThickness, TBBDividerLength } from 'src/types';

/**
 * PROPS
 *
 * @param {TBBDividerColor=} color - The color of the divider
 * @param {TBBDividerThickness=} thickness - The thickness of the divider
 * @param {TBBDividerOrientation=} orientation - The orientation of the divider
 * @param {TBBDividerStyle=} styleType - The style of the divider
 * @param {string=} className - Additional class names to apply
 * @param {TBBDividerLength=} length - The length of the divider (width or height based on orientation)
 * @param {number | string=} margin - Margin around the divider
 */
export interface IPropsBBDivider {
  color?: TBBDividerColor;
  thickness?: TBBDividerThickness;
  orientation?: TBBDividerOrientation;
  styleType?: TBBDividerStyle;
  className?: string;
  length?: TBBDividerLength;
  margin?: number | string;
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
    margin = 0,
  } = Props;

  const dividerClass = classNames(styles.divider, orientation === 'vertical' ? styles.vertical : styles.horizontal, className);

  const colorValue = getColorValue(color);
  const thicknessValue = getThicknessValue(thickness);
  const lengthValue = getLengthValue(length);
  const marginValue = typeof margin === 'number' ? `${margin}px` : margin;

  const dividerStyle: React.CSSProperties = {
    width: orientation === 'horizontal' ? lengthValue : undefined,
    height: orientation === 'vertical' ? lengthValue : undefined,
    margin: orientation === 'horizontal' ? `${marginValue} 0` : `0 ${marginValue}`,
    ...(orientation === 'horizontal'
      ? {
          borderBottomColor: colorValue,
          borderBottomWidth: thicknessValue,
          borderBottomStyle: styleType,
        }
      : {
          borderRightColor: colorValue,
          borderRightWidth: thicknessValue,
          borderRightStyle: styleType,
        }),
  };

  return <div className={dividerClass} style={dividerStyle} />;
}

/**
 * Maps the divider color to actual CSS color values.
 */
function getColorValue(color: TBBDividerColor): string {
  switch (color) {
    case 'default':
      return '#000000'; // default black
    case 'white':
      return '#ffffff';
    case 'grey_light':
      return '#d3d3d3';
    case 'grey_dark':
      return '#a9a9a9';
    case 'black':
      return '#000000';
    case 'primary':
      return '#e8352e';
    case 'primary_light':
      return '#ff5e5a'; // lighten(#e8352e, 10%)
    case 'primary_dark':
      return '#b22924'; // darken(#e8352e, 10%)
    case 'secondary':
      return '#284af7';
    case 'secondary_light':
      return '#536bfa'; // lighten(#284af7, 10%)
    case 'secondary_dark':
      return '#203ac4'; // darken(#284af7, 10%)
    case 'accent':
      return '#ebeb30';
    case 'accent_light':
      return '#f2f24b'; // lighten(#ebeb30, 10%)
    case 'accent_dark':
      return '#b8b827'; // darken(#ebeb30, 10%)
    default:
      return '#000000'; // default to black
  }
}

/**
 * Maps the thickness prop to actual CSS values.
 */
function getThicknessValue(thickness: TBBDividerThickness): string {
  switch (thickness) {
    case 'xs':
      return '1px';
    case 's':
      return '2px';
    case 'm':
      return '3px';
    case 'l':
      return '4px';
    case 'xl':
      return '6px';
    case 'xxl':
      return '8px';
    case 'xxxl':
      return '10px';
    default:
      return '1px'; // default to 'xs'
  }
}

/**
 * Maps the length prop to actual CSS values.
 */
function getLengthValue(length: TBBDividerLength): string {
  switch (length) {
    case 'xs':
      return '25%';
    case 's':
      return '50%';
    case 'm':
      return '75%';
    case 'l':
      return '90%';
    case 'xl':
      return '100%';
    case 'xxl':
      return '150%';
    case 'xxxl':
      return '200%';
    case 'full':
      return '100%';
    default:
      return '100%'; // default to full length
  }
}
