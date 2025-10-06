import type React from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

/**
 * ALL TYPES
 */

/**
 * Base props for all Base Blocks components
 *
 * @prop {string=} className - CSS class names to add
 * @prop {React.MouseEventHandler<HTMLElement>=} onClick - Click handler
 */
export interface IPropsBBBase {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

/**
 * BBAlert
 */
export type TBBAlertVariant = 'success' | 'warning' | 'danger' | 'info';
export type TBBAlertElevation = 'none' | 'low' | 'medium' | 'high';
export type TBBAlertTextAlignment = 'left' | 'center' | 'right';

/**
 * BBButton
 */
export type TBBButtonType = 'submit' | 'button' | 'reset';
export type TBBButtonVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'danger'
  | 'success'
  | 'warning'
  | 'info'
  | 'black'
  | 'white'
  | 'inverse-info'
  | 'inverse-primary'
  | 'inverse-secondary'
  | 'inverse-accent'
  | 'inverse-danger'
  | 'inverse-success'
  | 'inverse-warning'
  | 'transparent-primary'
  | 'transparent-secondary'
  | 'transparent-accent'
  | 'text';
export type TBBButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TBBButtonElevation = 'none' | 'low' | 'medium' | 'high';
export type TBBButtonIconAlign = 'left' | 'right' | 'above' | 'below' | 'space-between';

/**
 * BBCard
 */
export type TBBCardColorBackground =
  | 'default'
  | 'transparent'
  | 'white'
  | 'grey_light'
  | 'grey_dark'
  | 'grey_lightest'
  | 'grey_darkest'
  | 'black'
  | 'primary'
  | 'primary_light'
  | 'primary_dark'
  | 'secondary'
  | 'secondary_light'
  | 'secondary_dark'
  | 'accent'
  | 'accent_light'
  | 'accent_dark'
  | 'success'
  | 'success_light'
  | 'success_dark'
  | 'warning'
  | 'warning_light'
  | 'warning_dark'
  | 'danger'
  | 'danger_light'
  | 'danger_dark'
  | 'info'
  | 'info_light'
  | 'info_dark';
export type TBBCardColorBorder =
  | 'default'
  | 'transparent'
  | 'white'
  | 'grey_light'
  | 'grey_dark'
  | 'grey_lightest'
  | 'grey_darkest'
  | 'black'
  | 'primary'
  | 'primary_light'
  | 'primary_dark'
  | 'secondary'
  | 'secondary_light'
  | 'secondary_dark'
  | 'accent'
  | 'accent_light'
  | 'accent_dark'
  | 'success'
  | 'success_light'
  | 'success_dark'
  | 'warning'
  | 'warning_light'
  | 'warning_dark'
  | 'danger'
  | 'danger_light'
  | 'danger_dark'
  | 'info'
  | 'info_light'
  | 'info_dark';
export type TBBCardElevation = 'none' | 'low' | 'medium' | 'high' | 'default';

/**
 * BBDivider
 */
export type TBBDividerColor =
  | 'default'
  | 'white'
  | 'grey_light'
  | 'grey_dark'
  | 'black'
  | 'primary'
  | 'primary_light'
  | 'primary_dark'
  | 'secondary'
  | 'secondary_light'
  | 'secondary_dark'
  | 'accent'
  | 'accent_light'
  | 'accent_dark';

export type TBBDividerOrientation = 'horizontal' | 'vertical';
export type TBBDividerStyle = 'solid' | 'dashed' | 'dotted';
export type TBBDividerThickness = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';
export type TBBDividerLength = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' | 'full';
export type TBBDividerMargin = 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';

/**
 * BBModal
 */
export type TBBModalWidth = 'sm' | 'md' | 'lg' | 'full';

/**
 * BBNavbar
 */
export type TBBNavbarAlignment = 'left' | 'center' | 'right';
export type TBBNavbarVerticalAlignment = 'top' | 'center' | 'bottom';
export type TBBNavbarTextAlignment = 'left' | 'center';
export type TBBNavbarElevation = 'none' | 'low' | 'high' | 'rainbow';

/**
 * BBNavbarItem
 */
export type TBBNavbarItemColorBorder =
  | 'default'
  | 'transparent'
  | 'white'
  | 'grey_light'
  | 'grey_dark'
  | 'black'
  | 'primary'
  | 'secondary'
  | 'accent';

/**
 * BBLoadingSpinner
 */
export type TBBLoadingSpinnerVariants = 'default' | 'double circle' | 'circle bounce' | 'spinning square';
export type TBBLoadingSpinnerSizes = 'sm' | 'md' | 'lg';
export type TBBLoadingSpinnerColor = 'primary' | 'secondary' | 'accent' | 'danger' | 'success' | 'warning' | 'info' | 'black' | 'white';

/**
 * BBTooltip
 */
// TODO

/**
 * BBText
 */
export type TBBTextSize = 'tiny' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge';
export type TBBTextColor =
  | 'grey_light'
  | 'grey_dark'
  | 'black'
  | 'white'
  | 'primary'
  | 'primary_light'
  | 'primary_dark'
  | 'secondary'
  | 'secondary_light'
  | 'secondary_dark'
  | 'accent'
  | 'accent_light'
  | 'accent_dark'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

/**
 * FORM TYPES
 */

/**
 * Base props for all Base Blocks FORM components
 *
 * @prop {Function} register - React Hook Form register function.
 * @prop {string} fieldName - Name of the field, used for ID for form submission
 * @prop {string=} label - Label for the component
 * @prop {(value: string | number | boolean | string[]) => void} onChange - Change handler
 * @prop {string | number | boolean | string[]} value - Value of the field
 * @prop {boolean=} required - Whether the field is required
 * @param {string=} autocomplete - Autocomplete value for the input.
 * @param {string=} placeholder - Placeholder text
 * @param {boolean=} showLabel - Whether to show the label
 * @param {string=} helperText - Helper text to show below the field
 * @param {TBBTextColor=} helperTextColor - Color of the helper text
 * @param {'text' | 'tooltip'=} helperTextType - How to display the helper text: as inline text or as a tooltip
 * @param {TBBFieldBaseSize=} size - Size of the field
 * @param {FieldError=} error - Error for the field
 * @param {React.RefObject<HTMLInputElement>=} inputRef - Ref for the input
 */
interface IPropsBBBaseFormBase {
  register?: UseFormRegisterReturn;
  fieldName: string;
  label?: string;
  onChange?: ((value: string | number | boolean | string[]) => void) | React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  value?: string | number | boolean | string[];
  required?: boolean;
  autocomplete?: string;
  placeholder?: string;
  showLabel?: boolean;
  helperText?: string;
  helperTextColor?: TBBTextColor;
  helperTextType?: 'text' | 'tooltip';
  size?: TBBFieldBaseSize;
  error?: FieldError;
  inputRef?: React.RefObject<HTMLInputElement>;
}
export type IPropsBBBaseForm = IPropsBBBase & IPropsBBBaseFormBase;

// TBBFieldBase
export type TBBFieldBaseTypes = 'file' | 'checkbox' | 'number';
// | 'radio' | 'select' | 'select-multiple'
export type TBBFieldBaseSize = 'sm' | 'md' | 'lg';

// TBBFieldCheckbox
export type TBBFieldCheckboxColor = 'primary' | 'secondary' | 'accent';
export type TBBFieldCheckboxSize = 'sm' | 'md' | 'lg';

export interface IPropsBBFieldCheckbox {
  colorCheckbox?: TBBFieldCheckboxColor;
  size?: TBBFieldCheckboxSize;
}

// TBBFieldSelect
export interface IBBFieldSelectOptions {
  value: string;
  label: string;
}

// TBBFieldSelectMultiple
export interface IBBFieldSelectCardOptions {
  value: string;
  label: string;
}

// TBBFieldSelectMultiple
export interface IBBFieldSelectMultipleOptions {
  value: string;
  label: string;
}

// TBBFieldText
export type TBBFieldTextType = 'text' | 'textarea' | 'number' | 'password';

/**
 * BBTable
 */
export type TBBTableVariant = 'default' | 'striped' | 'bordered' | 'hover';
export type TBBTableSize = 'sm' | 'md' | 'lg';
export type TBBTableElevation = 'none' | 'low' | 'medium' | 'high' | 'default';
export type TBBTableSortDirection = 'asc' | 'desc' | null;

export interface IBBTableColumn<T = Record<string, unknown>> {
  key: string;
  header: string;
  accessor?: keyof T | ((row: T) => unknown);
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
}

export interface IBBTableData {
  [key: string]: unknown;
}
