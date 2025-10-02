/**
 * SCSS Class Name Utility Functions
 *
 * Standardized utilities for generating CSS class names from component prop values.
 * This replaces the inconsistent switch statement pattern used across components.
 * Maps a typed value to a CSS class name using a style object
 *
 * Key benefits:
 * - Type-safe: TypeScript will catch missing cases
 * - Consistent: All components use the same pattern
 * - Maintainable: One place to handle naming conventions
 * - Flexible: Supports various prefix/suffix patterns
 *
 *
 *
 * @param styles - CSS modules style object
 * @param value - The typed value to map
 * @param prefix - Optional prefix for the class name
 * @param suffix - Optional suffix for the class name
 * @param transform - Optional transform function for the value
 * @returns The CSS class name string or undefined if not found
 *
 * @example
 * // Basic usage
 * getClassName(styles, 'primary') // returns styles.primary
 *
 * @example
 * // With prefix
 * getClassName(styles, 'primary', 'background_card_') // returns styles.background_card_primary
 *
 * @example
 * // With transform for camelCase
 * getClassName(styles, 'inverse-primary', '', '', (v) => toCamelCase(v)) // returns styles.inversePrimary
 */
export function getClassName<T extends string>(
  styles: Record<string, string>,
  value: T | null | undefined,
  prefix = '',
  suffix = '',
  transform?: (value: T) => string
): string | undefined {
  if (!value) return undefined;

  const transformedValue = transform ? transform(value) : value;
  const className = `${prefix}${transformedValue}${suffix}`;

  return styles[className];
}

/**
 * Maps multiple values to CSS class names and returns them joined
 *
 * @param styles - CSS modules style object
 * @param mappings - Array of value mappings
 * @returns Space-separated CSS class names
 *
 * @example
 * getClassNames(styles, [
 *   { value: 'primary', prefix: 'color_' },
 *   { value: 'lg', prefix: 'size_' }
 * ]) // returns "color_primary size_lg"
 */
export function getClassNames<T extends string>(
  styles: Record<string, string>,
  mappings: Array<{
    value: T | null | undefined;
    prefix?: string;
    suffix?: string;
    transform?: (value: T) => string;
  }>
): string {
  return mappings
    .map(({ value, prefix, suffix, transform }) => getClassName(styles, value, prefix, suffix, transform))
    .filter(Boolean)
    .join(' ');
}

/**
 * Converts kebab-case to camelCase
 * Useful for transforming prop values like 'inverse-primary' to 'inversePrimary'
 */
export function toCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Converts camelCase to snake_case
 * Useful for transforming prop values to match SCSS naming conventions
 */
export function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

/**
 * Capitalizes the first letter of a string
 * Useful for generating class names like 'textAlignCenter' from 'center'
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Type-safe variant mapper for common component patterns
 * This is the main utility that most components should use
 *
 * @param styles - CSS modules style object
 * @param config - Configuration object with mappings
 * @returns Object with methods to get class names for different properties
 *
 * @example
 * const classHelper = createClassHelper(styles, {
 *   variant: { transform: toCamelCase },
 *   size: { prefix: 'size_' },
 *   elevation: { prefix: 'elevation_' }
 * });
 *
 * // Usage in component
 * className={classNames(
 *   styles.base,
 *   classHelper.variant(variant),
 *   classHelper.size(size),
 *   classHelper.elevation(elevation)
 * )}
 */
export function createClassHelper<
  TConfig extends Record<
    string,
    {
      prefix?: string;
      suffix?: string;
      transform?: (value: string) => string;
    }
  >
>(
  styles: Record<string, string>,
  config: TConfig
): {
  [K in keyof TConfig]: <T extends string>(value: T | null | undefined) => string | undefined;
} {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const helper: any = {};

  for (const [key, options] of Object.entries(config)) {
    helper[key] = <T extends string>(value: T | null | undefined) =>
      getClassName(styles, value, options.prefix, options.suffix, options.transform);
  }

  return helper;
}
