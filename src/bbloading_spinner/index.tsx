import classNames from 'classnames';
import React from 'react';
import { createClassHelper, toStandardSnakeCase } from '../utils/scss-class-functions';
import styles from './styles.module.scss';
import type { TBBLoadingSpinnerColor, TBBLoadingSpinnerSizes, TBBLoadingSpinnerVariants } from '../types';

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
 * BBLoadingSpinner - Animated loading spinner component
 *
 * A flexible loading spinner with multiple animation variants, sizes, and colors.
 * Uses CSS custom properties for theming and provides sensible defaults.
 *
 * Supports global default configuration via CSS custom properties:
 * - --bb-loading-default-variant: Sets default animation style
 * - --bb-loading-default-size: Sets default spinner size
 * - --bb-loading-default-color: Sets default color theme
 *
 * @example
 * // Basic usage with defaults (default variant, md size, primary color)
 * <BBLoadingSpinner />
 *
 * @example
 * // Custom configuration via props (overrides CSS variables)
 * <BBLoadingSpinner variant="circle bounce" size="lg" color="accent" />
 *
 * @example
 * // Global defaults via CSS (affects all BBLoadingSpinner instances without explicit props)
 * :root {
 *   --bb-loading-default-variant: "circle bounce";
 *   --bb-loading-default-size: lg;
 *   --bb-loading-default-color: accent;
 * }
 *
 * @param {IPropsBBLoadingSpinner} Props - Component props
 * @returns {React.ReactElement} Rendered loading spinner
 */
export default function BBLoadingSpinner(Props: IPropsBBLoadingSpinner): React.ReactElement {
  // Extract props - defaults will be determined by CSS variables or fallback values
  const { variant, className, size, color } = Props;

  // Get CSS custom property values as defaults when props aren't provided
  // This allows users to set global defaults via CSS without creating wrapper components
  const getDefaultValue = (property: string, fallback: string): string => {
    if (typeof window !== 'undefined') {
      const computedStyle = getComputedStyle(document.documentElement);
      const cssValue = computedStyle.getPropertyValue(property).trim();
      return cssValue || fallback;
    }
    return fallback;
  };

  // Apply CSS variable defaults or fallback to hardcoded defaults
  // Users can override these by setting CSS custom properties globally
  const finalVariant = variant || (getDefaultValue('--bb-loading-default-variant', 'default') as TBBLoadingSpinnerVariants);
  const finalSize = size || (getDefaultValue('--bb-loading-default-size', 'md') as TBBLoadingSpinnerSizes);
  const finalColor = color || (getDefaultValue('--bb-loading-default-color', 'primary') as TBBLoadingSpinnerColor);

  // Create class helper with standardized patterns
  const classHelper = createClassHelper(styles, {
    variant: {
      prefix: 'loader_',
      transform: toStandardSnakeCase  // Convert 'double circle' to 'double_circle', handles kebab-case and camelCase too
    },
    size: { prefix: 'loader_' },
    color: {},  // Direct mapping for colors
  });

  const getLoadingSpinnerClassName = () => {
    if (finalVariant === 'default') {
      return classNames(styles.loader_default); // Classic rotating border with transparent top
    }
    return classHelper.variant(finalVariant) || classNames(styles.loader_default);
  };

  const getLoadingSpinnerSizeClassName = () => {
    return classHelper.size(finalSize);
  };

  const getColorClassName = () => {
    return classHelper.color(finalColor) || styles.primary;
  };

  return (
    <div className={styles.containerLoading}>
      <span className={classNames(getLoadingSpinnerClassName(), getLoadingSpinnerSizeClassName(), getColorClassName(), className)} />
    </div>
  );
}
