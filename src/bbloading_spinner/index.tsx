import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import {
  createClassHelper,
  toStandardSnakeCase
} from '../utils/scss-class-functions';
import styles from './styles.module.scss';
import type {
  TBBLoadingSpinnerColor,
  TBBLoadingSpinnerSizes,
  TBBLoadingSpinnerVariants
} from '../types';

/**
 * Props interface for BBLoadingSpinner component
 *
 * @interface IPropsBBLoadingSpinner
 * @param {TBBLoadingSpinnerVariants} variant - Animation style: 'default' (rotating border), 'double circle', 'circle bounce', 'spinning square'
 * @param {TBBLoadingSpinnerSizes} size - Size of spinner: 'sm' (24px), 'md' (48px), 'lg' (64px)
 * @param {TBBLoadingSpinnerColor} color - Color theme using CSS custom properties: 'primary', 'secondary', 'accent', etc.
 * @param {string} className - Additional CSS classes to apply
 */
export interface IPropsBBLoadingSpinner {
  variant?: TBBLoadingSpinnerVariants;
  size?: TBBLoadingSpinnerSizes;
  color?: TBBLoadingSpinnerColor;
  className?: string;
}

/**
 * BBLoadingSpinner
 */
export default function BBLoadingSpinner(
  Props: IPropsBBLoadingSpinner
): React.ReactElement {
  // Extract props - defaults will be determined by CSS variables or fallback values
  const { variant, className, size, color } = Props;

  // State to track if we're on client side and CSS variables are available
  const [isClient, setIsClient] = useState(false);
  const [cssDefaults, setCssDefaults] = useState({
    variant: 'default',
    size: 'md',
    color: 'primary'
  });

  // Effect to read CSS variables on client side
  useEffect(() => {
    setIsClient(true);

    if (typeof window !== 'undefined') {
      const computedStyle = getComputedStyle(document.documentElement);

      const getCleanCSSValue = (property: string, fallback: string): string => {
        const cssValue = computedStyle.getPropertyValue(property).trim();
        const cleanValue = cssValue.replace(/^['"]|['"]$/g, '').trim();
        return cleanValue || fallback;
      };

      const newDefaults = {
        variant: getCleanCSSValue('--loading-default-variant', 'default'),
        size: getCleanCSSValue('--loading-default-size', 'md'),
        color: getCleanCSSValue('--loading-default-color', 'primary')
      };

      // Temporary debug logging for variant testing
      if (process.env.NODE_ENV === 'development') {
        console.log('BBLoadingSpinner CSS values:', newDefaults);
      }

      setCssDefaults(newDefaults);
    }
  }, []);

  // Apply CSS variable defaults or fallback to hardcoded defaults
  // Users can override these by setting CSS custom properties globally
  const finalVariant = variant || (cssDefaults.variant as TBBLoadingSpinnerVariants);
  const finalSize = size || (cssDefaults.size as TBBLoadingSpinnerSizes);
  const finalColor = color || (cssDefaults.color as TBBLoadingSpinnerColor);

  // Create class helper with standardized patterns
  const classHelper = createClassHelper(styles, {
    variant: {
      prefix: 'loader_',
      transform: toStandardSnakeCase // Convert 'double circle' to 'double_circle', handles kebab-case and camelCase too
    },
    size: { prefix: 'loader_' },
    color: {} // Direct mapping for colors
  });

  const getLoadingSpinnerClassName = () => {
    if (finalVariant === 'default') {
      return classNames(styles.loader_default); // Classic rotating border with transparent top
    }
    return (
      classHelper.variant(finalVariant) || classNames(styles.loader_default)
    );
  };

  const getLoadingSpinnerSizeClassName = () => {
    return classHelper.size(finalSize);
  };

  const getColorClassName = () => {
    return classHelper.color(finalColor) || styles.primary;
  };

  return (
    <div className={styles.containerLoading}>
      <span
        className={classNames(
          getLoadingSpinnerClassName(),
          getLoadingSpinnerSizeClassName(),
          getColorClassName(),
          // Prevents flash of default values during CSS variable loading
          // Spinner starts hidden on SSR, then fades in once CSS variables are read on client
          isClient ? styles.loaderVisible : styles.loaderHidden,
          className
        )}
      />
    </div>
  );
}
