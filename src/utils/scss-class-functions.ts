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
 * // With transform for snake_case
 * getClassName(styles, 'inverse-primary', '', '', (v) => toStandardSnakeCase(v)) // returns styles.inverse_primary
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
 * Capitalizes the first letter of a string
 * Useful for generating class names like 'textAlignCenter' from 'center'
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts any string format to standardized snake_case
 * Handles kebab-case ('inverse-primary' -> 'inverse_primary') and camelCase ('inversePrimary' -> 'inverse_primary')
 * This is the recommended transform for consistent SCSS class naming
 */
export function toStandardSnakeCase(str: string): string {
  return str
    .replace(/-/g, '_')  // Convert kebab-case to snake_case
    .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)  // Convert camelCase to snake_case
    .replace(/^_/, '');  // Remove leading underscore if any
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
 *   variant: { transform: toStandardSnakeCase },
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
  // Use a type assertion to ensure helper matches the expected return type
  const helper = {} as {
    [K in keyof TConfig]: <T extends string>(value: T | null | undefined) => string | undefined;
  };

  (Object.keys(config) as Array<keyof TConfig>).forEach((key) => {
    const options = config[key];
    helper[key] = <T extends string>(value: T | null | undefined) =>
      getClassName(styles, value, options.prefix, options.suffix, options.transform);
  });

  return helper;
}
